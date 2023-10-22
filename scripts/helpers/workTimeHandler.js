export default function workTimeHandler(previousValue) {
  return function (e) {
    const input = e.target;

    let regexValidation = /^0\d{1}$/gi;

    if (regexValidation.test(input.value)) {
      input.value = input.value.slice(1, input.value.length);
    }
    if (input.value.length > 3 || +input.value > 999) {
      input.value = previousValue;
    }
    if (+input.value < 0) {
      input.value = 0;
    } else previousValue = input.value;
  };
}
