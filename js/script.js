// @VARIABLES@

let theGender = undefined;
let bgIndex = 0;
let stepIndicator = 0;
let currentStep = 0;
let justArrived = true;

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

    if (currentStep === "gender") {
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

    if (currentStep === "religion") {
      if (e.keyCode === 40) {
        $("#btn-religion-next").focus();
      } else if (e.keyCode === 38) {
        $("#input-religion").focus();
      }
    }

    // $PAGE4$
    // ^MARITAL STATUS^

    if (currentStep === "marital-status") {
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

    if (currentStep === "sibilings") {
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
    } else if ($(this).val() === "0") {
      nextStep();
      $("#input-residence-city").focus();
    }
  }
});

$("#input-sibiling-position").on("keydown", function (e) {
  if (e.keyCode === 13) {
    if ($(this).val() !== "") {
      nextStep();
      $("#input-residence-city").focus();
    }
  }
});

// $PAGE6$
// ^RESIDENCE^
// $("#toggle-residence").hide();
$("#input-residence-typology").on("keydown", function (e) {
  if (e.keyCode === 13) {
    $("#toggle-residence").focus();
    // $(".switch").css("border", "3px #409EFF solid");
    // $(this).blur();
  }
});

// // // // @INPUT EVENTS@ // // // //

// $PAGE2$
// ^AGE^

$("#input-age").on("input", function () {
  validateNumbers("input-age", "age");
});

// $PAGE3$
// ^RELIGION^

