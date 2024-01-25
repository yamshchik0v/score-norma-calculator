export default function tipHandler(e) {
  this.classList.toggle('opened');
  let infoText = this.nextElementSibling;
  if (this.textContent === '?') {
    this.textContent = '–';
    infoText.textContent = 'Время в минутах. Нужно заполнить все поля';
    infoText.style.opacity = 1;
  } else {
    this.textContent = '?';
    infoText.style.opacity = 0;
  }
}
