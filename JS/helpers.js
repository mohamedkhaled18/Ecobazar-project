export function togglePass(element) {
    let input = element.previousElementSibling, type;
    if (input.type === "text")
        type = "password";
    else type = "text";
    input.setAttribute("type", type);
}

export function checkpassword(element) {
    const lengthAlert = document.querySelector(".invalid-length");
    if (element.type === "password" && element.value.length < 12)
        lengthAlert.classList.add("show");
    else lengthAlert.classList.remove("show");
}

export function validateEmail() {
    const emailAlert = document.querySelector(".invalid-email");
    let email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = emailRegex.test(email);
    if (valid)
        emailAlert.classList.remove("show");
    else emailAlert.classList.add("show")
}

export function checkBlank() {
    const conditionsCheck = document.getElementById("confirm");
    const blankAlert = document.querySelector(".blank-error");
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

export function headToPage() {
    const role = document.getElementById("role").value;
    window.location.href = role + ".html";
}