let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const totalSlides = slides.length;

/*add click/button function*/
document.querySelector('#carousel_button--next')
        .addEventListener("click", function() {
        moveToNextSlide();
  });

document.querySelector('#carousel_button--prev')
        .addEventListener("click", function() {
        moveToPrevSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden');
  }

  slides[slidePosition].classList.add('carousel_item--visible');
}

/*move the image*/
function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}