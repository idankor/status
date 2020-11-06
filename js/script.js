let theGender = undefined;

//
// STEP 1 - GENDER
//

document.getElementById("btn-male").addEventListener("click", (event) => {
  document.getElementById("the-output").value += "\r\n\r\n";
  document.getElementById("the-output").value += " בן";
  theGender = "male";
});

document.getElementById("btn-female").addEventListener("click", (event) => {
  document.getElementById("the-output").value += "\r\n\r\n";
  document.getElementById("the-output").value += " בת";
  theGender = "female";
});

// STEP 1 - GENDER

// STEP 2 - AGE

function waitForEnter() {
  document.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
      console.log("You pressed enter.");
    }
  });
}
