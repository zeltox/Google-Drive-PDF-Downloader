
    let pdfDocumentName = "Document";
    let doc = "";

    function generatePDF_DataFile (){
        let imgTags = document.getElementsByTagName("img");
        let checkURLString = "blob:https://drive.google.com/";
        let validImgTagCounter = 0;
        for (i = 0; i < imgTags.length; i++) {

            if (imgTags[i].src.substring(0, checkURLString.length) === checkURLString){
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

                if (doc === ""){
                    doc = imgDataURL;
                }else{
                    doc = doc + "\n" + imgDataURL;
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

        let scrollDistance = Math.round(chosenElement.clientHeight/2);
        //console.log("scrollHeight: " + chosenElement.scrollHeight);
        //console.log("scrollDistance: " + scrollDistance);

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

                if (remainingHeightToScroll >= chosenElement.clientHeight){
                    myLoop(remainingHeightToScroll, scrollToLocation)
                }else{
                    setTimeout(function() {
                        generatePDF_DataFile();
                    }, 1500)
                }

            }, 400)
        }
        myLoop(0, 0);

    }else{
        console.log("No Scroll");
        setTimeout(function() {
            generatePDF_DataFile();
        }, 1500)
    }

