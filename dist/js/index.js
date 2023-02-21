const storeInput=document.getElementById("store"),storeError=document.getElementById("storeError"),options=Array.from(document.querySelectorAll("#stores option")).map(function(t){return t.value}),nameInput=document.getElementById("name"),nameError=document.getElementById("nameError"),phoneInput=document.getElementById("phone"),phoneError=document.getElementById("phoneError"),amountInput=document.getElementById("amount"),amountError=document.getElementById("amountError"),submit=document.getElementById("submit"),asubmitError=document.getElementById("submitError"),the_form_el=document.getElementById("the_form");let send_data=!0;function validateStore(){""==storeInput.value?(storeInput.classList.add("has-error"),storeError.textContent="required",send_data=!1):options.includes(storeInput.value)?(storeInput.setCustomValidity(""),storeError.textContent="",storeInput.classList.remove("has-error")):(storeInput.classList.add("has-error"),storeError.textContent="no result",send_data=!1)}function validateName(){""==nameInput.value?(nameInput.classList.add("has-error"),nameError.textContent="required",send_data=!1):/^[a-zA-Z\u4e00-\u9fa5 ]+$/.test(nameInput.value)?(nameInput.setCustomValidity(""),nameError.textContent="",nameInput.classList.remove("has-error")):(nameInput.classList.add("has-error"),nameError.textContent="請輸入中文或英文",send_data=!1)}function validatePhone(){""==phoneInput.value?(phoneInput.classList.add("has-error"),phoneError.textContent="required",send_data=!1):/^09\d{8}$$/.test(phoneInput.value)?(phoneInput.setCustomValidity(""),phoneError.textContent="",phoneInput.classList.remove("has-error")):(phoneInput.classList.add("has-error"),phoneError.textContent="請輸入十位數手機號碼，如：0912345678",send_data=!1)}function validateAmount(){""==amountInput.value?(amountInput.classList.add("has-error"),amountError.textContent="required",send_data=!1):/^(0|[1-9][0-9]*)$/.test(amountInput.value)?(amountInput.setCustomValidity(""),amountError.textContent="",amountInput.classList.remove("has-error")):(amountInput.classList.add("has-error"),amountError.textContent="請輸入正確消費金額，且不得小於零",send_data=!1)}function ScrollTo(t){ScrollToResolver(document.getElementById(t))}function ScrollToResolver(t){var e=parseInt(.2*t.getBoundingClientRect().top);document.body.scrollTop+=e,document.documentElement.scrollTop+=e,!t.lastjump||t.lastjump>Math.abs(e)?(t.lastjump=Math.abs(e),setTimeout(function(){ScrollToResolver(t)},"10")):t.lastjump=null}storeInput.addEventListener("focus",function(){storeInput.addEventListener("input",validateStore)}),nameInput.addEventListener("focus",function(){nameInput.addEventListener("input",validateName)}),phoneInput.addEventListener("focus",function(){phoneInput.addEventListener("input",validatePhone)}),amountInput.addEventListener("focus",function(){amountInput.addEventListener("input",validateAmount)}),storeInput.addEventListener("blur",function(){validateStore()}),nameInput.addEventListener("blur",function(){validateName()}),phoneInput.addEventListener("blur",function(){validatePhone()}),amountInput.addEventListener("blur",function(){validateAmount()}),the_form_el.addEventListener("submit",function(t){t.preventDefault(),validateStore(),validateName(),validatePhone(),validateAmount(),send_data?(submit.innerHTML="&nbsp&nbsp&nbspsuccess",submit.classList.add("success")):(submit.innerHTML="&nbsp&nbsp&nbspfailure",submit.classList.add("failure"),submitError.textContent="This person does not exist")});