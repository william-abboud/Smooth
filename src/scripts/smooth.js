/**
 * Created by William Abboud on 3/26/2016.
 * Description: Simple ES6 VanillaJS Carousel
 * Features:  TODO: Add support for multiple sliders
 *
 */

let slider
  , dimensions
  , slides;

// TODO: Add support for vertical, parameter handling, stoping condition
function _translate(val) {
  slider.classList.add('transition');
  slider.style.transform = `translateX(${val}px)`;
};

function _resetTranslate(listenerFn) {
  slider.removeEventListener('transitionend', listenerFn);
  slider.classList.remove('transition');
  slider.style.transform = 'translateX(-300px)';
};

function _swapCurrentTag(el) {
  const currentSlide = slider.querySelector('[data-current="true"]');

  el.dataset.current = "true";
  delete currentSlide.dataset.current;
}

function _push(el) {
  slider.appendChild(el);
}

function slideForward() {
  _translate(-600);

  slider.addEventListener('transitionend', function translateEnd() {
    _swapCurrentTag(slides.item(2));
    _push(slider.removeChild(slides.item(1)));
    _resetTranslate(translateEnd);
  });
};

function slideBackwards() {
  const lastEl = slider.removeChild(slider.lastElementChild);
  const pocket = slider.replaceChild(lastEl, slider.firstElementChild);

  _translate(0);

  slider.addEventListener('transitionend', function translateEnd() {
    _swapCurrentTag(lastEl);
    _resetTranslate(translateEnd);

    slider.insertBefore(pocket, lastEl);
  });
};

const api = {
  slideForward,
  slideBackwards
};

function init(selector) {
  slider = document.querySelector(selector);

  if (!slider || !slider.children.length) {
    throw new Error('Nothing to slide');
  }

  dimensions = slider.getBoundingClientRect();
  slides = slider.children;

  slides[1].dataset.current = 'true';
  return api;
};

export default init;
