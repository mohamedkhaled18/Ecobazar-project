import { togglePass, checkpassword, validateEmail } from './helpers.js';

const fNameInput = document.getElementById("first-name");
const lNameInput = document.getElementById("last-name");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confirmPassInput = document.getElementById("confirm-password");
const submitBtn = document.querySelector("button[type='submit']");
const passIcons = document.querySelectorAll(".pass-icon");
/*
const lengthAlert = document.querySelector(".invalid-length");
const mismatchAlert = document.querySelector(".mismatch-password");
const blankAlert = document.querySelector(".blank-error");
const conditionsAlert = document.querySelector(".conditions-error");
const emailAlert = document.querySelector(".invalid-email");
*/
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
  // headToPage();
})

passIcons.forEach(icon => {
  icon.addEventListener("click", () => togglePass(icon));
})