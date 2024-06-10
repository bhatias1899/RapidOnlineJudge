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

export const PROBLEM_BUTTONS = [
  { name: "Cancel", type: "Button" },
  { name: "Create", type: "Button" },
];

export const PROBLEM_FIELDS = [
  { name: "Title", isRequired: true, type: "text", value: "" },
  { name: "Description", isRequired: true, type: "editor", value: "" },
  { name: "Topic", isRequired: false, type: "text", value: "" },
  {
    name: "Difficulty",
    isRequired: true,
    type: "Select",
    value: "",
    options: ["Easy", "Medium", "Hard"],
  },
  {
    name: "Status",
    isRequired: true,
    type: "Select",
    value: "New",
    options: ["New", "InProgress", "Done"],
  },
  {
    name: "TestCases",
    isRequired: true,
    type: "file",
    value: "",
    filedata: null,
  },
  {
    name: "Solution",
    isRequired: true,
    type: "file",
    value: "",
    filedata: null,
  },
  {
    name: "Comments",
    isRequired: false,
    type: "textarea",
    value: "",
    placeholder: "You can add additional comments/hints/followups",
  },
];
export const SERVER_BASE_URL = "http://localhost:5000";

export const stubCodes = {
  java: `class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  cpp: `// Online C++ compiler to run C++ program online
#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "Hello world";

    return 0;
}`,
  c: `#include <stdio.h>
int main() {    
    printf("Hello World!");
    return 0;
}`,
  py: `print("Hello World!")`,
};
