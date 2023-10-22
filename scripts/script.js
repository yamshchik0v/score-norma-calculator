import initPopup from './helpers/initPopup.js';
import workTimeHandler from './helpers/workTimeHandler.js';
import tipHandler from './helpers/tipHandler.js';

/* –––– Form –––– */
const form = document.getElementById('form_calcucator');
let formInputs = form.querySelectorAll('input[type="number"]');

/* –––– Tip –––– */
const infoTip = document.getElementById('tip');
infoTip.addEventListener('click', tipHandler);

/* ---- NormaTime box Unique Id ---- */
let normaTimeBoxUniqueId = 1;

/* ---- Form Inputs Handler function ---- */
function getInputsData() {
  const arrayOfInputs = Array.from(formInputs);
  const convertedData = {};
  for (let i = 0; i < arrayOfInputs.length; i++) {
    let currentInput = arrayOfInputs[i];

    if (currentInput.name === 'projTime' || currentInput.name === 'workTime') {
      convertedData[currentInput.name] = +currentInput.value;
      continue;
    }
    if (convertedData.hasOwnProperty('norma_' + currentInput.dataset.norma)) {
      convertedData['norma_' + currentInput.dataset.norma].push(
        +currentInput.value
      );
    } else {
      convertedData['norma_' + currentInput.dataset.norma] = [
        +currentInput.value,
      ];
    }
  }
  return convertedData;
}

/* –––– Elements –––– */
const normaWrapper = document.getElementById('normaWrap');
const mainContainer = document.querySelector('main.container');

/* –––– Buttons –––– */
const calcButton = document.getElementById('calcNormaBtn');
calcButton.addEventListener('click', (e) => {
  e.preventDefault();
  let data = getInputsData();
  let resultData = calcResult(data);
  initResultPopup(resultData);
});

calcButton.disabled = isFormInputsValid(formInputs);

const addNormaBtn = document.getElementById('addNorma');
addNormaBtn.addEventListener('click', function (e) {
  e.preventDefault();
  formInputs = form.querySelectorAll('input[type="number"]');
  createNormaTimeBox();
});

/* –––– Work and Project Time inputs –––– */
let workTimePreviousValue = '';
let projTimePreviousValue = '';

const workTimeInput = document.getElementById('workTime');
workTimeInput.addEventListener('input', workTimeHandler(workTimePreviousValue));

const projTimeInput = document.getElementById('projTime');
projTimeInput.addEventListener('input', workTimeHandler(projTimePreviousValue));

/* –––– Work and Project Time handler function –––– */
// function timeInputHandler(e) {
//   const re = /[1-9]\d{1,2}$/;
//   if (this.value.length > 3)
//     if (this.length > 3) this.value.slice(0, this.value.length);
//   if ()
//     this.value = this.value.slice(1, this.value.length);
//   if (+this.value < 0 || +this.value > 999) this.value = previousValue;
// }
/* –––– Norma inputs –––– */

const scoreTimeInput = document.getElementById('scoreTime');
const scoreQuantInput = document.getElementById('scoreQuant');

/* –––– Norma input listenners –––– */
scoreTimeInput.addEventListener('input', inputValueValidation);
scoreQuantInput.addEventListener('input', inputValueValidation);

function inputValueValidation(e) {
  e.target.classList.remove('input_err');
  if (+e.data === 0 && e.data !== null && +e.target.value.length === 1) {
    e.target.value = '';
    if (!e.target.classList.contains('input_err')) {
      e.target.classList.add('input_err');
    }
  }
  if (+e.target.value > 99 || +e.target.value.length >= 2) {
    e.preventDefault();
    e.target.value = e.target.value.slice(0, 2);
  }
  formInputs = form.querySelectorAll('input[type="number"]');
  calcButton.disabled = !isFormInputsValid(formInputs);
}

/* –––– Form Validation –––– */
function isFormInputsValid(formInputs) {
  /* eсли все поля валидны, то разблок кнопку `посчитать`*/
  for (let input of formInputs) {
    if (
      input.value === '' ||
      input.value === null ||
      input.value === undefined ||
      isNaN(input.value)
    )
      return false;
  }
  return true;
}
