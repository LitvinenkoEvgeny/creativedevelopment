import {
  equalizeSize, centerVertical,
  getParent, setActiveClass,
  removeClassForSelector, changeImgSrc,
  changeClassIfExist, findIndexInParent
} from './helpers';

export function clickAtExpl(e) {
  let clicked = e.target;
  let parentDiv = getParent(clicked, 'DIV');
  if (!parentDiv.classList) return false;

  if (parentDiv.classList.contains('expl')) {
    removeClassForSelector('.expl', 'expl--active');
    setActiveClass(parentDiv, 'expl--active');
    changeSlide(parentDiv);
  }
}


function changeSlide(clickedDiv) {
  let img;
  let iconName = clickedDiv.querySelector('i').classList[1].split('-')[1] + '.png';

  let itemIndex = findIndexInParent('.expl', clickedDiv);

  let textDivs = [...document.querySelectorAll('.dev-process__text > div')];
  removeClassForSelector('.dev-process__text div', 'active');
  setActiveClass(textDivs[itemIndex], 'active')

  img = textDivs[itemIndex].querySelector('.left img');


  changeImgSrc(img, iconName);
}


export default function () {

}