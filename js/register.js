var formElement = document.querySelector("#form-register");
var studentCardInputElement = formElement.querySelector(
  "input[name='student_card']"
);
var fullNameInputElement = formElement.querySelector("input[name='fullname']");
var emailInputElement = formElement.querySelector("input[name='email']");
var genderElement = formElement.querySelector(".gender-container");
var hobbiesElement = formElement.querySelector(".hobbies-container");
var nationalitySelectElement = formElement.querySelector(
  "[name='nationality']"
);
var noteElement = formElement.querySelector("textarea[name='note']");
function showErrorMessage(element, errorMessage) {
  var formGroup = element.parentElement;
  if (formGroup) {
    formGroup.classList.add("invalid");
    var formMessage = formGroup.querySelector(".form-message");
    if (formMessage) {
      formMessage.innerText = errorMessage;
    }
  }
}
function addEvent() {
  studentCardInputElement.oninput = handleClearError;
  studentCardInputElement.onblur = () =>
    validationStudentCard(studentCardInputElement);
  fullNameInputElement.oninput = handleClearError;
  fullNameInputElement.onblur = () => validationFullName(fullNameInputElement);

  emailInputElement.oninput = handleClearError;
  emailInputElement.onblur = () => validationEmail(emailInputElement);

  var radioGenders = genderElement.querySelectorAll(
    "input[name='gender'][type='radio']"
  );
  radioGenders.forEach((radio) => {
    radio.addEventListener("change", () => {
      handleClearError(genderElement);
    });
    radio.addEventListener("blur", () => {
      validationGender(genderElement);
    });
  });

  var checkboxHobbies = hobbiesElement.querySelectorAll(
    "input[name='hobbies[]'][type='checkbox']"
  );
  checkboxHobbies.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleClearError(hobbiesElement);
    });
    checkbox.addEventListener("blur", () => {
      validationHobbies(hobbiesElement);
    });
  });
  nationalitySelectElement.oninput = handleClearError;
  nationalitySelectElement.onblur = () =>
    validationNationality(nationalitySelectElement);

  noteElement.oninput = handleClearError;
  noteElement.onblur = () => validationNote(noteElement);
}
addEvent();
function validationEmail(input) {
  let valueInput = input.value;
  var errorMessage = valueInput ? undefined : "Vui lòng nhập email";
  if (errorMessage) {
    showErrorMessage(input, errorMessage);
    return false;
  } else {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    errorMessage = regex.test(valueInput)
      ? undefined
      : "Email không đúng đinh dạng";
    if (errorMessage) {
      showErrorMessage(input, errorMessage);
      return false;
    }
    return true;
  }
}
function validationStudentCard(input) {
  let valueInput = input.value;
  var errorMessage = valueInput ? undefined : "Vui lòng nhập mã sinh viên";
  if (errorMessage) {
    showErrorMessage(input, errorMessage);
    return false;
  }
  return true;
}
function validationFullName(input) {
  let valueInput = input.value;
  var errorMessage = valueInput ? undefined : "Vui lòng nhập tên của bạn";
  if (errorMessage) {
    showErrorMessage(input, errorMessage);
    return false;
  }
  return true;
}
function validationGender(element) {
  if (element) {
    var radioGenders = element.querySelectorAll(
      "input[name='gender'][type='radio']"
    );
    var isChecked = Array.from(radioGenders).some((radio) => radio.checked);

    if (isChecked) {
      return true;
    } else {
      let errorMessage = "Vui lòng chọn giới tính";
      showErrorMessage(element, errorMessage);
      return false;
    }
  }
}
function validationHobbies(element) {
  if (element) {
    var checkboxHobbies = element.querySelectorAll(
      "input[name='hobbies[]'][type='checkbox']"
    );
    var isAnyChecked = Array.from(checkboxHobbies).some(
      (checkbox) => checkbox.checked
    );
    if (isAnyChecked) {
      return true;
    } else {
      let errorMessage = "Vui lòng chọn sở thích";
      showErrorMessage(element, errorMessage);
      return false;
    }
  }
}

function validationNationality(select) {
  let valueSelect = select.value;
  var errorMessage = valueSelect ? undefined : "Vui lòng chọn quốc tịch";
  if (errorMessage) {
    showErrorMessage(select, errorMessage);
    return false;
  }
  return true;
}
function validationNote(input) {
  let lengthCharMax = 200;
  let inputValue = input.value;
  var errorMessage =
    inputValue.length <= lengthCharMax
      ? undefined
      : `Số ký tự tối đa là ${lengthCharMax}`;
  if (errorMessage) {
    showErrorMessage(input, errorMessage);
    return false;
  }
  return true;
}

function handleValidate() {
  var isValid = true;
  if (!validationStudentCard(studentCardInputElement)) isValid = false;
  if (!validationFullName(fullNameInputElement)) isValid = false;
  if (!validationEmail(emailInputElement)) isValid = false;
  if (!validationGender(genderElement)) isValid = false;
  if (!validationHobbies(hobbiesElement)) isValid = false;
  if (!validationNationality(nationalitySelectElement)) isValid = false;
  if (!validationNote(noteElement)) isValid = false;
  return isValid;
}
function handleClearError(e) {
  var formGroup;
  if (!e.target) {
    formGroup = e.parentElement;
  } else {
    formGroup = e.target.parentElement;
  }
  if (formGroup.classList.contains("invalid")) {
    formGroup.classList.remove("invalid");
  }
  var formMessage = formGroup.querySelector(".form-message");
  if (formMessage) {
    formMessage.innerText = "";
  }
}
formElement.onsubmit = function (e) {
  e.preventDefault();
  var isValid = handleValidate();
  console.log(isValid);
  if (isValid) {
    // Gửi biểu mẫu đăng ký đến server ở đây
    var formData = new FormData(formElement);
    fetch("process_registration.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Đăng kí thành công");
      })
      .catch((error) => {
        alert("Đăng kí thất bại");
        console.error("Lỗi khi gửi biểu mẫu đăng ký:", error);
      });
  }
};
