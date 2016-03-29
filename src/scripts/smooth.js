/**
 * Created by William Abboud on 3/26/2016.
 * Description: Simple ES6 VanillaJS Carousel
 * Features:
 *
 */

const smooth = function smooth(selector) {
  // DOM References
  let slider = document.querySelector(selector); // TODO: Support for multiple sliders
  let slides;

  // API
  const api = {
    slide(direction) {

    }
  };

  if(!slider || !slider.children) {
    throw new Error('Nothing to slide');
  }

  slides = slider.children;
};
