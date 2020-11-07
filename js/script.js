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
    currentStep == 3;
    setStep(3);
    $("#step-3").find("#input-marital-status").focus();

    // MALE

    if (theGender == "male") {
      $(document).ready(function () {
        var maritalStatusOptions = ["רווק", "נשוי", "פרוד", "אלמן"];
        maritalStatusOptions.sort();
        $("#input-marital-status").autocomplete({
          source: maritalStatusOptions,
          minLength: 0,
          autoFocus: true,
        });
      });
    }

    // FEMALE

    if (theGender == "female") {
      $(document).ready(function () {
        var maritalStatusOptions = ["רווקה", "נשואה", "פרודה", "אלמנה"];
        maritalStatusOptions.sort();
        $("#input-marital-status").autocomplete({
          source: maritalStatusOptions,
          minLength: 0,
          autoFocus: true,
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

$(document).ready(function () {
  var agesArray = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  $("#input-children-number").autocomplete({
    source: agesArray,
    minLength: 0,
    autoFocus: true,
  });
});

$("#input-children-number").keyup(function (e) {
  if (e.keyCode == 13 && $(this).val() === "0") {
    $("#the-output").append(", ללא ילדים, ");
    currentStep = 4;
    setStep(4);
    $("#step-4").find("#input-sibiling-number").focus();
  }

  if (e.keyCode == 13 && $(this).val() > "0") {
    $("#the-output").append(" + " + $(this).val() + ", ");
    currentStep = 4;
    setStep(4);
    $("#step-4").find("#input-sibiling-number").focus();
  }
});

// *** STEP 4 -- SIBILINGS ***

if (theGender == "male") {
  $(document).ready(function () {
    var sibilingNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    $("#input-sibiling-number").autocomplete({
      source: sibilingNumber,
      minLength: 0,
      autoFocus: true,
    });
  });
}

$("#input-sibiling-number").keyup(function (e) {
  if (e.keyCode == 13 && $(this).is(":focus")) {
    $("#step-4").find("#input-sibiling-position").focus();
  }
});
