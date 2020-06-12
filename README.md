# Google Drive PDF Downloader

This script will help you to download protected view only PDF files from Google Drive easily.

## Features
* Lets you to download high quality PDF files.
* Automatically adjusts the page size and orientation according to the source document.
* Automatic fast scrolling to load all the pages correctly.

## How to use
1. Enter the URL of the protected view only PDF File in to your browser. (eg: Firefox, Chrome etc.)
2. Open the browser web console.
3. Copy the full script and paste into the console.
4. Press enter.
5. After few seconds the browser will prompt you to save the PDF file.
6. Save the file and enjoy!

## Tips
* You can give a custom file name by changing the place holder "Document.pdf" to "Cool_File_Name.pdf" in the script.
```
let pdfDocumentName = "Document.pdf"; 
```
Change to this
```
let pdfDocumentName = "Cool_File_Name.pdf"; 
```
* By default this script will download PDF file with the highest quality available, but just in case if you need even better quality simply zoom in your browser (eg: 130% to 150%) then follow the above steps.

## Author
* **Pala** - [Follow me on Instagram!](https://www.instagram.com/pala_zeltox/)  
Feel free to contact me for projects.

## Inspiration
Inspired from https://codingcat.codes/2019/01/09/download-view-protected-pdf-google-drive-js-code/

## Dependencies
Used [jsPDF](https://github.com/MrRio/jsPDF) for PDF generation.


## Security Tips!
* Always be aware of what you paste into the browser console, malicious code can do alot of harm.



