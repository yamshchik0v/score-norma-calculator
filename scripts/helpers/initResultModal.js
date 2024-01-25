export default function initResultModal(data) {
  document.body.append(createModal(data));
}

function createModal(data) {
  // - modal backdrop
  const modalBackdrop = createElement("section", "modal__backdrop", "");
  modalBackdrop.addEventListener("click", closeModal, { once: true });
  // - modal box
  const modalWindow = createElement("section", "modal__window", "");
  modalWindow.addEventListener("click", (e) => e.stopPropagation());
  // - modal content
  const modalContent = createElement("section", "modal__content", "");

  if (!data.normaReady) {
    // - create modal title
    modalContent.append(createElement("h3", "modal__title", "Итог"));
    modalContent.append(createCalculations(data));
    modalContent.append(createScoreList(data));
    modalContent.append(createRemainingList(data));
    modalContent.append(createResultSummary(data));
    modalContent.append(createCloseButton());
    modalBackdrop.append(modalWindow);
    modalWindow.append(modalContent);
    document.body.append(modalBackdrop);
  } else {
    modalContent.append(createElement("h3", "modal__title", "Норма выполнена"));
    modalContent.append(createCalculations(data));
    modalContent.append(createScoreList(data));
    modalContent.append(createResultSummary(data));
    modalContent.append(createCloseButton());
    modalBackdrop.append(modalWindow);
    modalWindow.append(modalContent);
  }
  return modalBackdrop;
}
// ? - Create Element
function createElement(elem = "div", className = "", text = "") {
  const resultElem = document.createElement(elem);
  resultElem.classList.add(className);
  if (!!text) resultElem.textContent = text;
  return resultElem;
}
// ! Calculations ------- ------- ------- ------- ------- ------- ------- -------
function createCalculations(formData) {
  const calcElem = createElement("section", "modal__info__section", "");
  // - create title
  calcElem.append(
    createElement("h4", "modal__title__result", "Расчёт по времени:")
  );
  //- create callout
  const calloutElem = createElement("section", "modal__callout", "");
  calcElem.append(calloutElem);

  const calcInfoElem = createElement("p", "info__paragraph");
  calcInfoElem.textContent = `${formData.workTime} ${
    formData.projTime ? "- " + formData.projTime : ""
  } - ${formData.normas
    .map((norma) => `${norma.scoreTime * norma.quantity}`)
    .join(" - ")} = ${
    formData.timeUntilEnd > 0
      ? formData.timeUntilEnd
      : formData.timeUntilEnd * -1
  } ${
    formData.timeUntilEnd > 0 ? "мин. осталось до конца" : "мин. сверх нормы"
  }`;
  calloutElem.append(calcInfoElem);
  return calcElem;
}
// ! Score List ------- ------- ------- ------- ------- ------- ------- -------
function createScoreList(formData) {
  const scoreListContent = createElement("section", "modal__info__section", "");
  // - create title
  scoreListContent.append(
    createElement("h4", "modal__title__result", "Расчёт по оценкам:")
  );
  //- create callout
  const calloutElem = createElement("section", "modal__callout", "");
  scoreListContent.append(calloutElem);
  // - create list
  const scoreListElem = createElement("ul", "info__list", "");
  calloutElem.append(scoreListElem);

  for (let norma of formData.normas) {
    const listItemText = `${norma.quantity} ${getCorrectScoreDeclension(
      norma.quantity
    )} по ${norma.scoreTime} мин. (${norma.quantity * norma.scoreTime} мин.)`;
    let listItem = createElement("li", "info__list__item", listItemText);
    scoreListElem.append(listItem);
  }
  if (formData.normas.length > 1)
    calloutElem.append(
      createElement(
        "p",
        "info__paragraph",
        `Суммарно: ${formData.allNormaTime} мин.`
      )
    );
  return scoreListContent;
}
// ! Scores Remaining ------- ------- ------- ------- ------- ------- ------- -------
function createRemainingList(formData) {
  const scoreListContent = createElement("section", "modal__info__section", "");
  // - create title
  scoreListContent.append(
    createElement("h4", "modal__title__result", "Осталось поставить:")
  );
  //- create callout
  const calloutElem = createElement("section", "modal__callout", "");
  scoreListContent.append(calloutElem);
  // - create list
  const scoreListElem = createElement("ul", "info__list", "");
  calloutElem.append(scoreListElem);

  const normaReady = formData.normas.reduce(
    (prev, curr) => prev + curr.scoreTime * curr.quantity,
    0
  );
  console.log(normaReady);
  for (let norma of formData.normas) {
    const remainingScore = Math.ceil(formData.timeUntilEnd / norma.scoreTime);
    console.log("remaining score", remainingScore);
    const listItemText = `${formData.timeUntilEnd} мин. / ${
      norma.scoreTime
    } мин. = ${remainingScore} ${getCorrectScoreDeclension(
      remainingScore
    )} по ${norma.scoreTime} мин.`;
    let listItem = createElement("li", "info__list__item", listItemText);
    scoreListElem.append(listItem);
  }
  return scoreListContent;
}
// ! Result Summary  ------- ------- ------- ------- ------- ------- ------- -------
function createResultSummary(formData) {
  function getSummaryPhrase() {
    const timeRemaining = formData.timeUntilEnd;
    const leastNormaTime = Math.min(
      formData.normas.map((norma) => norma.scoreTime)
    );
    if (timeRemaining <= 0) return "Работа выполнена! ✅";
    if (timeRemaining <= leastNormaTime) return "Одна оценка 👌🏻";
    if (timeRemaining <= 3 * leastNormaTime) return "Осталось чуть-чуть... 🧘🏼‍♂️";
    if (timeRemaining <= formData.cleanWorkTime / 2)
      return "Больше половины работы выполнена 😤";
    return "Еще предстоит много работы 🤔";
  }
  return createElement("p", "info__result-summary", getSummaryPhrase(formData));
}
// * Button ------- ------- ------- ------- ------- ------- ------- -------
function createCloseButton() {
  const modalCloseBtnElem = createElement("button", "modal__close", "Понятно");
  modalCloseBtnElem.addEventListener("click", closeModal, { once: true });
  return modalCloseBtnElem;
}

function closeModal(e) {
  e.preventDefault();
  const modal = document.querySelector("section.modal__backdrop");
  modal.setAttribute("closing", "");
  modal.addEventListener(
    "animationend",
    () => {
      modal.removeAttribute("closing");
      modal.remove();
    },
    { once: true }
  );
}
// * ------- ------- ------- ------- ------- ------- ------- ------- -------
function getCorrectScoreDeclension(num) {
  let isNumTeen = num >= 11 && num < 15;
  if (isNumTeen) return "оценок";
  const numToString = num + "";
  const lastChar = numToString.at(-1);
  switch (+lastChar) {
    case 1:
      return "оценка";
    case 2:
    case 3:
    case 4:
      return "оценки";
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return "оценок";
  }
}
