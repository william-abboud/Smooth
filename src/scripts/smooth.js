/**
 * Created by William Abboud on 3/26/2016.
 * Description: Simple ES6 VanillaJS Carousel
 * Features:  TODO: Add support for multiple sliders
 *
 */

// DOM References
let slider;
let dimensions;
let slides;

// Methods

// TODO: Add support for vertical, parameter handling, stoping condition
const _translate = function _translate(direction) {
  const offset = (direction === 'backwards') ? dimensions.width : (-dimensions.width);
  let [existingOffset] = /-?\d+/g.exec(slider.style.transform) || [0];

  existingOffset = parseInt(existingOffset);

  slider.classList.add('transition');
  slider.style.transform = `translateX(${existingOffset + offset}px)`;
};

const _clearTranslate = function _clearTranslate() {
  slider.classList.remove('transition');
  slider.style.transform = '';
};

const _setCurrent = function _setCurrent(el) {
  el.dataset.current = "true";
};

const _removeCurrent = function _removeCurrent(el) {
  delete el.dataset.current;
}

const _pop = function _pop(el) {
  slider.removeChild(el);
}

const _push = function _push(el) {
  slider.appendChild(el);
}

const slideForward = function slideForward() {
  _translate('forward');
};

const slideBackwards = function slideBackwards() {
  _translate('backwards');
};

const api = {
  slideForward,
  slideBackwards
};

const _arrangeSlides = function _arrangeSlides(el) {
  _removeCurrent(el);
  _setCurrent(el.nextElementSibling);
  _pop(el);
  _push(el);
  _clearTranslate();
};

const _addEvents = function _addEvents() {
  slider.addEventListener('transitionend', () => {
    let old = slider.querySelector('[data-current="true"]');

    _arrangeSlides(old);
  });
};

const init = function init(selector) {
  slider = document.querySelector(selector);

  if (!slider || !slider.children) {
    throw new Error('Nothing to slide');
  }

  dimensions = slider.getBoundingClientRect();
  slides = slider.children;

  _setCurrent(slides[0]);
  _addEvents();
  return api;
};

export default init;
