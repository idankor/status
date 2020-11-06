let theGender = undefined;

function setStep(stepNumber) {
  $(".step").css("display", "none");
  $("#step-2").css("display", "flex");
  $("input").first().focus();
}

$(document).keydown(function (e) {
  if (e.keyCode == 39) {
    $("#btn-male").focus();
  }
  if (e.keyCode == 37) {
    $("#btn-female").focus();
  }
});

//
// STEP 1 - GENDER
//

document.getElementById("btn-male").addEventListener("click", (event) => {
  document.getElementById("the-output").value += " בן";
  theGender = "male";
});

document.getElementById("btn-female").addEventListener("click", (event) => {
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
