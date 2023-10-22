export default function initResultPopup(result) {
  const popupWrapperElem = document.createElement('section');
  popupWrapperElem.classList.add('popup_wrap');

  const popupBox = document.createElement('section');
  popupBox.classList.add('popup-box');

  const popupTitle = document.createElement('h2');
  popupTitle.classList.add('popup-title');

  const popupResult = document.createElement('div');
  popupResult.classList.add('popup-result');
  const popupResultText = document.createElement('p');
  if (result.normaReady === true) {
    popupTitle.textContent = '☑ Норма завершена!';
    popupResult.textContent += 'Проставлено: ';

    for (let norma of result.normasArr) {
      popupResult.textContent += `\n ${norma[1]} оценок по ${norma[0]} мин.`;
      popupResult.textContent += `\n Расчёт: ${result.workTime} - ${result.projTime}`;
    }
  } else {
    popupTitle.textContent = 'Результат:';
    console.log(asd);
  }

  const popupCloseBtn = document.createElement('button');
  popupCloseBtn.classList.add('popup-close');
  popupCloseBtn.textContent = 'Понятно';
  popupCloseBtn.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.remove();
    },
    { once: true }
  );

  popupWrapperElem.append(popupBox);
  popupBox.append(popupTitle, popupResult, popupCloseBtn);
  mainContainer.append(popupWrapperElem);
  return true;
}
