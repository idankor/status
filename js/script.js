let stepIndicator = 0;
let currentStep = 0;
let justArrived = true;

// @VARIABLES@

let theGender = undefined;
let bgIndex = 0;

// @ARRAYS@

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

//
// ---- [PROCESS] ---- //
//
$(function () {
  //
  // ^^^ [GLOBAL READY] ^^^
  //
  nextStep();
  //
  // // // // @KEYPRESS EVENTS@ // // // //
  //
  // // // // ---- GLOBAL ---- // // // //
  //
  $(document).keydown(function (e) {
    //
    // $PAGE1$
    // ^GENDER^

    if (stepOrder[currentStep] === "gender") {
      if (e.keyCode === 39) {
        $("#btn-male").focus();
      } else if (e.keyCode === 37) {
        $("#btn-female").focus();

        // error
        //
      } else if (
        e.keyCode === 13 &&
        !$("#btn-male").is(":focus") &&
        !$("#btn-female").is(":focus")
      ) {
        showError("חייב לבחור מגדר!");
        shakeId("btn-male");
        shakeId("btn-female");
      }
    }

    // $PAGE3$
    // ^GENDER^

    if (stepOrder[currentStep] === "religion") {
      if (e.keyCode === 40) {
        $("#btn-religion-next").focus();
      } else if (e.keyCode === 38) {
        $("#input-religion").focus();
      }
    }

    // $PAGE4$
    // ^MARITAL STATUS^

    if (stepOrder[currentStep] === "marital-status") {
      if (e.keyCode === 40) {
        e.preventDefault();
        $("#input-children-number").focus();
      } else if (e.keyCode === 38) {
        e.preventDefault();
        $("#input-marital-status").focus();
      }
    }
    // $PAGE5$
    // ^SIBILINGS^

    if (stepOrder[currentStep] === "sibilings") {
      if (e.keyCode === 40) {
        e.preventDefault();
        $("#input-sibiling-position").focus();
      } else if (e.keyCode === 38) {
        e.preventDefault();
        $("#input-sibiling-number").focus();
      }
    }
  }); // -------- END OF GLOBAL KEYPRESSES -------- //
}); // -------- END OF READY FUNCTION-------- //

// // // // ---- LOCAL ---- // // // //

// $PAGE2$
// ^AGE^

