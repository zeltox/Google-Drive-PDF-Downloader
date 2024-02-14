# Advanced Google Drive PDF Downloader Manual

Efficiently download high-quality, view-only PDFs from Google Drive using this script. It's designed for optimal performance, minimal resource usage, and is compatible with macOS, Windows, and Linux.

## Feature Highlights
- High-quality PDF downloads.
- Organizes PDF pages into a "Pages" directory.
- Fast download speeds with low CPU and RAM usage.
- Auto-adjusts PDF page size and orientation to match the source.
- Ensures complete page loading through automatic fast scrolling.
- Cross-platform support (Windows, Linux, macOS).

## Getting Started

### Method 1: Universal Solution
This method is robust, ensuring excellent performance across different scenarios, including macOS.

#### Steps to Use:
1. **Repository Setup**: Download and unzip this repository on your computer.
2. **Open PDF**: Go to the Google Drive view-only PDF file in your browser.
3. **Script Copy**: Open **"Method_1_Script.js"** from the repository, copy its contents.
4. **Execute in Web Console**:
    - For Chrome/Brave: Press `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (macOS) to open the console.
    - Paste the script and press Enter.
5. **File Saving**: A prompt will ask you to save a **".PDF_DataFile"**. Save it to the **"Input"** folder, located within the repository you've just unzipped.
6. **Generate PDF**:
    - On Windows, go to the **"Windows"** folder and run **"GeneratePDF.cmd"**.
    - On macOS/Linux, navigate to the **"Linux"** folder, and execute **"GeneratePDF"** via terminal.
7. **Retrieve PDF**: After processing, your PDF will be in the **"Output"** folder.

#### Enhanced Tips for Method 1:
- **Custom Naming**: Change the placeholder in **"Method_1_Script.js"** to a desired filename. Ensure ".pdf" extension is not added.
- **Quality Boost**: For improved resolution, increase browser zoom (200%-300%) prior to script execution.
- **Batch Downloads**: Place all **".PDF_DataFile"**s in the **"Input"** folder for bulk processing.

### Method 2: For Shorter Documents
Optimal for documents under 20 pages. Switch to Method 1 for larger documents or if performance issues occur.

#### Quick Start:
1. **Access PDF**: Visit the Google Drive PDF's URL in a browser.
2. **Script Preparation**: Copy all content from **"Method_2_Script.js"**.
3. **Web Console Execution**:
    - Open the console (use `Ctrl+Shift+J` or `Cmd+Option+J`).
    - Paste the script and hit Enter.
4. **PDF Download**: Save the PDF file when prompted.

#### Method 2 Tips:
- **Custom Filenames**: Adjust the filename in **"Method_2_Script.js"** by editing the placeholder.
- **Zoom for Quality**: Set zoom to 130%-150% for better quality, noting limits at higher zoom levels.

## Author & Acknowledgments
- **Pala**: Innovative scripting solutions. [Instagram](https://www.instagram.com/pala_zeltox/).
- Inspired by https://codingcat.codes.
- Uses [ImageMagick](https://github.com/ImageMagick/ImageMagick/) and [jsPDF](https://github.com/MrRio/jsPDF).

## Security Notice
Be cautious with scripts in your browser console. Always verify the script's source to prevent security risks.
