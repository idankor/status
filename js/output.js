// @OUTPUT@

const thePatient = {
  "personal details": {
    title: "",
    gender: { title: "", value: "" },
    age: { title: "", value: "" },
    religion: { title: "", value: "" },
    "marital status": { title: "", value: "" },
    "number of children": { title: "", value: "" },
    "number of sibilings": { title: "", value: "" },
    position: { title: "", value: "" },
    "residence city": { title: "", value: "" },
    "residence typology": { title: "", value: "" },
    "residence members": { title: "", value: "" },
  },
  "medical history": {},
  "psychiatric history": {},
  reason: {},
  "current disease": {},
  status: {},
  discussion: {},
  plan: {},
};

const theData = [
  {
    stepNumber: 1,
    stepName: "gender",
    pageNumber: 0,
    pageName: "gender",
    type: "content",
    binary: true,
    before: "",
    after: "",
    value: "",
    page: null,
    source: null,
    title: "מגדר",
    newSection: true,
    sectionName: "<פרטים אישיים>",
    newPage: true,
  },
  {
    stepNumber: 2,
    stepName: "age",
    pageNumber: 1,
    pageName: "age",
    type: "content",
    binary: false,
    before: "",
    after: ",",
    value: "",
    newSection: false,
    page: null,
    source: null,
    title: "גיל",
    newPage: true,
  },
  {
    stepNumber: 3,
    stepName: "religion",
    pageNumber: 2,
    pageName: "religion",
    type: "content",
    binary: false,
    before: "",
    after: ",",
    value: "",
    newSection: false,
    source: null,
    title: "דת",
    newPage: true,
  },
  {
    stepNumber: 4,
    stepName: "marital-status",
    pageNumber: 3,
    pageName: "marital-status",
    type: "content",
    binary: false,
    before: "",
    after: ",",
    value: "",
    newSection: false,
    source: null,
    title: "סטטוס משפחתי",
    newPage: true,
  },
  {
    stepNumber: 5,
    stepName: "sibilings",
    pageNumber: 4,
    pageName: "sibilings",
    type: "content",
    binary: false,
    before: "",
    after: ".",
    value: "",
    newSection: false,
    page: null,
    source: null,
    title: "אחאים",
    newPage: true,
  },
  {
    stepNumber: 6,
    stepName: "residence",
    pageNumber: 5,
    pageName: "residence",
    type: "content",
    binary: false,
    before: "מתגורר ב",
    after: "",
    value: "",
    newSection: false,
    page: null,
    source: null,
    title: "מגורים",
    newPage: true,
  },
];

// Spaces are not allowed in this array's values!
//
const stepOrder = [
  "gender",
  "age",
  "religion",
  "marital-status",
  "sibilings",
  "residence",
];

const thisPatient = {
  gender: undefined,
  age: undefined,
  religion: undefined,
  maritalStatus: undefined,
  childrenNumber: undefined,
  sibilingNumber: undefined,
};
