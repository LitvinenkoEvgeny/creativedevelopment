import Swiper from 'swiper';

import {
  scrollToElem,
  centerVertical,
  reverseImg, getWindowWidth
} from './helpers';

import {mouseOverImg} from './eventListeners';


function adaptiveAnimation(e) {
  if (!document.querySelector('.our-works__list')) return;
  let flashContainer = document.querySelector('.animation-flw');
  let windowWidth = document.body.offsetWidth;
  let h3AnimationHeader = document.body.querySelector('.index-top-bg__info h3');
  let h3AnimationHeaderFontSize = getComputedStyle(h3AnimationHeader).fontSize;
  let scrollButton = document.querySelector('.index-top-bg__scroll-btn');
  let scrollButtonBorderWidth = getComputedStyle(scrollButton).borderWidth;
  let scrollButtonIcon = scrollButton.querySelector('i');


  flashContainer.style.height = (windowWidth) * 0.36 + 'px';
  scrollButton.style.width = (windowWidth) * 0.04 + 'px';
  scrollButton.style.height = (windowWidth) * 0.04 + 'px';
  if (windowWidth >= 698) {
    scrollButton.style.borderWidth = (windowWidth) * 0.003 + 'px';
    scrollButtonIcon.style.lineHeight = (windowWidth) * 0.035 + 'px';
    scrollButtonIcon.style.fontSize = (windowWidth) * 0.01 + "px";
  }
  h3AnimationHeader.style.fontSize = (windowWidth) * 0.04 + 'px';
}

window.addEventListener('resize', adaptiveAnimation);


function addWhatWeDoHandlers() {
  let li, img;
  $('.what-we-do li').mouseover((e)=> {
    li = $(e.target).parents('li')[0];

    if (!li) return;

    let img = li.querySelector('img');
    reverseImg(img);
    img.addEventListener('mouseout', () => {
      reverseImg(img);
    })
  });
}

export function navigationResize() {
  let windowWidth = getWindowWidth();

  if (windowWidth > 768) {
    centerVertical('.header', '.nav__logo', 'marginTop');
    centerVertical('.header', '.nav__menu', 'marginTop');
    centerVertical('.header', '.nav__right-buttons', 'marginTop');
  } else if (windowWidth <= 768 && windowWidth > 425) {
    document.querySelector('.nav__logo').style.marginTop = '';
    document.querySelector('.nav__menu').style.marginTop = '';
    document.querySelector('.nav__right-buttons').style.marginTop = '';
  }


}

export function indexSliders() {
  $(document).ready(() => {

    // scroll To Slider
    scrollToElem('.index-top-bg__scroll-btn', '.who-we__inner', 2000);

    let swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      slidesPerView: 4,
      paginationClickable: true,
      spaceBetween: 30,
      loop: true,
      nextButton: '.swiper-next',
      prevButton: '.swiper-prev',
      breakpoints: {
        375: {
          slidesPerView: 1
        },
        425: {
          slidesPerView: 1
        }

      }
    });

    let swiper2 = new Swiper('.swiper-container2', {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      prevButton: '.interesting-articles__prev-button',
      nextButton: '.interesting-articles__next-button',
      breakpoints: {
        1024: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        },
        425: {
          slidesPerView: 1
        }
      }

    });

    navigationResize();
    // если есть класс .our-works__list
    // значит на главной
    if (document.querySelector('.our-works__list')) {
      adaptiveAnimation();
    }
    // addWhatWeDoHandlers();
  });
}


