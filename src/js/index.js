const storeInput = document.getElementById("store");
const storeError = document.getElementById("storeError");
const options = Array.from(document.querySelectorAll("#stores option")).map(
  function (option) {
    return option.value;
  }
);
const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");
const amountInput = document.getElementById("amount");
const amountError = document.getElementById("amountError");
const submit = document.getElementById("submit");
const asubmitError = document.getElementById("submitError");
const the_form_el = document.getElementById("the_form");

let send_data = true;

function validateStore() {
  if (storeInput.value == "") {
    // nameInput.setCustomValidity('請輸入中文或英文');
    storeInput.classList.add("has-error");
    storeError.textContent = "required";
    send_data = false;
  } else if (!options.includes(storeInput.value)) {
    storeInput.classList.add("has-error");
    storeError.textContent = "no result";
    send_data = false;
  } else {
    storeInput.setCustomValidity("");
    storeError.textContent = "";
    storeInput.classList.remove("has-error");
  }
}

function validateName() {
  if (nameInput.value == "") {
    nameInput.classList.add("has-error");
    nameError.textContent = "required";
    send_data = false;
  } else if (!/^[a-zA-Z\u4e00-\u9fa5 ]+$/.test(nameInput.value)) {
    // nameInput.setCustomValidity('請輸入中文或英文');
    nameInput.classList.add("has-error");
    nameError.textContent = "請輸入中文或英文";
    send_data = false;
  } else {
    nameInput.setCustomValidity("");
    nameError.textContent = "";
    nameInput.classList.remove("has-error");
  }
}

function validatePhone() {
  if (phoneInput.value == "") {
    phoneInput.classList.add("has-error");
    phoneError.textContent = "required";
    send_data = false;
  } else if (!/^09\d{8}$$/.test(phoneInput.value)) {
    // phoneInput.setCustomValidity('請輸入十位數手機號碼，如：0912345678');
    phoneInput.classList.add("has-error");
    phoneError.textContent = "請輸入十位數手機號碼，如：0912345678";
    send_data = false;
  } else {
    phoneInput.setCustomValidity("");
    phoneError.textContent = "";
    phoneInput.classList.remove("has-error");
  }
}

function validateAmount() {
  if (amountInput.value == "") {
    amountInput.classList.add("has-error");
    amountError.textContent = "required";
    send_data = false;
  } else if (!/^(0|[1-9][0-9]*)$/.test(amountInput.value)) {
    // amountInput.setCustomValidity('wrong format');
    amountInput.classList.add("has-error");
    amountError.textContent = "請輸入正確消費金額，且不得小於零";
    send_data = false;
  } else {
    amountInput.setCustomValidity("");
    amountError.textContent = "";
    amountInput.classList.remove("has-error");
  }
}

storeInput.addEventListener("focus", function () {
  storeInput.addEventListener("input", validateStore);
});

nameInput.addEventListener("focus", function () {
  nameInput.addEventListener("input", validateName);
});

phoneInput.addEventListener("focus", function () {
  phoneInput.addEventListener("input", validatePhone);
});

amountInput.addEventListener("focus", function () {
  amountInput.addEventListener("input", validateAmount);
});

storeInput.addEventListener("blur", function () {
  validateStore();
});

nameInput.addEventListener("blur", function () {
  validateName();
});

phoneInput.addEventListener("blur", function () {
  validatePhone();
});

amountInput.addEventListener("blur", function () {
  validateAmount();
});

// 表單資料送出

the_form_el.addEventListener("submit", function (e) {
  e.preventDefault();
  validateStore();
  validateName();
  validatePhone();
  validateAmount();
  if (!send_data) {
    submit.innerHTML = "&nbsp&nbsp&nbspfailure";
    submit.classList.add("failure");
    submitError.textContent = "This person does not exist";
  } else {
    submit.innerHTML = "&nbsp&nbsp&nbspsuccess";
    submit.classList.add("success");
  }
});

// ----------------scroll------------------------

function ScrollTo(name) {
  //init thread
  ScrollToResolver(document.getElementById(name));
}

function ScrollToResolver(elem) {
  let jump = parseInt(elem.getBoundingClientRect().top * 0.2);
  document.body.scrollTop += jump;
  document.documentElement.scrollTop += jump;
  //lastjump detects anchor unreachable, also manual scrolling to cancel animation if scroll > jump
  if (!elem.lastjump || elem.lastjump > Math.abs(jump)) {
    elem.lastjump = Math.abs(jump);
    setTimeout(function () {
      ScrollToResolver(elem);
    }, "10");
  } else {
    elem.lastjump = null;
  }
}
