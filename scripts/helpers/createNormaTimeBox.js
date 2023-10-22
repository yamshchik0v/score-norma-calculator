export default function createNormaTimeBox() {
  normaTimeBoxUniqueId++;
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
  scoreTimeInputElem.setAttribute('id', 'scoreTime' + normaTimeBoxUniqueId);
  scoreTimeInputElem.setAttribute('name', 'scoreTime' + normaTimeBoxUniqueId);
  scoreTimeInputElem.setAttribute('data-norma', normaTimeBoxUniqueId);
  scoreTimeInputElem.addEventListener('input', inputValueValidation);

  const scoreTimeLabelElem = document.createElement('label');
  scoreTimeLabelElem.classList.add('input_label');
  scoreTimeLabelElem.setAttribute('for', 'scoreTime' + normaTimeBoxUniqueId);
  scoreTimeLabelElem.textContent = 'Время на оценку';
  // - Quant input
  const inputBoxQuantElem = document.createElement('div');
  inputBoxQuantElem.classList.add('input_box');

  const scoreQuantInputElem = document.createElement('input');
  scoreQuantInputElem.setAttribute('type', 'number');
  scoreQuantInputElem.classList.add('input_field');
  scoreQuantInputElem.setAttribute('required', '');
  scoreQuantInputElem.setAttribute('id', 'scoreQuant' + normaTimeBoxUniqueId);
  scoreQuantInputElem.setAttribute('name', 'scoreQuant' + normaTimeBoxUniqueId);
  scoreQuantInputElem.setAttribute('data-norma', normaTimeBoxUniqueId);
  scoreQuantInputElem.addEventListener('input', inputValueValidation);

  const scoreQuanLabelElem = document.createElement('label');
  scoreQuanLabelElem.classList.add('input_label');
  scoreQuanLabelElem.setAttribute('for', 'scoreQuant' + normaTimeBoxUniqueId);
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
      formInputs = form.querySelectorAll('input[type="number"]');
      calcButton.disabled = !isFormInputsValid(formInputs);
    },
    { once: true }
  );
  inputBoxTimeElem.append(scoreTimeInputElem, scoreTimeLabelElem);
  inputBoxQuantElem.append(scoreQuantInputElem, scoreQuanLabelElem);
  normaTimeBoxElem.append(
    removeButtonElem,
    inputBoxTimeElem,
    inputBoxQuantElem
  );
  // normaTimeBoxElem.append(inputBoxTimeElem);
  // normaTimeBoxElem.append(inputBoxQuantElem);
  normaWrapper.append(normaTimeBoxElem);
}
