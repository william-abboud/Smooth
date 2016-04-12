/**
 * Created by William Abboud on 3/26/2016.
 * Description: Simple ES6 Vanilla JavaScript Carousel
 */

let slider
  , slides
  , opts
  , dataOpts
  , timeoutID
  , navControlLeft
  , navControlRight
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

function _generateSlide() {
  const newSlide = document.createElement('div');

  newSlide.classList.add('slide');

  return newSlide;
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

function _addManualSliding() {
  navControlRight.addEventListener('click', _onNavControlRightClick);
  navControlLeft.addEventListener('click', _onNavControlLeftClick);
}

function _wrapImage (img) {
  let justBefore;
  let imageContainer = img.parentElement;
  const imageWrapper = _generateSlide();

  if (imageContainer === slider) {
    imageWrapper.appendChild(img.cloneNode());

    return imageWrapper;
  } else {
    // Find top level parent containing the image
    while (imageContainer !== slider) {
      justBefore = imageContainer;
      imageContainer = imageContainer.parentElement;
    }

    justBefore.classList.add('content');
    imageWrapper.appendChild(img.parentElement.removeChild(img));
    imageWrapper.appendChild(justBefore.cloneNode(true));

    return imageWrapper;
  }
}

function _generateSlides() {
  for (const child of [...slides]) {
    if (child.tagName.toLowerCase() === 'img') {
      slider.replaceChild(_wrapImage(child), child);
    } else {
      const imgs = child.getElementsByTagName('img');

      if (imgs.length) {
        slider.replaceChild(_wrapImage(imgs[0]), child);
      } else {
        child.classList.add('slide');
      }
    }
  }
}

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

function _startAutoSliding () {
  timeoutID = setTimeout(slideForward, Number(dataOpts.timeout));
}

function _disableManualSliding() {
  navControlRight.removeEventListener('click', _onNavControlRightClick);
  navControlLeft.removeEventListener('click', _onNavControlLeftClick);
}

function slideForward() {
  clearTimeout(timeoutID);
  _translate('-200%');

  if (hasManuallySlided) {
    _disableManualSliding();
  }

  slider.addEventListener('transitionend', function translateEnd() {
    _resetTranslate(translateEnd);
    _swapCurrentTag(slides[2]);
    slider.appendChild(slider.removeChild(slides[1]));

    if (hasManuallySlided) {
      _addManualSliding();
      hasManuallySlided = false;
    }

    _startAutoSliding();
  });
};

function slideBackwards() {
  const lastEl = slider.removeChild(slider.lastElementChild);
  const pocket = slider.replaceChild(lastEl, slider.firstElementChild);

  clearTimeout(timeoutID);
  
  if (hasManuallySlided) {
    _disableManualSliding();
  }

  _translate(0);

  slider.addEventListener('transitionend', function translateEnd() {
    _swapCurrentTag(lastEl);
    _resetTranslate(translateEnd);
    slider.insertBefore(pocket, lastEl);

    if (hasManuallySlided) {
      _addManualSliding();
      hasManuallySlided = false;
    }

    _startAutoSliding();
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
    let classes;
    dataOpts = slider.dataset;
    slides = slider.children;
    slides[1].dataset.current = 'true';

    _wrapSlider(_generateWrapper());
    _insertPocketSlide(_generateSlide());

    if (!isNaN(Number(dataOpts.timeout))) {
      _startAutoSliding();
    }

    if (dataOpts.navControls === "true") {
      const controlsWrapper = slider.querySelector('.nav-controls-wrapper');

      navControlLeft = slider.querySelector('.nav-control--left');
      navControlRight = slider.querySelector('.nav-control--right');

      _addManualSliding();
      slider.parentElement.appendChild(slider.removeChild(controlsWrapper));
    }

    _generateSlides();

    classes = [...[...slider.classList].splice(0)];
    slider.classList.remove(...classes);
    slider.parentElement.classList.add(...classes);
    slider.classList.add('smooth-slider');

    return api;
  }
};

export default init;
