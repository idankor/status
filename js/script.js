let stepIndicator = 0;
let currentStep = 0;
let justArrived = true;

// @VARIABLES@

let theGender = undefined;
let bgIndex = 0;

// @ARRAYS@

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

let componentBackground = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
];

let sectionBackground = ["#540d6e", "#ee4266", "#ffd23f", "#3bceac", "#0ead69"];

var maritalStatusAutocompleteMale = ["רווק", "נשוי", "פרוד", "אלמן", "גרוש"];
maritalStatusAutocompleteMale.sort();

var maritalStatusAutocompleteFemale = [
  "רווקה",
  "נשואה",
  "פרודה",
  "אלמנה",
  "גרושה",
];
maritalStatusAutocompleteFemale.sort();

//
// ---- [PROCESS] ---- //
//
$(function () {
  //
  // ^^^ [GLOBAL READY] ^^^
  //
  nextStep();
});
//
// // // // @KEYPRESS EVENTS@ // // // //
//
// // // // ---- GLOBAL ---- // // // //
//
$(document).keydown(function (e) {
  //
  // $PAGE1$
  // ^GENDER^
  //
  if (stepOrder[currentStep] === "gender") {
    if (e.keyCode === 39) {
      $("#btn-male").focus();
    } else if (e.keyCode === 37) {
      $("#btn-female").focus();
      //
      // error
      //
    } else if (
      e.keyCode === 13 &&
      !$("#btn-male").is(":focus") &&
      !$("#btn-female").is(":focus")
    ) {
      showError("חייב לבחור מגדר!");
      $("#btn-male, #btn-female").effect("shake", { distance: 5 });
    }
  }

  if (stepOrder[currentStep] === "religion") {
    if (e.keyCode === 40) {
      $("#btn-religion-next").focus();
    } else if (e.keyCode === 38) {
      $("#input-religion").focus();
    }
  }
});
//
// // // // ---- LOCAL ---- // // // //
//
// $PAGE2$
// ^AGE^
//
$("#input-age").on("keydown", function (e) {
  if (e.keyCode === 13) {
    if ($("#input-age").val() === "") {
      showError("חובה לציין גיל");
      $("#input-age-container").effect("shake", { distance: 5 });
    } else if ($("#input-age").val() === "0") {
      showError("הגיל צריך להיות גדול מאפס");
      $("#input-age-container").effect("shake", { distance: 5 });
    } else {
      nextStep();
      $("#input-religion").focus();
    }
  }
});

// $PAGE3$
// ^RELIGION^

$("#input-religion").on("keydown", function (e) {
  if ($("#input-religion").val() !== "") {
    if (e.keyCode === 13) {
      nextStep();
      $("#input-marital-status").focus();
    }
  } else if (e.keyCode === 13) {
    showError("יש לציין דת או לדלג");
    $("#input-religion").effect("shake", { distance: 5 });
  }
});

// $PAGE4$
// ^MARITAL STATUS^

$("#input-marital-status").on("keydown", function (e) {
  if (e.keyCode === 13 && $("#input-marital-status").val() != "") {
    console.log($("#input-marital-status").val());
    updateData("marital status", $("#input-marital-status").val());
    $("#input-children-number").focus();
  }
});
$("#input-children-number").on("keydown", function (e) {
  if (e.keyCode === 13) {
  }
});

// // // // @INPUT EVENTS@ // // // //

// $PAGE2$
// ^AGE^

$("#input-age").on("input", function () {
  validateNumbers("input-age", "age");
});

$("#input-age").focusin(function () {
  focusBorder("input-age");
});

$("#input-age").focusout(function () {
  unfocusBorder("input-age");
});

// $PAGE3$
// ^RELIGION^

$("#input-religion").on("input", function () {
  validateHebrew("input-religion", "religion");
});

// $PAGE4$
// ^MARITAL STATUS^

// marital status

$("#input-marital-status").on("input", function () {
  validateHebrew("input-marital-status", "marital status");
});

// number of children

$("#input-children-number").on("input", function () {
  if ($("#input-children-number").val() == 0) {
    updateData("children number", "ללא ילדים");
  }
});

// // // // @CLICK EVENTS@ // // // //

//
// $PAGE1$
// ^GENDER^
//

// male

$("#btn-male").click(function () {
  theGender = "male";
  $(".error-box").remove();
  updateData("gender", "בן");
  renderResult();
  generateAutocompletion();
  nextStep();
  $(".step-age").find("#input-age").focus();
});

// female

$("#btn-female").click(function () {
  theGender = "female";
  $(".error-box").remove();
  updateData("gender", "בת");
  renderResult();
  generateAutocompletion();
  nextStep();
  $(".step-age").find("#input-age").focus();
});

//
// $PAGE3$
// ^RELIGION^
//

$("#btn-religion-next").click(function () {
  nextStep();
  $("#input-marital-status").focus();
});

// $("#input-children-number").keydown(function (e) {
//   if (e.keyCode == 13 && $(this).val() == "") {
//     showError("נא לציין מספר ילדים");
//     shakeId("#input-children-number");
//   } else if (e.keyCode == 13 && $(this).val() === "0") {
//     $("#the-output").append(", ללא ילדים, ");
//     currentStep = 5;
//     nextStep();
//     $("#step-5").find("#input-sibiling-number").focus();
//   } else if (e.keyCode == 13 && $(this).val() > "0") {
//     $("#the-output").append(" + " + $(this).val() + ", ");
//     currentStep = 5;
//     nextStep();
//     $("#step-5").find("#input-sibiling-number").focus();
//   }
// });

// *** PAGE 5 -- SIBILINGS ***

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

