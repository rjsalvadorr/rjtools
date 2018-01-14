# rjmdpdf

This is a Python script for quickly and easily converting markdown documents to PDF, using `pandoc` and `wkhtmltopdf`.

## Setup
First, make the Python script executable.

### Linux
You can follow [these instructions from StackOverflow](https://stackoverflow.com/questions/15587877/run-a-python-script-in-terminal-without-the-python-command).  

### Windows
- Make sure the Python interpreter is on the `PATH` system variable.
- "`.PY`" should also be on the `PATHEXT` system variable.
- Add the script folder to the `PATH` as well.

## Usage
Once you've got everything set up, then you can just run this like: `rjmdpdf path/to/input1.md path/to/input2.md`

## Dependencies
For *rjmdpdf* to work, both of these programs must be available for use on the command line:

- pandoc
- wkhtmltopdf
