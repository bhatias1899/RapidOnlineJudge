export const fillUserData = (ObjArray, ObjValue) => {
  ObjArray.forEach((i) => {
    switch (i.name) {
      case "First Name":
        i.value = ObjValue.firstname;
        break;
      case "Last Name":
        i.value = ObjValue.lastname;
        break;
      case "Email/Username":
        i.value = ObjValue.email;
        break;
      case "Profession":
        i.value = ObjValue.profession;
        break;
      case "Phone No.":
        i.value = ObjValue.contact;
        break;
      default:
        i.value = "";
        break;
    }
  });
  return ObjArray;
};
