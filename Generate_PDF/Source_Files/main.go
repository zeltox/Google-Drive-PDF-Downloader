package main

import (
	"bufio"
	"bytes"
	"encoding/base64"
	"fmt"
	"github.com/zeltox/golang/custom/files"
	"github.com/zeltox/golang/custom/pi"
	"github.com/zeltox/golang/custom/strings"
	"image/png"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strconv"
	"time"
)

func numberPadding(pageNumber int, paddingLen int) (string, error) {
	s := strconv.Itoa(pageNumber)
	sLen := len(s)

	if paddingLen < 0 {
		return "", fmt.Errorf("func numberPadding(): Negative value was passed to paddingLen!\n")
	} else if paddingLen == 0 {
		return "", fmt.Errorf("func numberPadding(): Zero was passed to paddingLen!\n")
	}

	if sLen == paddingLen {
		return s, nil
	} else if sLen > paddingLen {
		return "", fmt.Errorf("func numberPadding(): Value passed for paddingLen is lesser than sLen value!\n")
	} else if sLen < paddingLen {

		for j := 1; j <= paddingLen-sLen; j++ {
			s = "0" + s
		}
		//return s, nil
	}

	return s, nil
}

func main() {
	inputDirLocation := "../Input"
	outputDirLocation := "../Output"
	dataFileExtension := ".PDF_DataFile"

	if files.CheckDir(inputDirLocation) == false {
		log.Fatalf("Input directory does not exist!\n")
	}

	dirContents, err := ioutil.ReadDir(inputDirLocation)
	if err != nil {
		log.Fatalf("An error occured while reading the contents of Input directory \"%s\"\n%v\n", inputDirLocation, err)
	}

	if files.CheckDir(outputDirLocation) == false {
		err := os.Mkdir(outputDirLocation, 0700)
		if err != nil {
			log.Fatalf("An error occured while creating the Output directory \"%s\"\n%v\n", outputDirLocation, err)
		}
	}

	var pdf_DataFiles []string

	for _, element := range dirContents {
		if element.IsDir() == false {
			fileName := element.Name()
			if len(fileName) > len(dataFileExtension) && fileName[len(fileName)-len(dataFileExtension):] == dataFileExtension {
				//fmt.Println(fileName)
				pdf_DataFiles = append(pdf_DataFiles, fileName)
			}
		}
	}

	fmt.Printf("\n%s \".PDF_DataFile\" found!", strconv.Itoa(len(pdf_DataFiles)))

	for _, pdf_DataFile := range pdf_DataFiles {

		pdfDocumentName := pdf_DataFile[:len(pdf_DataFile)-len(dataFileExtension)]
		individualOuputDir := outputDirLocation + "/" + pdfDocumentName
		individualOuputDirForPages := individualOuputDir + "/Pages"

		fmt.Printf("\n\nProcessing %v\n", pdf_DataFile)

		if files.CheckDir(individualOuputDir) {
			var deleteDir bool

			for {
				fmt.Printf("\"%s\" directory is already present, do you want to delete and create new directory? Press Y or N\n", individualOuputDir)
				userInput := ""
				scanner := bufio.NewScanner(os.Stdin)
				for scanner.Scan() {
					userInput = strings.TrimSpace(scanner.Text())
					break
				}
				if scanner.Err() != nil {
					log.Fatalf("After user input, bufio.NewScanner(os.Stdin) failed with this error : %s\n", scanner.Err())
				}

				if userInput == "Y" || userInput == "y" {
					deleteDir = true
					fmt.Printf("\n")
					break
				} else if userInput == "N" || userInput == "n" {
					deleteDir = false
					break
				} else {
					fmt.Printf("Invalid user input!\n\n")
				}
			}

			if deleteDir {
				err := os.RemoveAll(individualOuputDir)
				if err != nil {
					log.Fatalf("An error occured while deleting the directory \"%s\"\n%v\n", outputDirLocation, err)
				}

				err = os.MkdirAll(individualOuputDirForPages, 0700)
				if err != nil {
					log.Fatalf("An error occured while creating the directories \"%s\"\n%v\n", individualOuputDirForPages, err)
				}

			} else {
				fmt.Printf("Skipped %v", pdf_DataFile)
				continue
			}

		} else {
			err = os.MkdirAll(individualOuputDirForPages, 0700)
			if err != nil {
				log.Fatalf("An error occured while creating the directories \"%s\"\n%v\n", individualOuputDirForPages, err)
			}
		}

		lineCounter := 0
		pageCounter := 0

		//fmt.Println(pdf_DataFile)

		file := files.OpenFile(inputDirLocation + "/" + pdf_DataFile)
		reader := bufio.NewReader(file)
		for {
			line, err := reader.ReadString('\n')
			line = strings.TrimSpace(line)
			sLen := len(line)
			if sLen > 0 {
				pageCounter = pageCounter + 1
			}

			if err == io.EOF {
				break
			}
		}
		files.CloseFile(file)

		noOfPages := pageCounter
		paddingLen := len(strconv.Itoa(noOfPages))
		pageCounter = 0

		file = files.OpenFile(inputDirLocation + "/" + pdf_DataFile)
		reader = bufio.NewReader(file)

		piChannel := make(chan string)
		pi.ProcessingIndicator("Generating "+pdfDocumentName+".pdf", "Successfully generated "+pdfDocumentName+".pdf!", 10, 200*time.Millisecond, piChannel)

		for {
			line, err := reader.ReadString('\n')
			lineCounter = lineCounter + 1
			line = strings.TrimSpace(line)

			sLen := len(line)
			//fmt.Println(sLen)
			if sLen > 0 {

				base64CheckStr := "data:image/png;base64,"

				if len(line) > len(base64CheckStr) && line[:len(base64CheckStr)] == base64CheckStr {

					line = strings.TrimSpace(line[len(base64CheckStr):])

					base64Byte, err := base64.StdEncoding.DecodeString(line)
					if err != nil {
						log.Fatalf("%s, Base64 Decoder cannot decode line \"%s\" as it contains invalid Base64 data\n%v\n", pdf_DataFile, strconv.Itoa(lineCounter), err)
					}

					r := bytes.NewReader(base64Byte)
					pngImage, err := png.Decode(r)
					if err != nil {
						log.Fatalf("%s, PNG Decoder cannot decode line \"%s\" as it contains invalid PNG data\n%v\n", pdf_DataFile, strconv.Itoa(lineCounter), err)
					}

					pageCounter = pageCounter + 1
					//fmt.Println(pageCounter)
					str, err := numberPadding(pageCounter, paddingLen)
					if err != nil {
						log.Fatalf("An error occured after processing the value pageCounter: \"%v\", paddingLen: \"%v\"\n%v\n", pageCounter, paddingLen, err)
					}

					pngImageFile := files.CreateFile(individualOuputDirForPages + "/" + str + ".png")
					err = png.Encode(pngImageFile, pngImage)
					if err != nil {
						log.Fatalf("%s, PNG Encoder cannot encode line \"%s\" as it contains invalid data\n%v\n", pdf_DataFile, strconv.Itoa(lineCounter), err)
					}

				} else {
					log.Fatalf("%s, Cannot decode line \"%s\" as it contains invalid PNG Base64 data\n", pdf_DataFile, strconv.Itoa(lineCounter))
				}

			}

			if err == io.EOF {
				break
			}
		}

		cmd_name := "../Source_Files/magick" //
		cmd_args := []string{individualOuputDirForPages + "/*.png",
			//"-unsharp",
			//"0.25x0.25+12+0.035",
			individualOuputDir + "/" + pdfDocumentName + ".pdf"}
		cmd1 := exec.Command(cmd_name, cmd_args...)
		output1, err := cmd1.CombinedOutput()

		Reader := bytes.NewReader(output1) // output is slice of bytes
		scanner := bufio.NewScanner(Reader)

		if err != nil {
			for scanner.Scan() {
				line := strings.TrimSpace(scanner.Text())
				fmt.Println(line)
			}
			log.Fatalf("cmd.Run() failed with %s\n", err)
		} else {
			piChannel <- "END"
			//fmt.Printf("\n\n")
		}

		files.CloseFile(file)
	}
	fmt.Printf("\n")
}
