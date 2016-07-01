// usage: scrollToElem('.index-top-bg__scroll-btn', '.our-works__list', 2000);

export function scrollToElem(targetElemSelector, scrollToElemSelector, time) {
  return $(targetElemSelector).click(() => {
    $('html, body').animate({
      scrollTop: $(scrollToElemSelector).offset().top
    }, time);
  });
}

export function getWidth(selector) {
  let elem = document.body.querySelector(selector);

  if (!elem) {
    return new Error(`elem is not defined, maybe wrong selector
   selector: ${selector}, element: ${elem}`);
  }

  if (!elem.clientHeight) {
    return new Error(`elem.clientHeight is false, maybe DOM is not loaded`);
  }

  return elem.clientHeight;
}

export function equalizeSize(selector1, selector2) {
  let elem1 = document.body.querySelector(selector1);
  let elem2 = document.body.querySelector(selector2);


  if (!(elem1 && elem2)) {
    return new Error(`wrong selectors on of elements not found ${elem1} or ${elem2}`);
  }

  let max = Math.max(elem1.clientHeight, elem2.clientHeight);


  if (!max) {
    return new Error(`can not decide max height, ${max} of ${elem1.maxHeight} and ${elem2.maxHeight}`);
  }

  elem1.style.height = `${max}px`;
  elem2.style.height = `${max}px`;

  return max;
}

export function centerVertical(parentSelector, childSelector, centralizeMethod) {
  let parent = document.body.querySelector(parentSelector);
  let child = document.body.querySelector(childSelector);

  if (!(parent && child)) {
    return new Error(`${parentSelector} or ${childSelector} is wrong. parent: ${parent}, ${child}`);
  }


  if (centralizeMethod === 'marginTop') {
    child.style[centralizeMethod] = `${(parent.clientHeight - child.clientHeight) / 2}px`;
  } else {
    parent.style.paddingTop = `${(parent.clientHeight - child.clientHeight) / 2}px`;
  }
}

export function changeClassIfExist(elemSelector, className) {
  let element = document.body.querySelector(elemSelector);

  if (!element) {
    return new Error('element not found');
  }

  element.classList.contains(className) ?
    element.classList.remove(className) : element.classList.add(className);
}

export function allElementsIsFind() {
  [...arguments].map(arg => {
    if (!arg) {
      return new Error(`some of elements not exist ${arg}`)
    }
  });
  return true;
}

export function itIsParentOf(elem, parent, checkFunc) {
  if (!allElementsIsFind(elem, parent)) return false;

  let i = 0;
  let parentElem = elem.parentNode;

  while (parentElem) {

    if (!checkFunc(parentElem)) {
      parentElem = parentElem.parentNode;
    } else {
      return true;
    }
  }

  return false;
}

export function changeImg(imgSelector, from, to) {
  let img = document.querySelector(imgSelector);

  if (!img) return new Error(`img not found ${imgSelector}: ${img}`);
}

export function reverseImg(img) {
  let newImage = img.dataset.img;
  let oldImage = img.src;

  img.src = newImage;
  img.dataset.img = oldImage;
  console.log(img);
  return img;
}

export function getParent(elem, nodeName) {
  if (elem.nodeName === nodeName) return elem;

  let parentElem = elem.parentNode;

  while (parentElem) {

    if (parentElem.nodeName === nodeName) {
      return parentElem;
    } else {
      parentElem = parentElem.parentNode;
    }
  }
  return false;
}


export function findIndexInParent(selector, currentItem) {
  let childItems = [...document.querySelectorAll(selector)];

  for (var i = 0; i < childItems.length; i++) {
    var child = childItems[i];
    if (child === currentItem) {
      return i;
    }
  }
}


export function changeImgSrc(img, newSrc) {
  if (!img) return new Error(` img is falsy: ${img}`);
  let oldSrc = img.src.split('/');
  let oldSrcLast = oldSrc[oldSrc.length - 1] = newSrc;
  img.src = oldSrc.join('/');
}

export function removeClassForSelector(selector, classForRemove) {
  let items = [...document.querySelectorAll(selector)];

  if (!items) return new Error();

  items.map(item => {
    item.classList.remove(classForRemove);
  });
}

export function setActiveClass(clickedDiv, className) {
  clickedDiv.classList.add(className);
}

export function getWindowWidth() {
  return window.innerWidth;
}
