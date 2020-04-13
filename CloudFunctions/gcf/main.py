from flask import escape, Flask, request, Response
import jsonpickle
import urllib.request
import cv2
import pytesseract
import imutils
import numpy as np
import argparse
from ocr import TesseractInstaller
from sudoku import SudokuExtractor

# needs to be global to keep state. Otherwise it will download every time I make a request.
ocr = TesseractInstaller()

def detect_text(request):
    # install tesseract only if it does not exist.
    ocr.installTesseract()

    # actually handle the request now
    request_json = request.get_json(silent=True)
    request_args = request.args


    bucket = 'sudokucapnsolve.appspot.com'
    file = 'uploads/photo.jpg'
    gcs_url = 'https://%(bucket)s.storage.googleapis.com/%(file)s' % {'bucket':bucket, 'file':file}

    resp = ''
    with urllib.request.urlopen(gcs_url) as url:
        resp= url.read()
    image = np.asarray(bytearray(resp), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_GRAYSCALE)
    extractor = SudokuExtractor(image)
    sudoku_puzzle = extractor.get_puzzle()
    extractor.solve(sudoku_puzzle) # its pass by ref, so i dont need to get the board again

    response = {'message': sudoku_puzzle}
    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled, status=200, mimetype="application/json")

    

