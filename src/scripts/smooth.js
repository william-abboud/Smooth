/**
 * Created by William Abboud on 3/26/2016.
 * Description: Simple ES6 VanillaJS Carousel
 * Features:  TODO: Add support for multiple sliders
 *
 */

let slider
  , slides
  , opts
  , dataOpts
  , timeoutID;

const defaultOptions = {};

function _generateWrapper() {
  const wrapper = document.createElement('div');
  const pocketSlide = document.createElement('div');

  wrapper.classList.add('generated-wrapper');
  pocketSlide.classList.add('slide');
  slider.insertBefore(pocketSlide, slider.children[0]);
  slider.parentNode.appendChild(wrapper);
  wrapper.appendChild(slider.parentNode.removeChild(slider));
}

function _generateSlides() {
  const wrapImage = (img) => {
    let justBefore;
    let parent = img.parentElement;
    const wrapperSlide = document.createElement('div');
    wrapperSlide.classList.add('slide');

    if (parent === slider) {
      wrapperSlide.appendChild(img.cloneNode());
      return wrapperSlide;
    }

    while (parent !== slider) {
      justBefore = parent;
      parent = parent.parentElement;
    }

    justBefore.classList.add('content');
    wrapperSlide.appendChild(img.parentElement.removeChild(img));
    wrapperSlide.appendChild(justBefore.cloneNode(true));

    return wrapperSlide;
  };

  for (const child of [...slider.children]) {
    if (child.tagName.toLowerCase() === 'img') {
      slider.replaceChild(wrapImage(child), child);
    } else {
      const imgs = child.getElementsByTagName('img');

      if (imgs.length) {
        slider.replaceChild(wrapImage(imgs[0]), child);
      } else {
        child.classList.add('slide');
      }
    }
  }
}

function _timeout() {
  slideForward();
}

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
  _translate('-200%');

  slider.addEventListener('transitionend', function translateEnd() {
    _swapCurrentTag(slides.item(2));
    _push(slider.removeChild(slides.item(1)));
    _resetTranslate(translateEnd);

    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(_timeout, dataOpts.timeout);
    }
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
  slider = document.querySelector(selector);

  if (!slider || !slider.children.length) {
    throw new Error('Nothing to slide');
  } else {
    dataOpts = slider.dataset;
    slides = slider.children;
    slides[1].dataset.current = 'true';

    _generateWrapper();
    _generateSlides();

    if (!isNaN(Number(dataOpts.timeout))) {
      timeoutID = setTimeout(_timeout, Number(dataOpts.timeout));
    }

    return api;
  }
};

export default init;
