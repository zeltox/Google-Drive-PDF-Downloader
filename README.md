# Google Drive PDF Downloader

This script will help you to download protected view only PDF files from Google Drive easily.

## Features
* Lets you to download high quality PDF files.
* Saves all pages individually inside a directory called Pages.
* Fast download speed.
* Efficient CPU and RAM usage.
* Automatically adjusts the page size and orientation according to the source document.
* Automatic fast scrolling to load all the pages correctly.
* Supports Windows, Linux etc.

## How to use - Method 1 
### This method is fast, works for all types of scenarios and performance is great!
1. Download this repository to your computer and unzip it.
2. Enter the URL of the protected view only PDF File into your browser. (eg: Firefox, Chrome etc.)
3. Open the script **"Method_1_Script.js"** and copy all the contents.
4. Then open the browser web console.
5. Paste the copied script into the console and press enter.
6. After few seconds the browser will prompt you to save a file with extension **".PDF_DataFile"**
7. Save this file and copy it into the **"Input"** directory which is inside the repository you downloaded earlier!
8. If you are using Windows then navigate to **"Windows"** directory and double click on **"GeneratePDF.cmd"**, or If you are using Linux then navigate to **"Linux"** directory and execute **"GeneratePDF"**
9. A successful message will be shown once the whole process completes.
10. Navigate to the **"Output"** directory and enjoy!

## Tips for Method 1
* You should always give a custom file name by changing the place holder "Document" to "Cool_File_Name" in  **Method_1_Script.js**. Do not include **".pdf"** file extension along with the document name here! 
```
let pdfDocumentName = "Document";
```
Change to this
```
let pdfDocumentName = "Cool_File_Name"; 
```
* By default this script will download PDF file with the highest quality available, but just in case if you need even better quality simply zoom in your browser (eg: 200% to 300%) then follow the above steps to download.
* The Output directory contains individual PDF directories for efficient organizing and **"Pages"** directory is present in each one of these.
* The **"Pages"** directory contains individual pages of PDF document in .png format.
* For bulk PDF generation, download all **".PDF_DataFile"** for your viewonly PDF documents and copy these inside **"Input"** directory then double click on **"GeneratePDF.cmd"** to execute (For Linux execute **"GeneratePDF"** which is inside the **"Linux"** directory).
* During execution of **"GeneratePDF.cmd"**, PDF directory will be creates inside **"Output"** directory based on the custom **"pdfDocumentName"** given earlier.
If the PDF directory name already present in **"Output"** directory, then it will ask user's permission to delete it. Just Press **"Y"** for YES or **"N"** for NO. If you press N then it will skip processing of that specific **".PDF_DataFile"** and it's PDF won't be generated.

## How to use - Method 2 
#### Use this method only for PDF with less than 20 pages, if you experience any errors or slow down then follow Method 1
1. Enter the URL of the protected view only PDF File into your browser. (eg: Firefox, Chrome etc.)
2. Open the script **"Method_2_Script.js"** and copy all the contents.
3. Then open the browser web console.
4. Paste the copied script into the console and press enter.
5. After few seconds the browser will prompt you to save the PDF file.
6. Save the file and enjoy!

## Tips for Method 2
* You should give a custom file name by changing the place holder "Document" to "Cool_File_Name" in **"Method_2_Script.js"**. Do not include **".pdf"** file extension along with the document name here! 
```
let pdfDocumentName = "Document";
```
Change to this
```
let pdfDocumentName = "Cool_File_Name"; 
```
* By default this script will download PDF file with the highest quality available, but just in case if you need even better quality simply zoom in your browser (eg: 130% to 150%) then follow the above steps to download. If you increase the zoom level more than 150% Method_2_Script.js will struggle to generate the PDF.

## Author
* **Pala** - [Follow me on Instagram!](https://www.instagram.com/pala_zeltox/)  
Feel free to contact me for projects.

## Inspiration
Inspired from https://codingcat.codes/2019/01/09/download-view-protected-pdf-google-drive-js-code/

## Dependencies
* Used [ImageMagick](https://github.com/ImageMagick/ImageMagick/) to generate PDF for Method 1
* Used [jsPDF](https://github.com/MrRio/jsPDF) to generate PDF for Method 2


## Security Tips!
* Always be aware of what you paste into the browser console, malicious code can do alot of harm.



