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


title.style.color = 'red';      
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




// Бизнес-логика

// добавление задачи
const taskList = document.createElement('ul');
taskList.className = 'task-list';
taskList.style.listStyleType = 'none'; 
taskList.style.padding = '0';
main.append(taskList); 

let tasks = [];

function renderTasks() {
    taskList.textContent = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.padding = '10px';
        li.style.borderBottom = '1px solid #ccc';
        li.style.marginTop = '10px';

        const span = document.createElement('span');
        span.textContent = task.text;

        // кнопка удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'del';
        deleteBtn.className = 'btn-delete';
        
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        li.append(span, deleteBtn);
        taskList.append(li);
    });
}

function addTask() {
    const text = input.value.trim();
    if (!text) return; 

    const newTask = {
        id: Date.now(), 
        text: text
    };

    tasks.push(newTask); 
    input.value = '';    
    
    renderTasks();      
}

button.addEventListener('click', addTask);