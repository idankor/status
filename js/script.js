let stepIndicator = 0;

// @VARIABLES@

let theGender = undefined;
let currentStep = "gender";
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
  nextStep();
  //
  // ^^^ [GLOBAL READY] ^^^
  //
  // // // // @KEYPRESS EVENTS@ // // // //
  //
  $(document).keydown(function (e) {
    //
    // $PAGE1$
    // ^GENDER^
    //
    // error
    //
    if (currentStep === "gender") {
      if (e.keyCode === 39) {
        $("#btn-male").focus();
      } else if (e.keyCode === 37) {
        $("#btn-female").focus();
      } else if (
        e.keyCode === 13 &&
        !$("#btn-male").is(":focus") &&
        !$("#btn-female").is(":focus")
      ) {
        showError("חייב לבחור מגדר!");
        $("#btn-male, #btn-female").effect("shake", { distance: 5 });
      }
    }
    //
    // $PAGE2$
    // ^AGE^
    //
    if (currentStep === "age") {
      if (e.keyCode === 13) {
        if ($("#input-age").val() === "") {
          showError("חובה לציין גיל");
          $("#input-age").effect("shake", { distance: 5 });
        } else if ($("#input-age").val() === "0") {
          showError("הגיל צריך להיות גדול מאפס");
          $("#input-age").effect("shake", { distance: 5 });
        } else {
          currentStep = "religion";
          nextStep();
          $("#input-religion").focus();
        }
      }
    }

    //
    // $PAGE3$
    // ^RELIGION^
    //
    if (currentStep === "religion") {
      if (e.keyCode === 40) {
        $("#btn-religion-next").focus();
      } else if (e.keyCode === 38) {
        $("#input-religion").focus();
      }
      if ($("#input-religion").val() !== "") {
        if (e.keyCode === 13) {
          currentStep = "marital status";
          nextStep();
        }
      }
    }
    //
    // $PAGE4$
    // ^MARITAL STATUS^
    //
    if (currentStep === "marital status") {
    }
  });

  // // // // @INPUT EVENTS@ // // // //

  //
  // $PAGE2$
  // ^AGE^
  //

  $("#input-age").on("input", function () {
    updateData("age", $("#input-age").val());
    renderResult();
  });

  //
  // $PAGE3$
  // ^RELIGION^
  //

  $("#input-religion").on("input", function () {
    updateData("religion", $("#input-religion").val());
    renderResult();
  });

  //
  // $PAGE4$
  // ^MARITAL STATUS^
  //

  $("#input-marital-status").on("input", function () {
    updateData("");
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
    currentStep = "age";
    generateAutocompletion();
    nextStep();
    $("#step-age").find("#input-age").focus();
  });

  // female

  $("#btn-female").click(function () {
    theGender = "female";
    $(".error-box").remove();
    updateData("gender", "בת");
    renderResult();
    currentStep = "age";
    generateAutocompletion();
    nextStep();
    $("#step-age").find("#input-age").focus();
  });

  //
  // $PAGE3$
  // ^RELIGION^
  //
  $("#switch-religion").click(function () {
    if ($("#input-religion").prop("disabled")) {
      $("#input-religion").prop("disabled", false);
      $("#input-religion").focus();
    }
  });

  // *** PAGE 4 -- MARITAL STATUS ***

  // מספר ילדים

  // $("#input-marital-status").keydown(function (e) {
  //   if (e.keyCode == 13) {
  //     if ($("#input-marital-status").val() == "") {
  //       showError("נא לציין מצב משפחתי");
  //       shakeId("#input-marital-status");
  //     } else {
  //       $("#the-output").append($(this).val());
  //       $("#step-4").find("#input-children-number").focus();
  //     }
  //   }
  // });

  $("#input-children-number").keydown(function (e) {
    if (e.keyCode == 13 && $(this).val() == "") {
      showError("נא לציין מספר ילדים");
      shakeId("#input-children-number");
    } else if (e.keyCode == 13 && $(this).val() === "0") {
      $("#the-output").append(", ללא ילדים, ");
      currentStep = 5;
      nextStep();
      $("#step-5").find("#input-sibiling-number").focus();
    } else if (e.keyCode == 13 && $(this).val() > "0") {
      $("#the-output").append(" + " + $(this).val() + ", ");
      currentStep = 5;
      nextStep();
      $("#step-5").find("#input-sibiling-number").focus();
    }
  });

  // *** PAGE 5 -- SIBILINGS ***

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

  // @FUNCTIONS@

  function nextStep() {
    $(".step").css("display", "none");
    $(`#step-${stepOrder[stepIndicator]}`).css("display", "flex");
    stepIndicator++;
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

  function renderResult() {
    $("#result-sub-container").html("");
    let theStrcture = ["before", "value", "after"];
    let componentIdIndicator = 0;
    let componentBgIndex = 0;
    let sectionBgIndex = 0;
    for (let step of theOutput) {
      if (step.value === null) {
      }
      if (step[theStrcture[1]] != null) {
        if (step.newSection) {
          $("#result-sub-container").append(
            `<div class="result-section">${step[theStrcture[1]]}</div>`
          );
          $(".result-section").last().css("background-color") == undefined;
          $(".result-section")
            .last()
            .css("background-color", sectionBackground[sectionBgIndex % 5]);
          $("#result-sub-container").append(
            `<div class="result-sub-section"></div>`
          );
          sectionBgIndex++;
        } else {
          $(".result-sub-section")
            .last()
            .append(
              `<div class="component" id="custom${componentIdIndicator}">${
                step[theStrcture[0]]
              }` +
                `${step[theStrcture[1]]}` +
                `${step[theStrcture[2]]}
            </div>`
            );
          $(`#custom${componentIdIndicator}`).css(
            "background-color",
            componentBackground[componentBgIndex % 8]
          );
          componentIdIndicator++;
          componentBgIndex++;
        }
      }
    }
  }

  renderResult();

  $(document).keydown(function () {
    renderResult();
  });

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
    $(".error-box").fadeOut(4200);
  }

  function updateData(value, input) {
    for (i = 0; i < theOutput.length; i++) {
      if (theOutput[i].stepName === value) {
        theOutput[i].value = input;
      }
    }
  }
});
