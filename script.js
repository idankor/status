let theGender = undefined;

// STEP 1 - GENDER

if (document.getElementById('step-number').innerHTML == '1') {
  document.getElementById("btn-male").addEventListener("click", (event) => {
    document.getElementById("the-output").value += "\r\n\r\n";
    document.getElementById("the-output").value += " בן";
    theGender = "male";
    clearCard();
    let tempElement = document.createElement("div");
    tempElement.innerHTML = "גיל";
    tempElement.classList.add("current-title");
    document.getElementById("main-card").appendChild(tempElement);
    tempElement = document.createElement("input");
    tempElement.classList.add("field-lg");
    tempElement.id = "current-field";
    document.getElementById("main-card").style.flexDirection = "column";
    document.getElementById("main-card").style.justifyContent = "space-between";
    document.getElementById("main-card").style.padding = "20% 0px 20% 0px";
    document.getElementById("main-card").appendChild(tempElement);
    document.getElementById("current-field").focus();
    document.getElementById('step-number').innerHTML = '2';
    });

  document.getElementById("btn-female").addEventListener("click", (event) => {
    document.getElementById("the-output").value += "\r\n\r\n";
    document.getElementById("the-output").value += " בת";
    theGender = "female";
    clearCard();
    let tempElement = document.createElement("div");
    tempElement.innerHTML = "גיל";
    tempElement.classList.add("current-title");
    document.getElementById("main-card").appendChild(tempElement);
    tempElement = document.createElement("input");
    tempElement.classList.add("field-lg");
    tempElement.id = "current-field";
    document.getElementById("main-card").style.flexDirection = "column";
    document.getElementById("main-card").style.justifyContent = "space-between";
    document.getElementById("main-card").style.padding = "20% 0px 20% 0px";
    document.getElementById("main-card").appendChild(tempElement);
    document.getElementById("current-field").focus();
    document.getElementById('step-number').innerHTML = '2';
    });
}

// STEP 2 - AGE

if (stepNumber == 2) {
    console.log('this is step 2');
}

function clearCard() {
  document.getElementById("main-card").textContent = "";
}

function waitForEnter() {
    document.addEventListener('keyup', (event) => {
        if (event.keyCode == 13) {
            console.log('You pressed enter.');
        }
    })
}
