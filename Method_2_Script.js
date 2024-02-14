// Function to dynamically load the jsPDF library and execute a callback function once it's loaded
function loadJsPDF(callback) {
    // Create a new script element
    let script = document.createElement("script");
    // Assign a callback function to be called once the script is fully loaded
    script.onload = callback;
    // Set the source URL of the script to the jsPDF library
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js';
    // Append the script element to the body of the document, triggering the download and execution of the jsPDF script
    document.body.appendChild(script);
}

// Main function to process the page content and generate a PDF
function processAndGeneratePDF() {
    // Initialize the document name with the desired output filename
    const pdfDocumentName = "Document.pdf";
    // This variable will hold our jsPDF instance once it's created
    let doc = null;

    // Function to add an individual image to the PDF document
    function addImageToPDF(img) {
        // Create a canvas element to draw the image on
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        // Set the canvas dimensions to match the image dimensions
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas content to a data URL that jsPDF can use
        const imgData = canvas.toDataURL();
        // Determine the orientation of the image for the PDF layout
        const orientation = img.naturalWidth > img.naturalHeight ? "l" : "p";
        // Set a scale factor to adjust the image size in the PDF
        const scaleFactor = 1.335;
        // Calculate the page dimensions based on the image size and scale factor
        const pageWidth = img.naturalWidth * scaleFactor;
        const pageHeight = img.naturalHeight * scaleFactor;

        // Check if the jsPDF instance exists, create it if not, or add a new page to it if it does
        if (!doc) {
            doc = new jsPDF({
                orientation,
                unit: "px",
                format: [pageWidth, pageHeight],
            });
        } else {
            doc.addPage([pageWidth, pageHeight], orientation);
        }

        // Add the image to the PDF document
        doc.addImage(imgData, "PNG", 0, 0, img.naturalWidth, img.naturalHeight);
    }

    // Function to identify valid images and process them for inclusion in the PDF
    function processValidImages() {
        // Retrieve all image elements from the document
        const imgTags = document.getElementsByTagName("img");
        // Define the URL pattern to filter images that should be included in the PDF
        const checkURLString = "blob:https://drive.google.com/";
        // Iterate over each image and add it to the PDF if it matches the pattern
        Array.from(imgTags).forEach(img => {
            if (img.src.startsWith(checkURLString)) {
                addImageToPDF(img);
            }
        });

        // Once all valid images are processed, save the PDF document
        if (doc) {
            doc.save(pdfDocumentName);
        }
    }

    // Function to handle scrolling for elements with significant scrollable content before generating the PDF
    function handleAutoScrollAndGeneratePDF() {
        // Identify all elements that have scrollable content
        const elementsWithScroll = Array.from(document.querySelectorAll("*")).filter(el => el.scrollHeight > el.clientHeight);
        // Select the element with the maximum scroll height to focus on
        const chosenElement = elementsWithScroll.reduce((maxEl, currentEl) => currentEl.scrollHeight > (maxEl.scrollHeight || 0) ? currentEl : maxEl, {});

        // Check if the chosen element requires scrolling
        if (chosenElement.scrollHeight > chosenElement.clientHeight) {
            console.log("Auto Scroll");
            // Initialize the remaining height to scroll through
            let remainingHeight = chosenElement.scrollHeight;
            // Calculate the distance to scroll each iteration, based on half the client height of the element
            const scrollDistance = Math.round(chosenElement.clientHeight / 2);

            // Recursive function to scroll through the element and generate the PDF afterwards
            function scrollAndGenerate() {
                if (remainingHeight > 0) {
                    // Scroll the element by the calculated distance
                    chosenElement.scrollBy(0, scrollDistance);
                    // Subtract the scrolled distance from the remaining height
                    remainingHeight -= scrollDistance;
                    // Continue scrolling after a brief delay
                    setTimeout(scrollAndGenerate, 500);
                } else {
                    // Once scrolling is complete, wait briefly before generating the PDF
                    setTimeout(processValidImages, 1500);
                }
            }

            // Start the scrolling process
            scrollAndGenerate();
        } else {
            // If no scrolling is needed, wait briefly before generating the PDF directly
            console.log("No Scroll");
            setTimeout(processValidImages, 1500);
        }
    }

    // Initiate the process of handling scrollable content and generating the PDF
    handleAutoScrollAndGeneratePDF();
}

// Start the entire process by loading the jsPDF library and then executing the main function once it's loaded
loadJsPDF(processAndGeneratePDF);
