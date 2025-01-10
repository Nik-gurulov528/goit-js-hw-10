'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timeDelay = document.querySelector('input');
const promiseForm = document.querySelector('form');
const successfulOpt = document.querySelectorAll('input[name = "state"]')[0];
const unsuccessfulOpt = document.querySelectorAll('input[name = "state"]')[1];
let selectedOpt = null;

let options = {
  titleColor: '#ffffff',
  messageColor: '#ffffff',
  close: false,
  pauseOnHover: false,
  position: 'center',
};

let inputDelayMs = 0;
timeDelay.addEventListener('input', () => {
  inputDelayMs = timeDelay.value;
});

successfulOpt.addEventListener('click', () => {
  selectedOpt = successfulOpt;
});
unsuccessfulOpt.addEventListener('click', () => {
  selectedOpt = unsuccessfulOpt;
});

promiseForm.addEventListener('submit', event => {
  event.preventDefault();
  let selectedDelayMs = inputDelayMs;
  let finalSelectedOpt = selectedOpt;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (finalSelectedOpt === successfulOpt) {
        selectedOpt = null;
        resolve(`Fulfilled promise in ${selectedDelayMs}ms`);
      } else {
        selectedOpt = null;
        reject(`Rejected promise in ${selectedDelayMs}ms`);
      }

      promise
        .then(strText => {
          options.title = 'Success!';
          options.message = strText;
          options.backgroundColor = '#02d93b';
          options.progressBarColor = '#05961a';
          iziToast.show(options);
        })
        .catch(errorText => {
          options.title = 'Fail!';
          options.message = errorText;
          options.backgroundColor = '#d61c0f';
          options.progressBarColor = '#611101';
          iziToast.show(options);
        });
    }, selectedDelayMs);
  });
  promiseForm.reset();
});
