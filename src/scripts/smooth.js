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
  , timeoutID
  , hasManuallySlided = false;

function _generateWrapper() {
  const wrapper = document.createElement('div');

  wrapper.classList.add('smooth-slider__wrapper');

  return wrapper;
}

function _wrapSlider(wrapperEl) {
  slider.parentElement.appendChild(wrapperEl);
  wrapperEl.appendChild(slider.parentElement.removeChild(slider));
}

function _generatePocketSlide() {
  const pocketSlide = document.createElement('div');

  pocketSlide.classList.add('slide');

  return pocketSlide;
}

function _insertPocketSlide(pocketSlide) {
  slider.insertBefore(pocketSlide, slides[0]);
}

function _onNavControlLeftClick() {
  hasManuallySlided = true;
  slideBackwards();
}

function _onNavControlRightClick() {
  hasManuallySlided = true;
  slideForward();
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

function _generateNavControls() {
  const navControlLeft = document.createElement('span');
  const navControlRight = navControlLeft.cloneNode();
  const navControlsWrapper = document.createElement('div');

  navControlsWrapper.classList.add('nav-controls-wrapper');
  navControlLeft.classList.add('nav-control--left');
  navControlRight.classList.add('nav-control--right');
  navControlLeft.innerHTML = '<';
  navControlRight.innerHTML = '>';

  navControlLeft.addEventListener('click', _onNavControlLeftClick);
  navControlRight.addEventListener('click', _onNavControlRightClick);

  navControlsWrapper.appendChild(navControlLeft);
  navControlsWrapper.appendChild(navControlRight);

  return navControlsWrapper;
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
  document.querySelector('.nav-control--right').removeEventListener('click', _onNavControlRightClick);
  _translate('-200%');

  if (hasManuallySlided) {
    clearTimeout(timeoutID);
  } else {
    timeoutID = setTimeout(_timeout, Number(dataOpts.timeout));
  }

  slider.addEventListener('transitionend', function translateEnd() {
    _swapCurrentTag(slides.item(2));
    _push(slider.removeChild(slides.item(1)));
    _resetTranslate(translateEnd);

    document.querySelector('.nav-control--right').addEventListener('click', _onNavControlRightClick);
    if (hasManuallySlided) {
      timeoutID = setTimeout(_timeout, Number(dataOpts.timeout));
      hasManuallySlided = false;
    }
  });
};

function slideBackwards() {
  const lastEl = slider.removeChild(slider.lastElementChild);
  const pocket = slider.replaceChild(lastEl, slider.firstElementChild);

  document.querySelector('.nav-control--left').removeEventListener('click', _onNavControlLeftClick);

  if (hasManuallySlided) {
    clearTimeout(timeoutID);
  } else {
    timeoutID = setTimeout(_timeout, Number(dataOpts.timeout));
  }

  _translate(0);
  slider.addEventListener('transitionend', function translateEnd() {
    _swapCurrentTag(lastEl);
    _resetTranslate(translateEnd);
    slider.insertBefore(pocket, lastEl);

    document.querySelector('.nav-control--left').addEventListener('click', _onNavControlLeftClick);

    if (hasManuallySlided) {
      timeoutID = setTimeout(_timeout, Number(dataOpts.timeout));
      hasManuallySlided = false;
    }
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

    _wrapSlider(_generateWrapper());
    _insertPocketSlide(_generatePocketSlide());
    _generateSlides();

    if (!isNaN(Number(dataOpts.timeout))) {
      timeoutID = setTimeout(_timeout, Number(dataOpts.timeout));
    }

    if (dataOpts.navControls === 'true') {
      slider.parentElement.appendChild(_generateNavControls());
    }

    const classes = [...[...slider.classList].splice(0)];
    slider.classList.remove(...classes);
    slider.parentElement.classList.add(...classes);
    slider.classList.add('smooth-slider');

    return api;
  }
};

export default init;
