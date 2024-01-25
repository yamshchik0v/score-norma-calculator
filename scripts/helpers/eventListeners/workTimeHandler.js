export default function workTimeHandler(previousValue) {
  return function (e) {
    const input = e.target;
    input.value = input.value.replace(/[^0-9]/g, '');

    let regexValidation = /^0\d/g;
    if (regexValidation.test(input.value)) {
      input.value = input.value.slice(1, input.value.length);
    }
    if (input.value.length > 4 || +input.value > 9999) {
      input.value = previousValue;
    }
    if (+input.value < 0) {
      input.value = 0;
    } else previousValue = input.value;
  };
}
