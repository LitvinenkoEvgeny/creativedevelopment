import {indexSliders} from './index';
import aboutPage, {clickAtExpl} from './about';
import * as eventHandlers from './eventListeners';



$(document).ready(() => {
  indexSliders();
  aboutPage();
  
  document.addEventListener('click', eventHandlers.flagClick);
  document.addEventListener('click', eventHandlers.contactClick);
  document.addEventListener('click', eventHandlers.closeContact);
  window.addEventListener('resize', eventHandlers.resizeWindow);
  document.addEventListener('click', clickAtExpl);
});



