/* –––– Form –––– */
const form = document.getElementById('form_calcucator');
let formData = new FormData(form);

/* –––– Elements –––– */
const normaWrapper = document.getElementById('normaWrap');

/* –––– Buttons –––– */
const calcButton = document.getElementById('calcNorma');
calcButton.addEventListener('click', (e) => {
  e.preventDefault();
});
calcButton.disabled = true;
const addNormaBtn = document.getElementById('addNorma');
addNormaBtn.addEventListener('click', function (e) {
  e.preventDefault();
  createNormaTimeBox();
  formData = new FormData(form);
});

function createNormaTimeBox() {
  calcButton.disabled = true;
  let normaTimeBoxCount = normaWrapper.children.length;
  if (normaTimeBoxCount === 3) {
    addNormaBtn.disabled = true;
  } else addNormaBtn.disabled = false;

  // - Section
  const normaTimeBoxElem = document.createElement('section');
  normaTimeBoxElem.classList.add('normaTime_box');
  // - Time input
  const inputBoxTimeElem = document.createElement('div');
  inputBoxTimeElem.classList.add('input_box');

  const scoreTimeInputElem = document.createElement('input');
  scoreTimeInputElem.setAttribute('type', 'number');
  scoreTimeInputElem.classList.add('input_field');
  scoreTimeInputElem.setAttribute('required', '');
  scoreTimeInputElem.setAttribute('id', 'scoreTime' + normaTimeBoxCount);
  scoreTimeInputElem.setAttribute('name', 'scoreTime' + normaTimeBoxCount);

  scoreTimeInputElem.addEventListener('input', inputValueValidation);

  const scoreTimeLabelElem = document.createElement('label');
  scoreTimeLabelElem.classList.add('input_label');
  scoreTimeLabelElem.setAttribute('for', 'scoreTime' + normaTimeBoxCount);
  scoreTimeLabelElem.textContent = 'Время на оценку';
  // - Quant input
  const inputBoxQuantElem = document.createElement('div');
  inputBoxQuantElem.classList.add('input_box');

  const scoreQuantInputElem = document.createElement('input');
  scoreQuantInputElem.setAttribute('type', 'number');
  scoreQuantInputElem.classList.add('input_field');
  scoreQuantInputElem.setAttribute('required', '');
  scoreQuantInputElem.setAttribute('id', 'scoreQuant' + normaTimeBoxCount);
  scoreQuantInputElem.setAttribute('name', 'scoreQuant' + normaTimeBoxCount);

  scoreQuantInputElem.addEventListener('input', inputValueValidation);

  const scoreQuanLabelElem = document.createElement('label');
  scoreQuanLabelElem.classList.add('input_label');
  scoreQuanLabelElem.setAttribute('for', 'scoreQuant' + normaTimeBoxCount);
  scoreQuanLabelElem.textContent = 'Количество оценок';
  // - Remove button
  const removeButtonElem = document.createElement('button');
  removeButtonElem.classList.add('remove_norma');
  removeButtonElem.textContent = '-';
  removeButtonElem.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      addNormaBtn.disabled = false;
      e.target.parentElement.remove();
      formData = new FormData(form);
      calcButton.disabled = !checkFormValidation();
    },
    { once: true }
  );
  inputBoxTimeElem.append(scoreTimeInputElem);
  inputBoxTimeElem.append(scoreTimeLabelElem);
  inputBoxQuantElem.append(scoreQuantInputElem);
  inputBoxQuantElem.append(scoreQuanLabelElem);
  normaTimeBoxElem.append(removeButtonElem);
  normaTimeBoxElem.append(inputBoxTimeElem);
  normaTimeBoxElem.append(inputBoxQuantElem);
  normaWrapper.append(normaTimeBoxElem);
}
/* –––– Work Time inputs –––– */
const workTimeInput = document.getElementById('workTime');
workTimeInput.addEventListener('input', function (e) {
  if (this.value.length > 3 || this.value > 999)
    this.value = this.value.slice(0, 3);
});
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
  formData = new FormData(form);
  calcButton.disabled = !checkFormValidation();
}

/* –––– Form Validation –––– */
function checkFormValidation() {
  /* eсли все поля валидны, то разблок кнопки посчитать*/
  for (let pair of formData.entries()) {
    console.log();
    if (pair[1] === '' || pair[1] === null || pair[1] === undefined)
      return false;
  }
  return true;
}
/* –––– Helper –––– */
const workTimeHelper = document.getElementById('helper');
workTimeHelper.addEventListener('click', helper);

function helper(e) {
  this.classList.toggle('opened');
  let infoText = this.nextElementSibling;
  if (this.textContent === '?') {
    this.textContent = '–';
    infoText.textContent = 'Необходимо вводить время в минутах';
    infoText.style.opacity = 1;
  } else {
    this.textContent = '?';
    infoText.style.opacity = 0;
  }
}
