import initResultModal from './helpers/initResultModal.js';
import isFormInputsValid from './helpers/isFormInputsValid.js';
import calcResult from './helpers/calcResults.js';
import tipHandler from './helpers/eventListeners/tipHandler.js';
import createNormaTimeBox from './helpers/createNormaTimeBox.js';

/* –––– Form –––– */
const form = document.getElementById('form_calcucator');
let formInputs = form.querySelectorAll('input[type="text"]');

/* –––– Tip –––– */
const infoTip = document.getElementById('tip');
infoTip.addEventListener('click', tipHandler);

/* –––– Elements –––– */
const normaWrapper = document.getElementById('normaWrap');
const mainContainer = document.querySelector('main.container');

/* –––– Buttons –––– */
const calcButton = document.getElementById('calcNormaBtn');
calcButton.addEventListener('click', appCalcAndShowResult);
const clearButton = document.getElementById('clearInputsBtn');
clearButton.addEventListener('click', clearAllInputs);

calcButton.disabled = !isFormInputsValid(formInputs);

/* –––– Form Inputs Handler function –––– */
function getInputsData() {
  const arrayOfInputs = Array.from(formInputs);
  const workTimeInputsArr = arrayOfInputs.filter((input) =>
    findWorkAndProjTime(input)
  );
  const scoreInputsArr = arrayOfInputs.filter(
    (input) => !findWorkAndProjTime(input)
  );
  const convertedData = { projTime, workTime, normas: [] };

  function findWorkAndProjTime(input) {
    return input.id === 'projTime' || input.id === 'workTime';
  }

  workTimeInputsArr.forEach(
    (input) => (convertedData[input.name] = +input.value)
  );

  for (let k = 0; k < scoreInputsArr.length; k += 2) {
    let scoreObj = {};
    scoreObj.scoreTime = +scoreInputsArr[k].value;
    scoreObj.quantity = +scoreInputsArr[k + 1].value;
    convertedData.normas.push(scoreObj);
  }

  return convertedData;
}
/* ---- Add Norma Inputs ----*/

const addNormaBtn = document.getElementById('addNorma');
addNormaBtn.addEventListener('click', function (e) {
  e.preventDefault();
  calcButton.disabled = true;

  let normaTimeBoxCount = normaWrapper.children.length;
  if (normaTimeBoxCount === 4) {
    addNormaBtn.disabled = true;
  } else addNormaBtn.disabled = false;

  normaWrapper.append(
    createNormaTimeBox(inputValueValidation, removeButtonHandler)
  );

  formInputs = form.querySelectorAll('input[type="text"]');
});

/* –––– Work and Project Time inputs –––– */
const workTimeInput = document.getElementById('workTime');
workTimeInput.addEventListener('input', workTimeHandler);
const projTimeInput = document.getElementById('projTime');
projTimeInput.addEventListener('input', workTimeHandler);

function workTimeHandler(e) {
  const input = e.target;
  input.value = input.value.replace(/[^0-9]/g, '');

  let regexValidation = /^0\d/g;
  if (regexValidation.test(input.value)) {
    input.value = input.value.slice(1, input.value.length);
  }
  if (input.value.length > 4) {
    input.value = input.value.replace(/[0-9]{5}/g, input.value.slice(0, 4));
  }
  clearButton.disabled = isInputsEmpty();
  calcButton.disabled = !isFormInputsValid(formInputs);
}

/* –––– Norma inputs –––– */
const scoreTimeInput = document.getElementById('scoreTime');
scoreTimeInput.addEventListener('input', inputValueValidation);
const scoreQuantInput = document.getElementById('scoreQuant');
scoreQuantInput.addEventListener('input', inputValueValidation);

/* ---- Inputs Validate ---- */
function inputValueValidation(e) {
  const input = e.target;

  input.classList.remove('input_err');
  input.value = input.value.replace(/[^0-9]/g, '');

  if (
    !input.value ||
    (+input.value === 0 && !input.classList.contains('input_err'))
  ) {
    input.classList.add('input_err');
  }
  let regexValidation = /^0\d/g;
  if (regexValidation.test(input.value)) {
    input.value = input.value.slice(1, input.value.length);
  }
  if (+input.value > 99 || +input.value.length >= 2) {
    input.value = input.value.slice(0, 2);
  }

  clearButton.disabled = isInputsEmpty();
  calcButton.disabled = !isFormInputsValid(formInputs);
}

/* –––– Remove Norma Button Handler –––– */
function removeButtonHandler(e) {
  e.preventDefault();
  addNormaBtn.disabled = false;
  e.target.parentElement.remove();
  formInputs = form.querySelectorAll('input[type="text"]');
  calcButton.disabled = !isFormInputsValid(formInputs);
}
/* ---- Calc result Handler ---- */
function appCalcAndShowResult(e) {
  let popupWrapperElem = document.querySelector('section.popup_wrap');
  if (popupWrapperElem) return;
  e.preventDefault();
  let data = getInputsData();
  let resultData = calcResult(data);
  initResultModal(resultData);
}

/* ---- Clear button functions and handlers ---- */
function clearAllInputs(e) {
  e.preventDefault();
  formInputs.forEach((input) => (input.value = ''));
  formInputs[0].focus();
  clearButton.disabled = true;
  calcButton.disabled = true;
}

function isInputsEmpty() {
  return Array.from(formInputs).every((input) => input.value === '');
}
