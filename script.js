const main = document.createElement('main');
const title = document.createElement('h1');
const formSection = document.createElement('section');
const input = document.createElement('input');
const button = document.createElement('button');


title.textContent = 'список задач';
button.textContent = 'Добавить';


input.type = 'text';
input.placeholder = 'Введите текст...';
button.type = 'button';


title.style.color = 'blue';      
title.style.textAlign = 'center';
input.className = 'my-input';    