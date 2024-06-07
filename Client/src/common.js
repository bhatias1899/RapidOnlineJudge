export const userToFieldsMapping = (fields, user) => {
  fields.forEach((i) => {
    switch (i.name) {
      case "First Name":
        i.value = user.firstname;
        break;
      case "Last Name":
        i.value = user.lastname;
        break;
      case "Email/Username":
        i.value = user.email;
        break;
      case "Profession":
        i.value = user.profession;
        break;
      case "Phone No.":
        i.value = user.contact;
        break;
      default:
        i.value = "";
        break;
    }
  });
  return fields;
};

export const fieldsToUserMapping = (fields) => {
  let user = {};
  fields.forEach((i) => {
    switch (i.name) {
      case "First Name":
        user.firstname = i.value;
        break;
      case "Last Name":
        user.lastname = i.value;
        break;
      case "Email/Username":
        user.email = i.value;
        break;
      case "Profession":
        user.profession = i.value;
        break;
      case "Phone No.":
        user.contact = i.value;
        break;
      case "Password":
        user.password = i.value;
        break;
      default:
        break;
    }
  });
  return user;
};

export const allFieldsFilled = (fields) => {
  return fields.filter((i) => i.isRequired && !i.value)?.length === 0;
};

export const payloadCreation = (fields, type) => {
  let payload;
  if (type == "form-data") {
    payload = new FormData();
    fields.forEach((i) =>
      payload.append(
        i.name.toLowerCase(),
        i.type === "file" ? i.filedata.file: i.value,
      ),
    );
  } else {
    payload = {};
    fields.forEach((i) => (payload[i.name.toLowerCase()] = i.value));
  }
  return payload;
};
