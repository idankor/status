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
//
// ---- [PROCESS] ---- //
//
$(function () {
  //
  // ^^^ [GLOBAL READY] ^^^
  //
  // // // @KEYPRESS EVENTS@
  //
  $(document).keydown(function (e) {
    //
    // $STEP1$
    // ^GENDER^
    //
    // error
    //
    if (currentStep === "gender") {
      if (e.keyCode === 39) {
        $("#btn-male").focus();
      } else if (e.keyCode === 37) {
        $("#btn-female").focus();
      } else if (e.keyCode === 13) {
        if (!$("#btn-male").is(":focus") && !$("#btn-female").is(":focus")) {
          showError("חייב לבחור מגדר!");
          $("#btn-male, #btn-female").effect("shake", { distance: 5 });
        }
      }
    }
    renderResult();
    //
    // $STEP2$
    // ^AGE^
    //
    if (currentStep === "age") {
      if (e.keyCode === 13) {
        updateData("age", $("#input-age").val());
        renderResult();
      }
    }
  });

  // // // @CLICK EVENTS@

  // male

  $("#btn-male").click(function () {
    theGender = "male";
    $(".error-box").remove();
    updateData("gender", "בן");
    renderResult();
    currentStep = "age";
    setStep(2);
    $("#step-2").find("#input-age").focus();
  });

  // female

  $("#btn-female").click(function () {
    theGender = "female";
    $(".error-box").remove();
    updateData("gender", "בת");
    renderResult();
    currentStep = "age";
    setStep(2);
    $("#step-2").find("#input-age").focus();
  });

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
  //
  // *** STEP 3 -- RELIGION ***
  //
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

  // @FUNCTIONS@

  function renderResult() {
    $("#result-sub-container").html("");
    let theStrcture = ["before", "value", "after"];
    for (let step of theOutput) {
      let jumper = false;
      if (step.value === null) {
        jumper = true;
      }
      if (step[theStrcture[1]] != null && !jumper) {
        bgIndex = 0;
        if (step.newSection) {
          $("#result-sub-container").append(
            `<div class="result-section">${step[theStrcture[1]]}</div>`
          );
          $(".result-section").last().css("background-color") == undefined;
          $(".result-section")
            .last()
            .css("background-color", sectionBackground[bgIndex % 5]);
          $("#result-sub-container").append(
            `<div class="result-sub-section"></div>`
          );
        } else {
          $(".result-sub-section")
            .last()
            .append(
              `<div class="component" id="custom${bgIndex}">${
                step[theStrcture[0]]
              }` +
                `${step[theStrcture[1]]}` +
                `${step[theStrcture[2]]}
            </div>`
            );
        }
        $(`#custom${bgIndex}`)
          .last()
          .css("background-color", componentBackground[bgIndex % 8]);
      }
      bgIndex++;
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

  function updateData(value, input) {
    for (i = 0; i < theOutput.length; i++) {
      if (theOutput[i].stepName === value) {
        theOutput[i].value = input;
      }
    }
  }
});
