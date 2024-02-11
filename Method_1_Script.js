// Define the base name for the PDF document.
const pdfDocumentName = "Document";

// Initialize a variable to hold the concatenated data URLs of images.
let docDataUrls = "";

/**
 * Extracts and encodes images from the current page into a downloadable file.
 */
function generatePDFDataFile() {
  // Fetch all image elements on the page.
  const imgTags = document.getElementsByTagName("img");
  // Define the prefix for URLs to be considered (specific to Google Drive hosted images).
  const checkURLString = "blob:https://drive.google.com/";
  
  // Iterate over all image tags to check and process valid images.
  Array.from(imgTags).forEach(img => {
    // Check if the image's source URL matches the defined prefix.
    if (img.src.startsWith(checkURLString)) {
      // Prepare a canvas to draw the image for data URL conversion.
      const canvas = document.createElement('canvas');
      const context = canvas.getContext("2d");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      
      // Convert the canvas content to a data URL.
      const imgDataURL = canvas.toDataURL();
      // Append the new data URL to the document data, separated by newlines for multiple images.
      docDataUrls += `${docDataUrls ? "\n" : ""}${imgDataURL}`;
    }
  });

  // Create a Blob from the concatenated image data URLs.
  const file = new Blob([docDataUrls], {type: 'text/plain'});
  // Generate a URL for the Blob.
  const url = URL.createObjectURL(file);
  // Create an anchor element for downloading the file.
  const anchorElement = document.createElement("a");
  anchorElement.href = url;
  anchorElement.download = `${pdfDocumentName}.PDF_DataFile`;
  // Trigger the download.
  document.body.appendChild(anchorElement);
  anchorElement.click();
}

/**
 * Identifies the tallest scrollable element and scrolls through it before generating the PDF data file.
 */
function autoScrollAndGeneratePDF() {
  // Find all elements on the page.
  const allElements = document.querySelectorAll("*");
  // Initialize variables to track the tallest scrollable element and its height.
  let chosenElement = null;
  let heightOfScrollableElement = 0;

  // Iterate over all elements to find the tallest scrollable one.
  allElements.forEach(element => {
    if (element.scrollHeight > element.clientHeight) {
      if (heightOfScrollableElement < element.scrollHeight) {
        chosenElement = element;
        heightOfScrollableElement = element.scrollHeight;
      }
    }
  });

  // Check if a scrollable element was found and needs to be scrolled.
  if (chosenElement && chosenElement.scrollHeight > chosenElement.clientHeight) {
    console.log("Auto Scroll");
    const scrollDistance = Math.round(chosenElement.clientHeight / 2);
    let remainingHeightToScroll = chosenElement.scrollHeight;
    let scrollToLocation = 0;

    /**
     * Recursively scrolls the chosen element until fully scrolled.
     * @param {number} remainingHeight - Remaining height to scroll.
     * @param {number} scrollTo - Current scroll target within the element.
     */
    function myLoop(remainingHeight, scrollTo) {
      setTimeout(() => {
        scrollTo += scrollDistance;
        chosenElement.scrollTo(0, scrollTo);
        remainingHeight -= scrollDistance;

        if (remainingHeight > 0) {
          myLoop(remainingHeight, scrollTo);
        } else {
          // After the final scroll, wait a moment before generating the PDF data file.
          setTimeout(generatePDFDataFile, 1500);
        }
      }, 400);
    }

    // Start the scrolling process.
    myLoop(remainingHeightToScroll, scrollToLocation);
  } else {
    console.log("No Scroll Needed");
    // If no scrolling is needed, wait a moment before generating the PDF data file.
    setTimeout(generatePDFDataFile, 1500);
  }
}

// Start the process.
autoScrollAndGeneratePDF();
