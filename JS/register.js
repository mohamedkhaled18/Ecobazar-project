const fNameInput = document.getElementById("first-name");
const lNameInput = document.getElementById("last-name");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confirmPassInput = document.getElementById("confirm-password");
const submitBtn = document.querySelector("button[type='submit']");
const passIcons = document.querySelectorAll(".pass-icon");

const lengthAlert = document.querySelector(".invalid-length");
const mismatchAlert = document.querySelector(".mismatch-password");
const blankAlert = document.querySelector(".blank-error");
const conditionsAlert = document.querySelector(".conditions-error");
const emailAlert = document.querySelector(".invalid-email");

let inputs = [fNameInput, lNameInput, usernameInput, emailInput, passInput, confirmPassInput];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputs.forEach(input => {
    checkBlank();
    checkpassword(input);
    validateEmail();
  })

  let alerts = document.querySelectorAll(".invalid.show");
  if (alerts.length !== 0) {
    return ;
  }
  headToPage();
})


function headToPage() {
  const role = document.getElementById("role").value;
  window.location.href = role + ".html";
}

function validateEmail() {
  let email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = emailRegex.test(email);
  if (valid)
    emailAlert.classList.remove("show");
  else emailAlert.classList.add("show")
}


function checkpassword(element) {
  if (element.type === "password" && element.value.length < 12)
    lengthAlert.classList.add("show");
  else lengthAlert.classList.remove("show");

  if (passInput.value !== confirmPassInput.value)
    mismatchAlert.classList.add("show");
  else mismatchAlert.classList.remove("show");
}

function checkBlank() {
  const conditionsCheck = document.getElementById("confirm");
  let isBlank = false;

  inputs.forEach(input => {
    if (input.value.trim() === "")
      isBlank = true;
  });

  if (isBlank)
    blankAlert.classList.add("show");
  else
    blankAlert.classList.remove("show");

  if (!conditionsCheck.checked)
    conditionsAlert.classList.add("show");
  else
    conditionsAlert.classList.remove("show");

}

passIcons.forEach(icon => {
  icon.addEventListener("click", () => togglePass(icon));
})

function togglePass(element) {
  let input = element.previousElementSibling, type;
  if (input.type === "text")
    type = "password";
  else type = "text";
  input.setAttribute("type", type);
}