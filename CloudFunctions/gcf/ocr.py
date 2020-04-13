import os
from subprocess import STDOUT, check_call, Popen
"""
    Class that handles installing the OCR engine server. Only installs once, and should not do it again.
"""
class TesseractInstaller:

    def __init__(self):
        self.isInstalled = False
        #creates a subprocess, to install tesseract-ocr
        self.proc = Popen('apt-get install -y tesseract-ocr', shell=True, stdin=None, stdout=open(os.devnull,"wb"), stderr=STDOUT, executable="/bin/bash")
        self.proc.wait()
        self.isInstalled = True

    def installTesseract(self):
        if self.isInstalled is False:
            self.proc = Popen('apt-get install -y tesseract-ocr', shell=True, stdin=None, stdout=open(os.devnull,"wb"), stderr=STDOUT, executable="/bin/bash")
            self.proc.wait()
            self.isInstalled = True
        else: # already installed dont do anything
            self.isInstalled = True
            return