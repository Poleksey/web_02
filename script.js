const main = document.createElement('main');
const title = document.createElement('h1');
const formSection = document.createElement('section');
const input = document.createElement('input');
const button = document.createElement('button');



// фавикон
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'data:,'; // Пустая иконка
document.head.append(favicon);

title.textContent = 'список задач';
button.textContent = 'Добавить';


input.type = 'text';
input.placeholder = 'Введите текст...';
button.type = 'button';


title.style.color = 'blue';      
title.style.textAlign = 'center';
input.className = 'my-input';    


// Классы для адаптивности
main.className = 'app-container';
title.className = 'main-title';
formSection.className = 'form-section';
button.className = 'btn-add';

// Сборка
formSection.append(input, button);
main.append(title, formSection);
document.body.append(main); 