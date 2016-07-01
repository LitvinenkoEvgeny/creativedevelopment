import {
  changeClassIfExist,
  itIsParentOf,
  allElementsIsFind,
  getParent,
  reverseImg,
  changeImgSrc
} from './helpers';
import {navigationResize} from './index';


export function contactClick(e) {
  if (!e.target.classList.contains('contacts__link')) return;

  e.preventDefault();
  let contactsLink = document.querySelector('.contacts__link');
  let contactForm = document.querySelector('.contacts');

  if (!(contactForm && contactsLink)) return new Error();

  contactForm.classList.add('contacts--open');
}

export function closeContact(e) {
  if (!e.target.classList.contains('contacts__close')) return;
  document.querySelector('.contacts').classList.remove('contacts--open');
}


export function flagClick(e) {
  let flagContainer = document.querySelector('.nav__language');
  let flagImg = flagContainer.querySelector('img');

  if (!(e.target === flagImg || e.target === flagContainer)) return;

  let imgName = flagImg.src.split('/');
  let newImgName = imgName[imgName.length - 1] === 'usa.png' ? 'russia.png' : 'usa.png';

  changeImgSrc(flagImg, newImgName);
}

export function resizeWindow(e) {
  navigationResize();
}

export function mouseOverImg(e) {
  let li;
  if (!e.target.nodeName === 'LI') {
    li = e.target;
  } else {
    li = getParent(e.target, 'LI');
  }
  if (!li) return new Error(`li is not found: ${li}`);

  let img = li.querySelector('img');
  reverseImg(img.src);
}
