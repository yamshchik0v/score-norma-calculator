export default function isFormInputsValid(formInputs) {
  // checking project time is bigger than work time
  if (+formInputs[0].value < +formInputs[1].value) {
    return false;
  }

  let isScoreInput = (input) => Boolean(input.dataset.norma);

  for (let input of formInputs) {
    if (
      input.value === '' ||
      input.value === null ||
      input.value === undefined ||
      isNaN(input.value)
    ) {
      return false;
    }
    if (isScoreInput(input) && input.value === '0') {
      return false;
    }
  }
  return true;
}
