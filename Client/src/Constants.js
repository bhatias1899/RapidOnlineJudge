export const LOGIN_FIELDS = [
  { name: "Email/Username", isRequired: true, type: "text", value: "" },
  { name: "Password", isRequired: true, type: "password", value: "" },
];
export const LOGIN_BUTTONS = [
  { name: "Log In", type: "Button" },
  { name: "Forgot password", type: "text" },
  {
    name: "Dont have an account? create one",
    type: "text",
  },
];

export const SIGNIN_FIELDS = [
  { name: "First Name", isRequired: true, type: "text", value: "" },
  { name: "Last Name", isRequired: true, type: "text", value: "" },
  { name: "Email/Username", isRequired: true, type: "text", value: "" },
  { name: "Password", isRequired: true, type: "password", value: "" },
  {
    name: "Confirm Password",
    isRequired: true,
    type: "password",
    value: "",
  },
  {
    name: "Profession",
    isRequired: true,
    type: "radio",
    value: "Student",
    options: ["Student", "Developer", "Recruiter"],
  },
  { name: "Phone No.", isRequired: true, type: "text", value: "" },
];

export const SIGNIN_BUTTONS = [
  { name: "Sign Up", type: "Button" },

  {
    name: "Already a User ? Log In",
    type: "text",
  },
];

export const UPDATE_BUTTONS = [
  { name: "Cancel", type: "Button" },
  { name: "Update", type: "Button" },
];
export const SERVER_BASE_URL = "http://localhost:5000";
