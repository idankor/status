let theGender = undefined;
let currentStep = 1;

// {{SET STEP FUNCTION}}

function setStep(stepNumber) {
  $(".step").css("display", "none");
  $(`#step-${stepNumber}`).css("display", "flex");
}

// *** STEP 1 -- GENDER ***

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

$("#btn-male").keyup(function (e) {
  if (e.keyCode == 13) {
    $("#the-output").append("בן ");
    theGender = "male";
    setStep(2);
    currentStep = 2;
    $("input").first().focus();
  }
});

$("#btn-female").keyup(function (e) {
  if (e.keyCode == 13) {
    $("#the-output").append("בת ");
    theGender = "female";
    setStep(2);
    currentStep = 2;
    $("input").first().focus();
  }
});

// *** STEP 2 -- AGE ***

$("#input-age").keyup(function (e) {

  if (e.keyCode == 13 && $("#input-age").val() > 0) {

    $("#the-output").append($("#input-age").val() + ", ");
    $("#btn-next-2").click();
    currentStep == 3;
    setStep(3);
    $("#step-3").find("#input-marital-status").focus();

    // MALE

    if (theGender == 'male') {
      $(document).ready(function() {
        var maritalStatusOptions= [
          "רווק",
          "נשוי",
          "פרוד",
          "אלמן",
        ];
        $('#input-marital-status').autocomplete({
          source: maritalStatusOptions,
          minLength: 0,
          autoFocus: true
        });
      });
    }

    // FEMALE

    if (theGender == 'female') {
      $(document).ready(function() {
        var maritalStatusOptions = [
          "רווקה",
          "נשואה",
          "פרודה",
          "אלמנה",
        ];
        $('#input-marital-status').autocomplete({
          source: maritalStatusOptions,
          minLength: 0,
          autoFocus: true
        });
      });
    }
  }
});

// *** STEP 3 -- MARITAL STATUS ***

$("#input-marital-status").keyup(function (e) {
  if (e.keyCode == 13 && $(this).val() != undefined) {
           $("#the-output").append($(this).val());
     $("#step-3").find("#input-children-number").focus();
 }
});

$(document).ready(function() {

  const agesArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

$("#input-children-number").keyup(function (e) {
    if (e.keyCode == 13 && $(this).val() === '0') {
     $('#the-output').append(', ');
    }
});

// *** STEP 4 -- SIBILINGS ***

$("#input-sibiling-number").keyup(function (e) {
  if (
    e.keyCode == 13 &&
    $("#input-sibiling-number").val() > 0 &&
    theGender == "male"
  ) {
    $("#the-output").append("לו ");
    $("#the-output").append($("#input-sibiling-number").val() + " אחאים,");
    $("#btn-next-2").click();
    $("#step-3").find("#input-sibiling-position").focus();
  }
});
