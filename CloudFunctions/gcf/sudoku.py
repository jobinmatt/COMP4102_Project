import cv2
import operator
import numpy as np
from matplotlib import pyplot as plt
import pytesseract
from PIL import Image

class SudokuExtractor:

    def __init__(self, image):
        self.image = image
    
    def clean_image(self, img):
        """
            Cleans image by smoothing, dilating the grid lines, and making the image binary. (black or white)
            \n @param img <numpy.ndarry>
            \n @param skip_dilate <Boolean>
            \n returns processed image
        """

        # Gaussian blur
        proc = cv2.GaussianBlur(img.copy(), (9, 9), 0)

        # Adaptive threshold 
        proc = cv2.adaptiveThreshold(
            proc, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

        # Invert colours, so gridlines have non-zero pixel values.
        # Necessary to dilate the image, otherwise may not see all the grid lines
        proc = cv2.bitwise_not(proc, proc)


        kernel = np.array([[0., 1., 0.], [1., 1., 1.], [0., 1., 0.]])
        proc = cv2.dilate(proc, kernel)

        return proc


    def find_corners_of_puzzle(self,img):
        """
        Using contours will find all the corners in image and return the coordinates of the puzzle
        \n @param img <numpy.ndarray>
        \n returns <List>
        """
        contours, h = cv2.findContours(
            img.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # Find contours
        contours = sorted(contours, key=cv2.contourArea,
                        reverse=True)  # Sort by area, descending
        polygon = contours[0]  # Largest image

        # (0,0) of an image is in the top-left
        bottom_right, br = max(
            enumerate([pt[0][0] + pt[0][1] for pt in polygon]), key=operator.itemgetter(1)) # Bottom-right point has the largest (x + y) value
        top_left, _tl = min(enumerate([pt[0][0] + pt[0][1]
                                    for pt in polygon]), key=operator.itemgetter(1))  # Top-left has point smallest (x + y) value
        bottom_left, bl = min(
            enumerate([pt[0][0] - pt[0][1] for pt in polygon]), key=operator.itemgetter(1)) # Bottom-left point has smallest (x - y) value
        top_right, tr = max(enumerate([pt[0][0] - pt[0][1]
                                    for pt in polygon]), key=operator.itemgetter(1)) # Top-right point has largest (x - y) value

        # Return an array of all 4 points using the indices
        return [polygon[top_left][0], polygon[top_right][0], polygon[bottom_right][0], polygon[bottom_left][0]]


    def delta_distance(self,p1, p2):
        """
        Returns the scalar change in distance of two points
        \n @param p1 <List>
        \n @param p2 <List>
        """
        a = p2[0] - p1[0]
        b = p2[1] - p1[1]
        return np.sqrt((a ** 2) + (b ** 2))


    def get_puzzle_and_warp(self,img, crop_rect):
        """
        Given the coordinates of largest corners gets puzzle and warps the perspective to be flat.
        \n @param img <numpy.ndarray>
        \n @param crop_rect <List>: Coordinates of the largest polygon.
        """

        # Rectangle described by top left, top right, bottom right and bottom left points
        top_left, top_right, bottom_right, bottom_left = crop_rect[
            0], crop_rect[1], crop_rect[2], crop_rect[3]

        src = np.array([top_left, top_right, bottom_right,
                        bottom_left], dtype='float32')

        # longest side in the rectangle
        side = max([
            self.delta_distance(bottom_right, top_right),
            self.delta_distance(top_left, bottom_left),
            self.delta_distance(bottom_right, bottom_left),
            self.delta_distance(top_left, top_right)
        ])

        # Get new square to be cropped and warped
        dst = np.array([[0, 0], [side - 1, 0], [side - 1, side - 1],
                        [0, side - 1]], dtype='float32')

        # Warps the original image
        m = cv2.getPerspectiveTransform(src, dst)
        return cv2.warpPerspective(img, m, (int(side), int(side)))


    def assume_grid(self,img):
        """Assumes the cells of the grid/puzzle by dividing all imgs pixels by 9 in both width and height.
            \n@param img <numpy.ndarray>    
        """
        squares = []
        side = img.shape[:1]
        side = side[0] / 9

        #list reading left-right instead of top-down.
        for j in range(9):
            for i in range(9):
                p1 = (i * side, j * side)  # Top left corner of a bounding box
                # Bottom right corner of bounding box
                p2 = ((i + 1) * side, (j + 1) * side)
                squares.append((p1, p2))
        return squares


    def crop_from_rect(self,img, rect):
        """ Crops image based on coordinates
            \n@param img <numpy.ndarray>
            \n@param rect <numpy.ndarray>
        """
        return img[int(rect[0][1]):int(rect[1][1]), int(rect[0][0]):int(rect[1][0])]


    def scale_and_centre(self,cell, size, margin=0, background=0):
        """
            Centres the digit and resizes to fit OCR engine.
            \n @param cell <numpy.ndarray>
            \n @param size <float>
            \n @param margin <int>
            \n @param background <int>
        """
        h, w = cell.shape[:2]

        def centre_pad(length):
            """Centers can be odd or even lengths"""
            if length % 2 == 0:
                side1 = int((size - length) / 2)
                side2 = side1
            else:
                side1 = int((size - length) / 2)
                side2 = side1 + 1
            return side1, side2

        def scale(r, x):
            """ Gets scaled coordinates """
            return int(r * x)

        # getting centre coordinates with padding in mind
        if h > w:
            t_pad = int(margin / 2)
            b_pad = t_pad
            ratio = (size - margin) / h
            w, h = scale(ratio, w), scale(ratio, h)
            l_pad, r_pad = centre_pad(w)
        else:
            l_pad = int(margin / 2)
            r_pad = l_pad
            ratio = (size - margin) / w
            w, h = scale(ratio, w), scale(ratio, h)
            t_pad, b_pad = centre_pad(h)

        cell = cv2.resize(cell, (w, h))
        cell = cv2.copyMakeBorder(cell, t_pad, b_pad, l_pad,
                                r_pad, cv2.BORDER_CONSTANT, None, background)
        return cv2.resize(cell, (size, size))


    def fetch_essential_feature(self,puzzle, scan_tl=None, scan_br=None):
        """
        Finds the digit in square, and makes it more visible. While darkening everything else.
        \n @param puzzle <numpy.ndarray>
        \n @param scan_tl <List>: top-left scan position
        \n @param scan_br <List>: bottom-right scan position
        """
        img = puzzle.copy()  # Copy the image, leaving the original untouched
        height, width = img.shape[:2]

        max_area = 0
        seed_point = (None, None)

        if scan_tl is None:
            scan_tl = [0, 0]

        if scan_br is None:
            scan_br = [width, height]

        # Loop through the copied image (this is the whole puzzle)
        for x in range(scan_tl[0], scan_br[0]):
            for y in range(scan_tl[1], scan_br[1]):
                # Only operate on light or white squares. A black square means it is an empy cell
                if img.item(y, x) == 255 and x < width and y < height:
                    area = cv2.floodFill(img, None, (x, y), 64)
                    if area[0] > max_area:  # Gets the area that should be the grid
                        max_area = area[0]
                        seed_point = (x, y)

        # Colour everything grey (compensates for features outside of our middle scanning range)
        for x in range(width):
            for y in range(height):
                if img.item(y, x) == 255 and x < width and y < height:
                    cv2.floodFill(img, None, (x, y), 64)

        # add some padding by 2 pixel on width and height for the bounding box
        mask = np.zeros((height + 2, width + 2), np.uint8)

        # Make digit bolder and easier to see
        if all([p is not None for p in seed_point]):
            cv2.floodFill(img, mask, seed_point, 255)

        top, bottom, left, right = height, 0, width, 0

        # darkening all non essential features (noise, erosion, and grid lines that may have leaked through)
        # this is so that the OCR engine only has to look at the pure digit without any issues
        for x in range(width):
            for y in range(height):
                if img.item(y, x) == 64: 
                    cv2.floodFill(img, mask, (x, y), 0)

                # Find the bounding parameters
                if img.item(y, x) == 255:
                    top = y if y < top else top
                    bottom = y if y > bottom else bottom
                    left = x if x < left else left
                    right = x if x > right else right

        bbox = [[left, top], [right, bottom]]
        return img, np.array(bbox, dtype='float32'), seed_point


    def extract_resize_digit(self,img, rect, size):
        """
            Extracts a square with a digit and resizes to fit OCR engine.
            \n@param img <numpy.ndarray>
            \n@param rect <numpy.ndarray>
            \n@param size <float>
            \nreturns <numpy.ndarray> [image, or empty array depending on if a number exists]
        """
        digit = self.crop_from_rect(img, rect)  # Get the digit box from the whole square

        # grabbing essential feature (digit)
        h, w = digit.shape[:2]
        margin = int(np.mean([h, w]) / 2.5)
        _, bbox, seed = self.fetch_essential_feature(
            digit, [margin, margin], [w - margin, h - margin])
        digit = self.crop_from_rect(digit, bbox)

        # Scale and pad the digit so that it fits a square of the digit size we're using for machine learning
        w = bbox[1][0] - bbox[0][0]
        h = bbox[1][1] - bbox[0][1]

        # Ignore any small bounding boxes
        if w > 0 and h > 0 and (w * h) > 100 and len(digit) > 0:
            return self.scale_and_centre(digit, size, 4)
        else:
            return np.zeros((size, 100), np.float32)


    def get_digits(self,img, squares, size):
        """
            Gets digits from the image of the puzzle provided.
            \n    @param img <numpy.ndarry>
            \n    @param squares <numpy.ndarray>
            \n    @param size <int>
        """
        self.digits = np.zeros((9, 9))
        img = self.clean_image(img.copy()) #pre_process image to get rid of noise 
        count = 0
        newC = 0
        for square in squares:
            num = self.extract_resize_digit(img, square, size).astype(np.float32)
            # turning the list of 81 in to a 2D array of 9x9
            if count >= 8:
                x = (count//9)
                y = (count % 9)
                if (num.mean() != 0):
                    val = self.get_string(num, 'eng', '1', '10')
                    self.digits[x, y] = val
                    newC += 1
            else:
                if (num.mean() != 0): #only if there is a number, meaning it wont be just black
                    val = self.get_string(num, 'eng', '1', '10')
                    self.digits[0, count] = val
                    newC += 1
            count += 1
            return self.digits



    def get_puzzle(self):
        """
        Parses the image of the given path to 2 dimensional puzzle to be solved.
        \n@param path <String>
        \nreturns digits <numpy.ndarray>
        """
        original = self.image
        processed = self.clean_image(original)
        corners = self.find_corners_of_puzzle(processed)
        cropped = self.get_puzzle_and_warp(original, corners)
        squares = self.assume_grid(cropped)
        digits = self.get_digits(cropped, squares, 125)
        return digits

    def get_string(self,img, lang, oem, psm):
        """
        Converts image to to string using pytesseract OCR engine.
        \n@param img <numpy.ndarray>
        \n@param lang <String>
        \n@param oem <String>
        \n@param psm <String>
        \nreturns <String>
        """
        result = pytesseract.image_to_string(img, config='-l '+lang+' --oem '+oem+' --psm '+psm+'-c tessedit_char_whitelist="0123456789"')
        return result

    def solve(self,puzzle):
        """
            Solve puzzle using brute-force method and backtracking
            \n @param puzzle <numpy.ndarray>
            \n returns Boolean
        """
        def valid(puzzle, num, pos):
            """
                Checks if number is valid for that cell
                \n @param puzzle <numpy.ndarray>
                \n @param num <int>
                \n @param pos <numpy.ndarray>
                \n returns Boolean
            """
            # Check row
            for i in range(len(puzzle[0])):
                if puzzle[pos[0]][i] == num and pos[1] != i:
                    return False

            # Check column
            for i in range(len(puzzle)):
                if puzzle[i][pos[1]] == num and pos[0] != i:
                    return False

            # Check box
            box_x = pos[1] // 3
            box_y = pos[0] // 3

            for i in range(box_y*3, box_y*3 + 3):
                for j in range(box_x * 3, box_x*3 + 3):
                    if puzzle[i][j] == num and (i,j) != pos:
                        return False

            return True
        def find_empty(bo):
            """
                Finds next empty position on the board
                \n @param bo <numpy.ndarray>
                \n returns <Tuple>
            """
            for i in range(len(bo)):
                for j in range(len(bo[0])):
                    if bo[i][j] == 0:
                        return (i, j)  # row, col

            return None
        find = find_empty(puzzle)
        if not find:
            return True
        else:
            row, col = find

        for i in range(1,10):
            if valid(puzzle, i, (row, col)):
                puzzle[row][col] = i

                if self.solve(puzzle):
                    return True

                puzzle[row][col] = 0

        return False
    
# self testing main (only for internal testing)
if __name__ == '__main__':
    img = cv2.imread('./original.jpg', cv2.IMREAD_GRAYSCALE)
    extractor = SudokuExtractor(img)
    puzzle = extractor.get_puzzle()
    extractor.solve(puzzle) # its pass by ref, so i dont need to get the board again



