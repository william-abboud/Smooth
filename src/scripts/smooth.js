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
const _translate = function(direction) {
  const offset = (direction === 'backwards') ? dimensions.width : (-dimensions.width);
  let [existingOffset] = /-?\d+/g.exec(slider.style.transform) || [0];

  existingOffset = parseInt(existingOffset);
  slider.style.transform = `translateX(${existingOffset + offset}px)`;
};

// TODO: Shorter func name ?
const _getCurrentSlideInView = function getCurrentSlideInView() {

};

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

const init = function init(selector) {
  slider = document.querySelector(selector);

  if(!slider || !slider.children) {
    throw new Error('Nothing to slide');
  }

  dimensions = slider.getBoundingClientRect();
  slides = slider.children;

  return api;
};

export default init;
