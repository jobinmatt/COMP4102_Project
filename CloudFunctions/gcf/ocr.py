import os
from subprocess import STDOUT, check_call
class TesseractInstaller:

    def __init__(self):
        self.isInstalled = False
        #creates a subprocess, to install tesseract-ocr
        self.proc = subprocess.Popen('apt-get install -y tesseract-ocr', shell=True, stdin=None, stdout=open(os.devnull,"wb"), stderr=STDOUT, executable="/bin/bash")
        self.proc.wait()
        self.isInstalled = True

    def installTesseract(self):
        if self.isInstalled is False:
            self.proc = subprocess.Popen('apt-get install -y tesseract-ocr', shell=True, stdin=None, stdout=open(os.devnull,"wb"), stderr=STDOUT, executable="/bin/bash")
            self.proc.wait()
            self.isInstalled = True
        else:
            self.isInstalled = False
            return