let theGender = undefined;
let currentStep = 1;

// {{SET STEP FUNCTION}}

function setStep(stepNumber) {
  $(".step").css("display", "none");
  $(`#step-${stepNumber}`).css("display", "flex");
  $("input").first().focus();
}

if (currentStep == 1) {
  $(document).keydown(function (e) {
    if (e.keyCode == 39) {
      $("#btn-male").focus();
    }
    if (e.keyCode == 37) {
      $("#btn-female").focus();
    }
  });
}
// *** STEP 1 -- GENDER ***

$("#btn-male").click(function () {
  $("#the-output").append("בן ");
  theGender = "male";
  currentStep = 2;
});

$("#btn-female").click(function () {
  $("#the-output").append("בת ");
  theGender = "female";
  currentStep = 2;
});

// *** STEP 2 -- AGE ***

$("#input-age").keyup(function (e) {
  if (e.keyCode == 13 && $("#input-age").val() > 0) {
    $("#the-output").append($("#input-age").val() + ", ");
    $("#btn-next-2").click();
    currentStep == 3;
    setStep(3);
  }
});
