// Categories
const subCategories = {
  delivery: [
    "Order not received",
    "Wrong or missing items",
    "Damaged or not fresh products"
  ],
  payment: [
    "Payment failed",
    "Charged but order not received",
    "Issue with coupon or discount"
  ],
  account: [
    "Can't log in",
    "Forgot password",
    "Problem updating account"
  ],
  general: [
    "Delivery Times",
    "Product Availability",
    "Offers and Discounts"
  ],
  customer_service: [
    "Poor experience with support representative",
    "No response to previos complaint"
  ]
};


function showSubCategories() {
  const main = document.getElementById("main-category").value;
  const subSelect = document.getElementById("sub-category");
  const subSection = document.getElementById("sub-category-section");
  const messageBox = document.getElementById("message-section");

  subSelect.innerHTML = "";
  messageBox.classList.add("hidden");

  if (main && subCategories[main]) {
    subCategories[main].forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.text = item;
      subSelect.appendChild(option);
    });
    subSection.classList.remove("hidden");
  } else {
    subSection.classList.add("hidden");
  }
}

function showMessageBox() {
  const sub = document.getElementById("sub-category").value;
  const messageBox = document.getElementById("message-section");

  if (sub) {
    messageBox.classList.remove("hidden");
  } else {
    messageBox.classList.add("hidden");
  }
}

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", (e) => submitForm(e));

function submitForm(e) {
  e.preventDefault();

  // Alert
  const nameInput = document.querySelector(".name-input");
  const emailInput = document.querySelector(".email-input");
  const textArea = document.getElementById("message");
  const lengthAlert = document.querySelector(".length-alert");
  const blankAlert = document.querySelector(".blank-alert");
  const emailAlert = document.querySelector(".email-alert");
  let fields = [nameInput, emailInput, textArea];
  let isfilled = true;

  fields.forEach(field => {
    if (field.value == "")
      isfilled = false;
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = emailRegex.test(emailInput.value);

  if (!isfilled || textArea.value.length < 10 || !valid) {
      // Check email input
      if (valid) 
        emailAlert.classList.add("hidden");
      else emailAlert.classList.remove("hidden");

      // Check blank
      if (!isfilled)
        blankAlert.classList.remove("hidden");
      else
        blankAlert.classList.add("hidden");

      // Check text area length
      if (textArea.value.length < 10)
          lengthAlert.classList.remove("hidden");
      else 
        lengthAlert.classList.add("hidden");

  } else {
    const confirmation = document.getElementById("confirmation-message");
    const messageBox = document.getElementById("message-section");
    lengthAlert.classList.add("hidden");
    emailAlert.classList.add("hidden");
    confirmation.classList.remove("hidden");

    setTimeout(() => {
      // Clear All Fields
      fields.forEach(field => field.value = "");
      document.getElementById("main-category").value = "";
      document.getElementById("sub-category").innerHTML = "";
      document.getElementById("sub-category-section").classList.add("hidden");
      confirmation.classList.add("hidden");
      messageBox.classList.add("hidden");
      lengthAlert.classList.add("hidden");
    }, 4000);
  }
}



