let theGender = undefined;
let currentStep = 1;
let maleNumbers = [
  undefined,
  undefined,
  "שני",
  "שלושה",
  "ארבעה",
  "חמישה",
  "שישה",
  "שבעה",
  "שמונה",
  "תשעה",
  "עשרה",
];

// {{SET STEP FUNCTION}}

function setStep(stepNumber) {
  $(".step").css("display", "none");
  $(`#step-${stepNumber}`).css("display", "flex");
}

// *** // STEP 1 // GENDER // *** //

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

// GO FUNCTION

function step1go(gender) {
  if (gender == "male") {
    $("#the-output").append("<פרטים אישיים>" + "\r\n\r\n");
    $("#the-output").append("בן ");
  }
  if (gender == "female") {
    $("#the-output").append("<פרטים אישיים>" + "\r\n\r\n");
    $("#the-output").append("בת ");
  }
  setStep(2);
  currentStep = 2;
  $("input").first().focus();
}

// --**-- MALE --**--

// {{ENTER}}

$("#btn-male").keyup(function (e) {
  if (e.keyCode == 13) {
    theGender = "male";
    step1go(theGender);
  }
});

// {{CLICK}}

$("#btn-male").click(function () {
  theGender = "male";
  step1go(theGender);
});

// --**-- FEMALE --**--

// {{ENTER}}

$("#btn-female").keyup(function (e) {
  if (e.keyCode == 13) {
    theGender = "female";
    step1go(theGender);
  }
});

// {{CLICK}}

$("#btn-female").click(function () {
  theGender = "female";
  step1go(theGender);
});

// *** STEP 2 -- AGE ***

$("#input-age").focus(function () {
  $(this).keyup(function (e) {
    if (e.keyCode == 13 && $(this).val() > 0) {
      $("#the-output").append($(this).val() + ", ");
      currentStep == 3;
      setStep(3);
      $("#step-3").find("#switch-religion").focus();
    }
  });
});

// *** STEP 3 -- RELIGION ***

$("#switch-religion").focus(function () {
  $(this).change(function () {
    $("#input-religion").prop("disabled", false);
    $("#input-religion").focus();
  });
});

$("#input-religion").focus(function () {
  if (theGender == "male") {
    $(document).ready(function () {
      const religionArray = ["חרדי"];
      $("#input-religion").autocomplete({
        source: religionArray,
        minLength: 0,
        autoFocus: true,
      });
    });
  }
  if (theGender == "female") {
    $(document).ready(function () {
      const religionArray = ["חרדית"];
      $("#input-religion").autocomplete({
        source: religionArray,
        minLength: 0,
        autoFocus: true,
      });
    });
  }
  $(this).keyup(function (e) {
    if (e.keyCode == 13) {
      $("#the-output").append($(this).val() + ", ");
      currentStep = 4;
      setStep(4);
      $("#step-4").find("#input-marital-status").focus();
    }
  });
});

// *** STEP 4 -- MARITAL STATUS ***

$("#input-marital-status").focus(function () {
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
});

$("#input-marital-status").keyup(function (e) {
  if (e.keyCode == 13 && $(this).val() != undefined) {
    $("#the-output").append($(this).val());
    $("#step-4").find("#input-children-number").focus();
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
    currentStep = 5;
    setStep(5);
    $("#step-5").find("#input-sibiling-number").focus();
  }

  if (e.keyCode == 13 && $(this).val() > "0") {
    $("#the-output").append(" + " + $(this).val() + ", ");
    currentStep = 5;
    setStep(5);
    $("#step-5").find("#input-sibiling-number").focus();
  }
});

// *** STEP 5 -- SIBILINGS ***

let sibilingNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let sibilingPositionMale = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שביעי",
  "שמיני",
  "תשיעי",
  "עשירי",
];
let sibilingPositionFemale = [
  "ראשונה",
  "שניה",
  "שלישית",
  "רביעית",
  "חמישית",
  "שישית",
  "שביעית",
  "שמינית",
  "תשיעית",
  "עשירית",
];

$("#input-sibiling-number").focus(function () {
  $(document).ready(function () {
    $("#input-sibiling-number").autocomplete({
      source: sibilingNumber,
      minLength: 0,
      autoFocus: true,
    });
  });

  //
  // MALE
  //

  if (theGender == "male") {
    $("#input-sibiling-position").autocomplete({
      source: sibilingPositionMale,
      minLength: 0,
      autoFocus: true,
    });
  }

  //
  // FEMALE
  //
  if (theGender == "female") {
    $("#input-sibiling-position").autocomplete({
      source: sibilingPositionFemale,
      minLength: 0,
      autoFocus: true,
    });
  }
  //
  // {{ENTER}}
  //
  $("#input-sibiling-number").keyup(function (e) {
    if (e.keyCode == 13 && $(this).is(":focus")) {
      if ($(this).val() == "0" || $(this).val() == "") {
        $("#the-output").append("בן יחיד.");
      } else {
        $("#step-5").find("#input-sibiling-position").focus();
      }
    }
  });
});

$("#input-sibiling-position").focus(function () {
  $("#input-sibiling-position").keyup(function (e) {
    if (e.keyCode == 13 && $(this).is(":focus")) {
      $("#the-output").append(`ה${$(this).val()}` + " מבין ");
      let tempInt = parseInt($("#input-sibiling-number").val());
      $("#the-output").append(maleNumbers[tempInt] + " אחאים.");
    }
  });
});