$("#input-age").on("keydown", function (e) {
  if (e.keyCode === 13) {
    if ($("#input-age").val() === "") {
      showError("חובה לציין גיל");
      shakeId("input-age");
    } else if ($("#input-age").val() === "0") {
      showError("הגיל צריך להיות גדול מאפס");
      shakeId("input-age");
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
    shakeId("input-religion");
  }
});

// $PAGE4$
// ^MARITAL STATUS^

$("#input-marital-status").on("keydown", function (e) {
  if (e.keyCode === 13 && $(this).val() !== "") {
    $("#input-children-number").focus();
  } else if (e.keyCode === 13 && $(this).val() === "") {
    showError("חובה לציין מצב משפחתי");
    shakeId("input-marital-status");
  }
});

$("#input-children-number").on("keydown", function (e) {
  if (e.keyCode === 13) {
    if ($("#input-children-number").val() === "") {
      showError("חובה לציין מספר ילדים");
      shakeId("input-children-number");
    } else {
      nextStep();
      $("#input-sibiling-number").focus();
    }
  }
});

// $PAGE5$
// ^SIBILINGS^

$("#input-sibiling-number").on("keydown", function (e) {
  if (e.keyCode === 13) {
    if ($("#input-sibiling-number").val() === "") {
      showError("חובה לציין מספר אחאים");
      shakeId("input-sibiling-number");
    } else if ($("#input-sibiling-number").val() > 0) {
      $("#input-sibiling-position").prop("disabled", false);
      $("#input-sibiling-position").focus();
    }
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

$("#input-religion").focusin(function () {
  focusBorder("input-religion");
});

$("#input-religion").focusout(function () {
  unfocusBorder("input-religion");
});

// $PAGE4$
// ^MARITAL STATUS^

function maritalStatusGenerator() {
  if ($("#input-marital-status") === "") {
    updateData("marital-status", "");
  }
  let tempMaritalStatus = $("#input-marital-status").val();
  let tempChildrenNumber = $("input-children-number").val();
  if ($("#input-children-number").val() === "0") {
    tempChildrenNumber = " ללא ילדים";
  } else if ($("#input-children-number").val() === "") {
    tempChildrenNumber = "";
  } else {
    tempChildrenNumber = ` + ${$("#input-children-number").val()}`;
  }
  let tempString = tempMaritalStatus + tempChildrenNumber;
  updateData("marital-status", tempString);
}

// marital status

$("#input-marital-status").on("input", function () {
  validateHebrewWithoutUpdate("input-marital-status");
  maritalStatusGenerator();
});

// number of children

$("#input-children-number").on("input", function () {
  validateNumbersWithoutUpdate("input-children-number");
  let tempString = $("#input-children-number").val();
  $("#input-children-number").val(tempString.replace(/^0(?=\d)/, ""));
  maritalStatusGenerator();
});

// blue focus

$("#input-marital-status").focusin(function () {
  focusBorder("input-marital-status");
});

$("#input-marital-status").focusout(function () {
  unfocusBorder("input-marital-status");
});

$("#input-children-number").focusin(function () {
  focusBorder("input-children-number");
});

$("#input-children-number").focusout(function () {
  unfocusBorder("input-children-number");
});

// $PAGE5$
// ^SIBILINGS^

$("#input-sibiling-number").on("input", function () {
  validateNumbersWithoutUpdate("input-sibiling-number");
  leadingZero("input-sibiling-number");
  if ($("#input-sibiling-number").val() === "0") {
    let tempString = theData[1].value + " יחיד";
    if (theData[1].value === "בת") {
      tempString += "ה";
    }
    updateData("sibilings", `${tempString}`);
  } else if ($("#input-sibiling-number").val() === "") {
    updateData("sibilings", "");
  } else if (
    $("#input-sibiling-number").val() != "0" &&
    $("#input-sibiling-position").prop("disabled")
  ) {
    updateData("sibilings", "");
  } else if (
    parseInt($("#input-sibiling-position").val()) >
    parseInt($("#input-sibiling-number").val())
  ) {
    showError("הערך חייב להיות גדול או שווה למיקום");
    $("#input-sibiling-number").val("");
  }
});

let hebrewPosition = [
  "ראשו",
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

let hebrewQuantity = [
  "אח",
  "ש",
  "שלוש",
  "ארבע",
  "חמ",
  "ש",
  "שבע",
  "שמונה",
  "תשע",
  "עשר",
];

function hebrewfy(gender, number, type) {
  let starting = "";
  let ending = "";
  if (gender === "בן") {
    if (type === "position") {
      starting = hebrewPosition[number - 1];
      if (number === 1) {
        ending = "ן";
      }
    } else if (type === "quantity") {
      starting = hebrewQuantity[number - 1];
      if (number === 1) {
        ending = "ד";
      } else if (number === 2) {
        ending = "ניים";
      } else if (
        (number >= 3 && number <= 4) ||
        (number >= 7 && number <= 10)
      ) {
        ending = "ה";
      } else if (number === 5 || nubmer === 6) {
        ending = "ישה";
      }
    }
  } else if (gender === "בת") {
    if (type === "position") {
      starting = hebrewPosition[number - 1];
      if (number === 1) {
        ending = "נה";
      } else if (number === 2) {
        ending = "ה";
      } else if (number >= 3 && number <= 10) {
        ending = "ת";
      }
    }
  }
  return `${starting}${ending}`;
}

$("#input-sibiling-position").on("input", function () {
  validateNumbersWithoutUpdate("input-sibiling-position");
  leadingZero("input-sibiling-position");
  if ($("#input-sibiling-position").val() === 0) {
    showError("הערך חייב להיות גדול מאפס");
    $("#input-sibiling-position").val("");
  } else if (
    parseInt($("#input-sibiling-position").val()) >
    parseInt($("#input-sibiling-number").val())
  ) {
    showError("הערך חייב להיות קטן או שווה למספר האחאים");
    $("#input-sibiling-position").val("");
  }
  if ($("#input-sibiling-position").val() != "0") {
    let tempPosition = hebrewfy(
      thisPatient.gender,
      parseInt($("#input-sibiling-position").val()),
      "position"
    );
    let tempQuantity = hebrewfy(
      "בן",
      parseInt($("#input-sibiling-position").val()),
      "quantity"
    );
    let tempString = `ה${tempPosition} מבין ${tempQuantity} אחאים`;
    updateData("sibilings", tempString);
  }
});

// blue focus

$("#input-sibiling-number").focusin(function () {
  focusBorder("input-sibiling-number");
});

$("#input-sibiling-number").focusout(function () {
  unfocusBorder("input-sibiling-number");
});

$("#input-sibiling-position").focusin(function () {
  focusBorder("input-sibiling-position");
});

$("#input-sibiling-position").focusout(function () {
  unfocusBorder("input-sibiling-position");
});

// // // // @CLICK EVENTS@ // // // //

//
// $PAGE1$
// ^GENDER^
//

// male

$("#btn-male").click(function () {
  $(".error-box").remove();
  updateData("gender", "בן");
  renderResult();
  nextStep();
  $("#input-age").focus();
});

// female

$("#btn-female").click(function () {
  $(".error-box").remove();
  updateData("gender", "בת");
  renderResult();
  nextStep();
  $("#input-age").focus();
});

//
// $PAGE3$
// ^RELIGION^
//

$("#btn-religion-next").click(function () {
  nextStep();
  $("#input-marital-status").focus();
});

// @FUNCTIONS@

function nextStep() {
  // הצעד הבא
  $(".step").css("display", "none");
  $(`.step-${stepOrder[stepIndicator]}`).css("display", "flex");
  if ($("#current-title").length) {
    $("#current-title").remove();
  }
  $("#header-title").append(
    `<div class="title-box" id="current-title">${
      theData[stepIndicator + 1].title
    }</div>`
  );
  stepIndicator++;
  currentStep = stepIndicator - 1;
}

function validateHebrew(fieldName, dataName) {
  if ($(`#${fieldName}`).val() != "") {
    var hasNumber = /^[א-ת]/;
    let tempString = "";
    tempString = $(`#${fieldName}`).val();
    tempString = tempString.slice(-1);
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

function validateHebrewWithoutUpdate(fieldName, dataName) {
  if ($(`#${fieldName}`).val() != "") {
    var hasNumber = /^[א-ת]/;
    let tempString = "";
    tempString = $(`#${fieldName}`).val();
    tempString = tempString.slice(-1);
    if (!hasNumber.test(tempString)) {
      let correction = $(`#${fieldName}`).val().slice(0, -1);
      $(`#${fieldName}`).val(correction);
      showError("נא להכניס רק אותיות בעברית");
    }
  }
}

function validateNumbers(fieldName, dataName) {
  if ($(`#${fieldName}`).val() != "") {
    var hasNumber = /^[0-9]/;
    let tempString = "";
    tempString = $(`#${fieldName}`).val();
    tempString = tempString.slice(-1);
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

function validateNumbersWithoutUpdate(fieldName) {
  if ($(`#${fieldName}`).val() != "") {
    var hasNumber = /^[0-9]/;
    let tempString = $(`#${fieldName}`).val();
    tempString = tempString.slice(-1);
    if (!hasNumber.test(tempString)) {
      let correction = $(`#${fieldName}`).val().slice(0, -1);
      $(`#${fieldName}`).val(correction);
      showError("נא להכניס רק מספרים");
    }
  }
}

function renderResult() {
  $("#result-sub-container").html("");
  let componentIdIndicator = 0;
  let componentBgIndex = 0;
  let sectionBgIndex = 0;
  for (let step of theData) {
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

let tempTitle = "";

for (i = 0; i < stepOrder.length; i++) {
  for (j = 0; j < theData.length; j++) {
    if (theData[j].stepName === stepOrder[i]) {
      $("#step-nav").append(
        `<li id="step-nav-${i + 1}">${theData[j].title}</li>`
      );
    }
  }
  $("#step-nav").append(`<li id="step-nav-${i + 1}">${tempTitle}</li>`);
  $(`#step-nav-${i + 1}`).addClass("nav-li");
}

// Use step-nav

$(".nav-li").click(function () {
  let idString = this.id;
  idString = parseInt(idString.replace(/^\D+/g, "") - 1);
  $(".step").css("display", "none");
  $(`.step-${stepOrder[idString]}`).css("display", "flex");
  $(`.step${idString}`).css("display", "flex");
  for (i = 0; i < theData.length; i++) {
    if (theData[i].pageNumber === idString + 1) {
      $("#current-title").remove();
      $("#header-title").append(
        `<div class="title-box" id="current-title">${theData[i].title}</div>`
      );
    }
  }
  currentStep = theData[idString + 1].stepName;
});

// Show error

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
  $(".error-box").fadeOut(5000);
}

// Update data

let stepCounter = 0;

function updateData(name, input) {
  // פונקציית עדכון
  stepCounter = 0;
  for (i = 0; i < theData.length; i++) {
    if (theData[i].value === undefined) {
      stepCounter++;
    }
    if (theData[i].stepName === name) {
      theData[i].value = input;
    }
  }
  thisPatient[name] = input;
  renderResult();
}

function focusBorder(name) {
  $(`#${name}-container`).css("border", "4px solid #409eff");
}

function unfocusBorder(name) {
  $(`#${name}-container`).css("border", "none");
}

function shakeId(name) {
  $(`#${name}`).addClass("shake-horizontal shake-constant");
  setTimeout(function () {
    $(`#${name}`).removeClass("shake-horizontal shake-constant");
  }, 150);
}

function setCustomValue(theName, theProperty, theValue) {
  for (i = 0; i < theData.length; i++) {
    if (theData[i].stepName === theName) {
      theData[i][theProperty] = theValue;
      return;
    }
  }
  console.log(`Error: can't find "${theName}" in "theData.`);
}

function leadingZero(fieldId) {
  let tempString = $(`#${fieldId}`).val();
  $(`#${fieldId}`).val(tempString.replace(/^0(?=\d)/, ""));
}
