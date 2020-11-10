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

// Create step-nav

for (i = 1; i < 11; i++) {
  let tempElement = document.createElement("li");
  tempElement.setAttribute("id", "step-nav-" + i);
  document.getElementById("step-nav").appendChild(tempElement);
  $("#step-nav-" + i).addClass("nav-li");
}

$(".nav-li").click(function () {
  let idString = this.id;
  idString = idString.replace(/^\D+/g, "");
  console.log(idString);
  $(".step").css("display", "none");
  $(`#step-${idString}`).css("display", "flex");
  $(`.step${idString}`).css("display", "flex");
});

// {{SET STEP FUNCTION}}

function setStep(stepNumber) {
  $(".step").css("display", "none");
  $(`#step-${stepNumber}`).css("display", "flex");
  $(`.step${stepNumber}`).css("display", "flex");
}

function showError(errorContent) {
  console.log(errorContent);
  document.getElementById("card-footer").innerHTML = "";
  document.getElementsByClassName("error-box").innerHTML = "";
  let errorElement = document.createElement("div");
  errorElement.classList.add("error-box");
  errorElement.innerHTML = "";
  errorElement.innerHTML = errorContent;
  document.getElementById("card-footer").appendChild(errorElement);
  $(".error-box").hide();
  $(".error-box").fadeIn(0);
  $(".error-box").fadeOut(3200);
}

let isRunning = false;

// search JQuery shake lobrary / animation

function shakeId(id) {
  if (!isRunning) {
    isRunning = true;
    $(id).addClass("shake-horizontal shake-constant");
    setTimeout(function () {
      $(id).removeClass("shake-horizontal shake-constant");
      isRunning = false;
    }, 300);
  }
}

// *** // STEP 1 // GENDER // *** //

$("#indicator").focus(function () {
  $("#indicator").keydown(function (e) {
    if (e.keyCode === 13) {
      if (!$("#btn-male").is(":focus") && !$("#btn-female").is(":focus")) {
        showError("חייב לבחור מגדר!");
        shakeId("#btn-male, #btn-female");
      }
    }
  });
});

$(document).keydown(function (e) {
  // check currentStep (if = step1), if yes, do:
  if (e.keyCode === 39) {
    $("#btn-male").focus();
  }
  if (e.keyCode === 37) {
    $("#btn-female").focus();
  }
});

// MALE

$("#btn-male").focus(function () {
  // read
  $("#btn-male").click(function () {
    theGender = "male";
    $(".error-box").remove();
    $("#the-output").append("<פרטים אישיים>" + "\r\n\r\n");
    $("#the-output").append("בן ");
    currentStep = 2;
    setStep(2);
    $("#step-2").find("#input-age").focus();
  });
});

// FEMALE

$("#btn-female").focus(function () {
  $("#btn-female").click(function () {
    theGender = "female";
    $(".error-box").remove();
    $("#the-output").append("<פרטים אישיים>" + "\r\n\r\n");
    $("#the-output").append("בת ");
    currentStep = 2;
    setStep(2);
    $("#step-2").find("#input-age").focus();
  });
});

// *** STEP 2 -- AGE ***

let errorStep2 = false;

$("#input-age").focus(function () {
  $(this).keydown(function (e) {
    if (e.keyCode == 13) {
      if ($("#input-age").val() > 0) {
        // אם הגיל גדול מאפס
        $("#input-age").css("border", "1px solid #dcdfe6");
        document.getElementById("input-age").style.animation = "";
        $("#input-age-error").remove();
        $("#the-output").append($(this).val() + ", ");
        currentStep == 3;
        setStep(3);
        $("#step-3").find("#input-religion").focus();
      } else if ($("#input-age").val() == 0) {
        // אם הגיל שווה לאפס
        showError("הגיל צריך להיות גדול מאפס");
        shakeId("#input-age");
      }
    }
  });
});

// *** STEP 3 -- RELIGION ***

$("#input-religion").focus(function () {
  const religionArray = ["חרדי"];
  if (theGender == "male") {
    $("#input-religion").autocomplete({
      source: religionArray,
      minLength: 0,
      autoFocus: true,
    });
  }
  if (theGender == "female") {
    const religionArray = ["חרדית"];
    $("#input-religion").autocomplete({
      source: religionArray,
      minLength: 0,
      autoFocus: true,
    });
  }
  $("#input-religion").keydown(function (e) {
    if (e.keyCode == 13) {
      if ($("#input-religion").val() != "") {
        $("#the-output").append($("#input-religion").val() + ", ");
      }
      currentStep = 4;
      setStep(4);
      $("#step-4").find("#input-marital-status").focus();
    }
  });
});

// *** STEP 4 -- MARITAL STATUS ***

$("#input-marital-status").focus(function () {
  //
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
  //
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

// מספר ילדים

$("#input-marital-status").keydown(function (e) {
  if (e.keyCode == 13) {
    if ($("#input-marital-status").val() == "") {
      showError("נא לציין מצב משפחתי");
      shakeId("#input-marital-status");
    } else {
      $("#the-output").append($(this).val());
      $("#step-4").find("#input-children-number").focus();
    }
  }
});

$("#input-children-number").keydown(function (e) {
  if (e.keyCode == 13 && $(this).val() == "") {
    showError("נא לציין מספר ילדים");
    shakeId("#input-children-number");
  } else if (e.keyCode == 13 && $(this).val() === "0") {
    $("#the-output").append(", ללא ילדים, ");
    currentStep = 5;
    setStep(5);
    $("#step-5").find("#input-sibiling-number").focus();
  } else if (e.keyCode == 13 && $(this).val() > "0") {
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
      let tempIndex = $("#input-sibiling-position").val();
      tempIndex--;
      if (theGender == "male") {
        let numberHebrew = sibilingPositionMale[tempIndex];
        $("#the-output").append(`ה${numberHebrew}` + " מבין ");
        let tempInt = parseInt($("#input-sibiling-number").val());
        $("#the-output").append(maleNumbers[tempInt] + " אחאים.");
      }
    }
  });
});

// Indicator for step 1

document.getElementById("indicator").focus();
