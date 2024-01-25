let normaTimeBoxUniqueId = 1;

export default function createNormaTimeBox(
  inputValueValidation,
  removeButtonHandler
) {
  // - Section
  const normaTimeBoxElem = document.createElement('section');
  normaTimeBoxElem.classList.add('normaTime_box');
  // - Time input
  const inputBoxTimeElem = document.createElement('div');
  inputBoxTimeElem.classList.add('input_box');

  const scoreTimeInputElem = document.createElement('input');
  scoreTimeInputElem.setAttribute('type', 'text');
  scoreTimeInputElem.classList.add('input_field');
  scoreTimeInputElem.setAttribute('required', '');
  scoreTimeInputElem.setAttribute('id', 'scoreTime-' + normaTimeBoxUniqueId);
  scoreTimeInputElem.setAttribute('name', 'scoreTime-' + normaTimeBoxUniqueId);
  scoreTimeInputElem.setAttribute('inputmode', 'numeric');
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
  scoreQuantInputElem.setAttribute('type', 'text');
  scoreQuantInputElem.classList.add('input_field');
  scoreQuantInputElem.setAttribute('required', '');
  scoreQuantInputElem.setAttribute('id', 'scoreQuant-' + normaTimeBoxUniqueId);
  scoreQuantInputElem.setAttribute(
    'name',
    'scoreQuant-' + normaTimeBoxUniqueId
  );
  scoreQuantInputElem.setAttribute('inputmode', 'numeric');
  scoreQuantInputElem.setAttribute('data-norma', normaTimeBoxUniqueId);
  scoreQuantInputElem.addEventListener('input', inputValueValidation);

  const scoreQuanLabelElem = document.createElement('label');
  scoreQuanLabelElem.classList.add('input_label');
  scoreQuanLabelElem.setAttribute('for', 'scoreQuant' + normaTimeBoxUniqueId);
  scoreQuanLabelElem.textContent = 'Количество оценок';
  // - Remove button
  const removeButtonElem = document.createElement('button');
  removeButtonElem.classList.add('remove_norma');
  removeButtonElem.textContent = 'ー';
  removeButtonElem.addEventListener('click', removeButtonHandler, {
    once: true,
  });
  inputBoxTimeElem.append(scoreTimeInputElem, scoreTimeLabelElem);
  inputBoxQuantElem.append(scoreQuantInputElem, scoreQuanLabelElem);
  normaTimeBoxElem.append(
    removeButtonElem,
    inputBoxTimeElem,
    inputBoxQuantElem
  );
  normaTimeBoxUniqueId++;
  normaTimeBoxElem.append(inputBoxTimeElem);
  normaTimeBoxElem.append(inputBoxQuantElem);
  return normaTimeBoxElem;
}