$("#input-religion").on("input", function () {
  validateHebrew("input-religion", "religion");
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

// $PAGE5$
// ^SIBILINGS^

$("#input-sibiling-number").on("input", function () {
  validateNumbersWithoutUpdate("input-sibiling-number");
  leadingZero("input-sibiling-number");
  if ($("#input-sibiling-number").val() === "0") {
    clearErrors();
    let tempString = thisPatient.gender + " יחיד";
    if (thisPatient.gender === "בת") {
      tempString += "ה";
    }
    updateData("sibilings", `${tempString}`);
    $("#input-sibiling-position").val("");
    $("#input-sibiling-position").prop("disabled", true);
  } else if ($("#input-sibiling-number").val() === "") {
    clearErrors();
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
    showErrorConstant("הערך חייב להיות גדול או שווה למיקום");
    $("#input-sibiling-number").addClass("input-error");
  } else {
    clearErrors();
    sibilings();
  }
});

$("#input-sibiling-position").on("input", function () {
  validateNumbersWithoutUpdate("input-sibiling-position");
  leadingZero("input-sibiling-position");
  if ($("#input-sibiling-position").val() === "") {
    updateData("sibilings", "");
  } else if ($("#input-sibiling-position").val() === "0") {
    showError("הערך חייב להיות גדול מאפס");
    updateData("sibilings", "");
    $("#input-sibiling-position").val("");
    shakeId("input-sibiling-position");
  } else if (
    parseInt($("#input-sibiling-position").val()) >
    parseInt($("#input-sibiling-number").val()) + 1
  ) {
    showError("הערך חייב להיות קטן או שווה למספר האחאים");
    shakeId("input-sibiling-position");
    $("#input-sibiling-position").val("");
  } else if ($("#input-sibiling-position").val() != "0") {
    sibilings();
  }
});

// $PAGE6$
// ^RESIDENCE^

let tempResidence = "";

$("#input-residence-city").on("input", function () {
  validateHebrewWithoutUpdate("input-residence-city");
  if ($(this).val() === "") {
    updateData("residence", "");
  } else if (thisPatient.gender === "בן") {
    tempResidence = "מתגורר ב";
    tempResidence += $("#input-residence-city").val();
    updateData("residence", tempResidence);
  }
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

$("#toggle-residence-input").click(function () {
  $("#input-residence-members").attr(
    "disabled",
    !$("#toggle-residence-input").is(":checked")
  );
});

// @FUNCTIONS@

function nextStep() {
  // הצעד הבא
  $(".step").css("display", "none");
  $(`.step-${stepOrder[stepIndicator]}`).css("display", "flex"); // סדר הריצה נקבע על ידי המערך stepOrder
  if ($("#current-title").length) {
    $("#current-title").remove();
  }
  $("#header-title").append(
    `<div class="title-box" id="current-title">${theData[stepIndicator].title}</div>`
  );
  currentStep = theData[stepIndicator].pageName;
  console.log(currentStep);
  stepIndicator++;
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
  for (i = 0; i < theData.length; i++) {
    if (theData[i].newSection) {
      $("#result-sub-container").append(
        `<div class="result-section">${theData[i].sectionName}</div>`
      );
      $("#result-sub-container").append(
        `<div class="result-sub-section"></div>`
      );
    }
    if (theData[i].value != "") {
      $(".result-sub-section").last().append(
        `<div class="component" id="custom${componentIdIndicator}">${theData[i].before}${theData[i].value}${theData[i].after}
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

// Create step-nav
createNavigation();
let tempTitle = "";
function createNavigation() {
  for (j = 0; j < theData.length; j++) {
    if (theData[j].newPage) {
      $("#step-nav").append(
        `<li id="step-nav-${theData[j].pageNumber}">${theData[j].title}</li>`
      );
      $(`#step-nav-${theData[j].pageNumber}`).addClass("nav-li");
    }
  }
}

// Use step-nav

$(".nav-li").click(function () {
  let idString = this.id;
  idString = parseInt(idString.replace(/^\D+/g, ""));
  $(".step").css("display", "none");
  $(`.step-${stepOrder[idString]}`).css("display", "flex");
  $(`.step${idString}`).css("display", "flex");
  for (i = 0; i < theData.length; i++) {
    if (theData[i].pageNumber === idString) {
      $("#current-title").remove();
      $("#header-title").append(
        `<div class="title-box" id="current-title">${theData[i].title}</div>`
      );
    }
  }
  currentStep = theData[idString].stepName;
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

function showErrorConstant(errorContent) {
  document.getElementById("card-footer").innerHTML = "";
  document.getElementsByClassName("error-box").innerHTML = "";
  let errorElement = document.createElement("div");
  errorElement.classList.add("error-box");
  errorElement.innerHTML = "";
  errorElement.innerHTML = errorContent;
  document.getElementById("card-footer").appendChild(errorElement);
  $(".error-box").hide();
  $(".error-box").fadeIn(0);
}

function clearErrors() {
  $(".error-box").hide();
  $("input").removeClass("input-error");
}

// Update data

let stepCounter = 0;

function updateData(name, input) {
  // עדכון נתונים
  // פונקציית עדכון
  for (i = 0; i < theData.length; i++) {
    if (theData[i].stepName === name) {
      theData[i].value = input;
    }
  }
  thisPatient[name] = input;
  renderResult();
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
        number === 3 ||
        number === 4 ||
        number === 7 ||
        number === 9 ||
        number === 10
      ) {
        ending = "ה";
      } else if (number === 5 || number === 6) {
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

function sibilings() {
  let tempQuantity = parseInt($("#input-sibiling-number").val()) + 1;
  let tempPosition = parseInt($("#input-sibiling-position").val());
  if (tempPosition > 0 && tempPosition <= 10) {
    tempPosition = hebrewfy(
      thisPatient.gender,
      parseInt($("#input-sibiling-position").val()),
      "position"
    );
  } else {
    tempPosition = `־${$("#input-sibiling-position").val()}`;
  }
  if (tempQuantity > 0 && tempQuantity <= 10) {
    tempQuantity = hebrewfy(
      "בן",
      parseInt($("#input-sibiling-number").val()) + 1,
      "quantity"
    );
  }
  let tempString = `ה${tempPosition} מבין ${tempQuantity} אחאים`;
  updateData("sibilings", tempString);
}
