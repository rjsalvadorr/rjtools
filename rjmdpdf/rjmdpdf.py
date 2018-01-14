#!/usr/bin/python
import sys
import os
import shutil
import subprocess
import traceback

print "rjmdpdf v0.0.1"

scriptDir = os.path.dirname(os.path.realpath(__file__))
stagingHtmlFilename = "temp.html"
stagingHtmlPath = os.path.join(scriptDir, stagingHtmlFilename)
headerHtmlPath = os.path.join(scriptDir, "header.html")
footerHtmlPath = os.path.join(scriptDir, "footer.html")

workingDir = os.getcwd()
filePaths = []

if len(sys.argv) > 0:
    try:
        for index, arg in enumerate(sys.argv):
            if(index > 0):
                # Check if argument is a valid path, and the file exists
                if os.path.isfile(arg) == False:
                    raise ValueError('Path name does not point to a file: \'' + arg + "\'")

                # If the argument is a relative path, replace it with an absolute path
                if os.path.isabs(arg):
                    filePath = arg
                else:
                    filePath = os.path.abspath(arg)

                filePaths.append(filePath)

        if len(filePaths) == 0:
            raise ValueError("No files passed in!")

    except ValueError as exc:
        print "ValueError! " + str(exc)
    except Exception as exc:
        print "Unexpected error: " + repr(exc)
        print traceback.format_exc()



for fPath in filePaths:
    fileDir, inputFileName = os.path.split(fPath)
    outpuFileName = inputFileName.replace(".md", ".pdf")
    outputPath = os.path.join(fileDir, outpuFileName)

    print "Converting " + fPath

    try:
        # Using pandoc, generate the base HTML for the document.
        bodyHtml = subprocess.check_output(["pandoc", "-f", "markdown", "-t", "html5", fPath])

        # Create the final HTML file with a reference to the stylesheet
        shutil.copyfile(headerHtmlPath, stagingHtmlPath)

        with open(footerHtmlPath, 'r') as footerFile:
            footerData = footerFile.read()

        with open(stagingHtmlPath, 'a') as outFile:
            outFile.write(bodyHtml)
            outFile.write(footerData)

        # Use wkhtmltopdf to create the PDF
        subprocess.call(["wkhtmltopdf", stagingHtmlPath, outputPath])
        print "PDF file was written as " + outputPath

    except Exception as exc:
        print "PDF conversion failed due to " + repr(exc)
        print traceback.format_exc()
