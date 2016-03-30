/**
 * Created by William Abboud on 3/26/2016.
 * Description: Simple ES6 VanillaJS Carousel
 * Features:
 *
 */

const smooth = function smooth(selector) {
  // DOM References
  let slider = document.querySelector(selector); // TODO: Add support for multiple sliders
  let dimensions = slider.getBoundingClientRect();
  let slides;

  // TODO: Add support for vertical, parameter handling
  const _translate = function(direction) {
    const offset = (direction === 'backwards') ? (-dimensions.width) : dimensions.width;
    let [existingOffset] = /-?\d+/g.exec(slider.style.transform) || [0];

    existingOffset = parseInt(existingOffset);
    slider.style.transform = `translateX(${existingOffset + offset}px)`;
  };

  const slideForward = function slideForward() {

  };

  const slideBackwards = function slideBackwards() {
    _translate('backwards');
  };

  const arrangeSlides = function arrangeSlides() {

  };

  // API
  const api = {
    slide(direction= 'forward') {
      if (direction !== 'forward' && direction !== 'backwards') {
        return; // TODO: Specify what to return + handle other parameters
      }

      if (direction === 'forward') {

      } else {
        slideBackwards();
      }
    }
  };

  if(!slider || !slider.children) {
    throw new Error('Nothing to slide');
  }

  slides = slider.children;

  return api;
};
