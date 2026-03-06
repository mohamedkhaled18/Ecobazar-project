import { togglePass, checkpassword, validateEmail, checkBlank } from './helpers.js';

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const submitBtn = document.querySelector("button");
const passIcons = document.querySelectorAll(".pass-icon");


let inputs = [emailInput, passInput];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputs.forEach(input => {
    checkBlank();
    checkpassword(input);
    validateEmail();
  })

  // All Are Valid?
  let alerts = document.querySelectorAll(".invalid.show");
  if (alerts.length !== 0) {
    return;
  }

})

passIcons.forEach(icon => {
  icon.addEventListener("click", () => togglePass(icon));
})