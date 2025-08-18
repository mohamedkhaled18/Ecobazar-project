
// Preview images by clicking
let previewImg = document.querySelector(".bigimg");
let images = document.querySelectorAll(".smallimg");

images.forEach(image => {
  image.onclick = (e) => 
    previewImg.src = e.currentTarget.src;
});

// Scroll Slider
const rightScrollBtn = document.querySelector(".right");
const leftScrollBtn = document.querySelector(".left");
const slider = document.getElementById('slider');

slider.addEventListener("scroll", checkScroll);

function checkScroll() {
  // The Start  
  if (slider.scrollLeft === 0)
    leftScrollBtn.style.opacity = "0.3";
  else
    leftScrollBtn.style.opacity = "1";

  // The End
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
    rightScrollBtn.style.opacity = "0.3";
  } else {
    rightScrollBtn.style.opacity = "1";
  }
}

checkScroll();

function scrollSlider(direction) {
  checkScroll();
  const scrollAmount = 220;
  let slide = {
    left: direction * scrollAmount,
    behavior: 'smooth'
  }
  slider.scrollBy(slide);
}