let user = {};
let role = "";
let loggedin = false;

if (sessionStorage.getItem("token")) {
  role = sessionStorage.getItem("role");
  loggedin = true;
  user = { name: sessionStorage.getItem("name") };
}

const initialState = {
  admin: [],
  faculty: [],
  student: [],
  batch: [],
  courses: [],
  slots: [],
  user: user,
  loggedin: loggedin,
  role: role,
  status: false,
  fid: "",
  sid: "",
  cid: "",
  slot_id: "",
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "loader-true":
      return { ...state, status: true };
    case "loader-false":
      return { ...state, status: false };
    case "admin-login":
      return {
        ...state,
        loggedin: true,
        role: "admin",
        user: { name: action.payload },
      };
    case "faculty-login":
      return {
        ...state,
        loggedin: true,
        role: "faculty",
        user: { name: action.payload },
      };
    case "admin":
      return { ...state, admin: action.payload };
    case "faculty":
      return { ...state, faculty: action.payload };
    case "student":
      return { ...state, student: action.payload };
    case "courses":
      return { ...state, courses: action.payload };
    case "slots":
      return { ...state, slots: action.payload };
    case "batch":
      return { ...state, batch: action.payload };

    case "fid":
      return { ...state, fid: action.payload };
    case "sid":
      return { ...state, sid: action.payload };
    case "cid":
      return { ...state, cid: action.payload };
    case "slot_id":
      return { ...state, slot_id: action.payload };
    case "logout":
      sessionStorage.clear();
      return { ...state, role: "", user: {}, loggedin: false };
    default:
      return state;
  }
};

export default reducer;
