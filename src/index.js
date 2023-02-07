import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// Business Logic




function getDinoText() {
  let promise = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    const url = "https://dinoipsum.com/api/?format=json&paragraphs=1&words=1";
    request.addEventListener("loadend", function () {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve(response);
      } else {
        reject(this);
      }
    });
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function (response) {
    getApiResponse(response);
    callCompareUserInput(response);
  }, function (errorMessage) {
    printError(errorMessage);
  });
}


// UI Logic

function getApiResponse(apiResponse) {
  let ul = document.getElementById("show-response");

  let dinoArray = apiResponse[0][0].toString().split('');

  let i = 0;
  console.log(dinoArray);
  for (let x = 0; x < dinoArray.length; x++) {
    let pEl = document.createElement('p');
    let pEl2 = document.createElement('p');
    pEl.innerText = '_';
    pEl2.innerText = ' ';
    pEl.setAttribute("id", `${i}`);
    console.log(i);
    ul.append(pEl);
    ul.append(pEl2);
    i++;
  }
}

function callCompareUserInput(apiResponse) {
  document.querySelector('#letter-button').addEventListener("click", function (event) {
    event.preventDefault();
    
    compareUserInput(apiResponse);
  });
}

function compareUserInput(apiResponse) {
  let compareLetter = document.querySelector("#letter").value;
  let wordArray = apiResponse[0][0].toString().split('');
  let i = 0;
  wordArray.forEach(element => {
    if (element.toUpperCase() === compareLetter.toUpperCase()){
      console.log("hello");
      document.getElementById(`${i}`).innerText = element;
    }
    i++;
  });
}



function printError(apiResponse) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the dino data for  ${apiResponse}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  getDinoText();
}

window.addEventListener("load", function () {
  document.querySelector('#get-dinoText').addEventListener("click", handleFormSubmission);
});