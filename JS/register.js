import { togglePass, validateEmail } from './helpers.js';

const registerationForm = document.getElementById("registeration_form");
const passIcons = document.querySelectorAll(".pass-icon");

registerationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('input');
  const passInput = document.getElementById("password");
  const confirmPassInput = document.getElementById("confirm-password");

  let errors = [];

  inputs.forEach((nodeInput) => {
    const typeInput = nodeInput.getAttribute('type');
    const value = nodeInput.value.trim();

    if (value === '') {
      errors.push("Blank field: " + nodeInput.name);
      nodeInput.nextElementSibling?.classList.add("show");
    } else if (value.length > 50) {
      errors.push("Too long: " + nodeInput.name);
    } else if (typeInput === 'email' && !validateEmail(value)) {
      errors.push("Invalid email");
      nodeInput.nextElementSibling?.classList.add("show");
    } else {
      nodeInput.nextElementSibling?.classList.remove("show");
    }
  });


  if (passInput.value.length < 12) {
    errors.push("Password too short");
    document.querySelector(".invalid-length").classList.add("show");
  } else {
    document.querySelector(".invalid-length").classList.remove("show");
  }

  if (passInput.value !== confirmPassInput.value) {
    errors.push("Passwords do not match");
    document.querySelector(".mismatch-password").classList.add("show");
  } else {
    document.querySelector(".mismatch-password").classList.remove("show");
  }

  const conditionsCheck = document.getElementById("confirm");
  if (!conditionsCheck.checked) {
    errors.push("Must accept terms");
    document.querySelector(".conditions-error").classList.add("show");
  } else {
    document.querySelector(".conditions-error").classList.remove("show");
  }

  if (errors.length > 0) {
    console.log("Validation failed:", errors);
    return; 
  }

  registerationForm.submit();
});

passIcons.forEach(icon => {
  icon.addEventListener("click", () => togglePass(icon));
});