// $("#input-sibiling-number").focus(function () {
//   //
//   // {{ENTER}}
//   //
//   $("#input-sibiling-number").keyup(function (e) {
//     if (e.keyCode == 13 && $(this).is(":focus")) {
//       if ($(this).val() == "0" || $(this).val() == "") {
//         $("#the-output").append("בן יחיד.");
//       } else {
//         $("#step-5").find("#input-sibiling-position").focus();
//       }
//     }
//   });
// });

// $("#input-sibiling-position").focus(function () {
//   $("#input-sibiling-position").keyup(function (e) {
//     if (e.keyCode == 13 && $(this).is(":focus")) {
//       let tempIndex = $("#input-sibiling-position").val();
//       tempIndex--;
//       if (theGender == "male") {
//         let numberHebrew = sibilingPositionMale[tempIndex];
//         $("#the-output").append(`ה${numberHebrew}` + " מבין ");
//         let tempInt = parseInt($("#input-sibiling-number").val());
//         $("#the-output").append(maleNumbers[tempInt] + " אחאים.");
//       }
//     }
//   });
// });

// @FUNCTIONS@

function nextStep() {
  $(".step").css("display", "none");
  $(`.step-${stepOrder[stepIndicator]}`).css("display", "flex");
  stepIndicator++;
  currentStep = stepIndicator - 1;
}

function generateAutocompletion() {
  if (theGender === "male") {
    $("#input-marital-status").autocomplete({
      source: maritalStatusAutocompleteMale,
      minLength: 0,
      autoFocus: true,
    });
  }
  if (theGender === "female") {
    $("#input-marital-status").autocomplete({
      source: maritalStatusAutocompleteFemale,
      minLength: 0,
      autoFocus: true,
    });
  }
}

function validateHebrew(fieldName, dataName) {
  if ($("#input-religion").val() != "") {
    var hasNumber = /^[א-ת]/;
    let tempString = "";
    tempString = $(`#${fieldName}`).val();
    tempString = tempString.slice(-1);
    console.log(tempString);
    if (!hasNumber.test(tempString)) {
      let correction = $(`#${fieldName}`).val().slice(0, -1);
      $(`#${fieldName}`).val(correction);
      showError("נא להכניס רק אותיות בעברית");
    } else {
      updateData(dataName, $(`#${fieldName}`).val());
    }
  } else {
    updateData(dataName, "");
  }
}

function validateNumbers(fieldName, dataName) {
  if ($(`#${fieldName}`).val() != "") {
    var hasNumber = /^[0-9]/;
    let tempString = "";
    tempString = $(`#${fieldName}`).val();
    tempString = tempString.slice(-1);
    console.log(tempString);
    if (!hasNumber.test(tempString)) {
      let correction = $(`#${fieldName}`).val().slice(0, -1);
      $(`#${fieldName}`).val(correction);
      showError("נא להכניס רק מספרים");
    } else {
      updateData(dataName, $(`#${fieldName}`).val());
    }
  } else {
    updateData(dataName, "");
  }
}

function renderResult() {
  $("#result-sub-container").html("");
  let componentIdIndicator = 0;
  let componentBgIndex = 0;
  let sectionBgIndex = 0;
  for (let step of theOutput) {
    // if (step.value === null) {
    // }
    if (step.value !== undefined) {
      if (step.newSection) {
        $("#result-sub-container").append(
          `<div class="result-section">${step.value}</div>`
        );
        $(".result-section").last().css("background-color") == undefined;
        $(".result-section")
          .last()
          .css("background-color", sectionBackground[sectionBgIndex % 5]);
        $("#result-sub-container").append(
          `<div class="result-sub-section"></div>`
        );
      } else {
        if (step.value !== "") {
          $(".result-sub-section").last().append(
            `<div class="component" id="custom${componentIdIndicator}">${step.before}${step.value}${step.after}
            </div>`
          );
          $(`#custom${componentIdIndicator}`).css(
            "background-color",
            componentBackground[componentBgIndex % 8]
          );
          componentBgIndex++;
        }
        componentIdIndicator++;
      }
    }
  }
}

// Create step-nav

for (i = 1; i < 11; i++) {
  let tempElement = document.createElement("li");
  tempElement.setAttribute("id", "step-nav-" + i);
  document.getElementById("step-nav").appendChild(tempElement);
  $("#step-nav-" + i).addClass("nav-li");
}

// Use step-nav

$(".nav-li").click(function () {
  let idString = this.id;
  idString = parseInt(idString.replace(/^\D+/g, "") - 1);
  $(".step").css("display", "none");
  $(`.step-${stepOrder[idString]}`).css("display", "flex");
  $(`.step${idString}`).css("display", "flex");
});

function showError(errorContent) {
  document.getElementById("card-footer").innerHTML = "";
  document.getElementsByClassName("error-box").innerHTML = "";
  let errorElement = document.createElement("div");
  errorElement.classList.add("error-box");
  errorElement.innerHTML = "";
  errorElement.innerHTML = errorContent;
  document.getElementById("card-footer").appendChild(errorElement);
  $(".error-box").hide();
  $(".error-box").fadeIn(0);
  $(".error-box").fadeOut(4200);
}

function updateData(name, input) {
  for (i = 0; i < theOutput.length; i++) {
    if (theOutput[i].stepName === name) {
      theOutput[i].value = input;
    }
  }
  renderResult();
}

let recentFocus = "";

function focusBorder(name) {
  $(`#${name}-container`).css("border", "5px solid #409eff");
}

function unfocusBorder(name) {
  $(`#${name}-container`).css("border", "none");
}
