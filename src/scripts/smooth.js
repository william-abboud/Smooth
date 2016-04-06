/**
 * Created by William Abboud on 3/26/2016.
 * Description: Simple ES6 VanillaJS Carousel
 * Features:  TODO: Add support for multiple sliders
 *
 */

let slider
  , slides
  , opts;

const defaultOptions = {};

// TODO: Add support for vertical, parameter handling, stoping condition
function _translate(val) {
  slider.classList.add('transition');
  slider.style.transform = `translateX(${val})`;
};

function _resetTranslate(listenerFn) {
  slider.removeEventListener('transitionend', listenerFn);
  slider.classList.remove('transition');
  slider.style.transform = `translateX(-100%)`;
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
  // let split = opts.width.split(/^(\d+(?:\.\d+)?)(.*)$/);
  // let value = parseInt(split[1]);
  // let unit = split[2];

  // _translate(`-${value * 2}${unit}`);
  _translate('-200%');

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

function init(selector, options) {
  const wrapper = document.createElement('div');
  const pocketSlide = document.createElement('div');
  wrapper.classList.add('generated-wrapper');
  pocketSlide.classList.add('slide');

  slider = document.querySelector(selector);

  if (!slider || !slider.children.length) {
    throw new Error('Nothing to slide');
  }

  slider.insertBefore(pocketSlide, slider.children[0]);
  slider.parentNode.appendChild(wrapper);
  wrapper.appendChild(slider.parentNode.removeChild(slider));

  slides = slider.children;
  slides[1].dataset.current = 'true';
  return api;
};

export default init;
