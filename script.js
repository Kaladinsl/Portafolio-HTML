const text = document.querySelector('[data-text-info]');

let textLength = text.innerText.length;
text.style.setProperty('--n', textLength);
