
    // Variables to be edited by user
    let pdfDocumentName = "BytesBin_PDF";
    let scrollSpeed = 300
    let earlyStop = false

    // Global variable
    var imgCount = 0

    function generatePDF_DataFile (){ 
        let doc = "";
        let imgTags = document.getElementsByTagName("img");
        let checkURLString = "blob:https://drive.google.com/";
        let validImgTagCounter = 0;
        // console.log("image", imgCount)
        for (i = imgCount; i < imgTags.length; i++) {

            if (imgTags[i].src.substring(0, checkURLString.length) === checkURLString){
                imgCount = i;
                validImgTagCounter = validImgTagCounter + 1;
                //console.log(imgTags[i].src);
                let img = imgTags[i];

                let canvas = document.createElement('canvas');
                let context = canvas.getContext("2d");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                //console.log("Width: " + img.naturalWidth + ", Height: " + img.naturalHeight);
                context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                let imgDataURL = canvas.toDataURL();
                // console.log(imgDataURL);
            
                try{
                    if (doc === ""){
                        doc = imgDataURL;
                    }else{
                        doc = doc + "\n" + imgDataURL;
                    }
                } catch{
                    console.log(imgCount, imgTags.length)
                    break;
                }
            }
        }

        let anchorElement = document.createElement("a");
        let file = new Blob([doc], {type: 'text/plain'});

        url = URL.createObjectURL(file);
        anchorElement.href = url;
        anchorElement.download = pdfDocumentName + ".PDF_DataFile";
        document.body.appendChild(anchorElement);
        anchorElement.click();
        
        if(imgCount + 1 < imgTags.length){
            console.log("Please keep the tab open. Still processing the document. Remaining images:", imgTags.length - imgCount - 1)
            generatePDF_DataFile(); 
        } 
        else console.log("Script done. You can now safely close the document.");
    }

    let allElements = document.querySelectorAll("*");
    let chosenElement;
    let heightOfScrollableElement = 0;

    for (i = 0; i < allElements.length; i++) {
        if ( allElements[i].scrollHeight>=allElements[i].clientHeight){
            if (heightOfScrollableElement < allElements[i].scrollHeight){
                //console.log(allElements[i]);
                //console.log(allElements[i].scrollHeight);
                heightOfScrollableElement = allElements[i].scrollHeight;
                chosenElement = allElements[i];
            }
        }
    }

    if (chosenElement.scrollHeight > chosenElement.clientHeight){
        console.log("Auto Scroll");

        let scrollDistance = Math.round(chosenElement.clientHeight);
        console.log("scrollHeight: " + chosenElement.scrollHeight);
        console.log("scrollDistance: " + scrollDistance);

        let loopCounter = 0;
        function myLoop(remainingHeightToScroll, scrollToLocation) {
            loopCounter = loopCounter+1;
            console.log(loopCounter);

            setTimeout(function() {
                if (remainingHeightToScroll === 0){
                    scrollToLocation = scrollDistance;
                    chosenElement.scrollTo(0, scrollToLocation);
                    remainingHeightToScroll = chosenElement.scrollHeight - scrollDistance;
                }else{
                    scrollToLocation = scrollToLocation + scrollDistance ;
                    chosenElement.scrollTo(0, scrollToLocation);
                    remainingHeightToScroll = remainingHeightToScroll - scrollDistance;
                }

                // console.log("remainingHeightToScroll", remainingHeightToScroll)
                if (remainingHeightToScroll>= chosenElement.clientHeight && !earlyStop){
                    myLoop(remainingHeightToScroll, scrollToLocation)
                }else{
                    setTimeout(function() {
                        generatePDF_DataFile();
                    }, 1500)
                }

            }, scrollSpeed)
        }
        myLoop(0, 0);

    }else{
        console.log("No Scroll");
        setTimeout(function() {
            generatePDF_DataFile();
        }, 1500)
    }

