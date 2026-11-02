const main = document.createElement('main');
const title = document.createElement('h1');
const formSection = document.createElement('section');
const input = document.createElement('input');
const button = document.createElement('button');

const inputDate = document.createElement('input');
inputDate.type = 'date'; 
inputDate.className = 'my-input'


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
formSection.append(input, inputDate, button);
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

        const infoContainer = document.createElement('div')

        const span = document.createElement('span');
        span.textContent = task.text;

        //  дата
        const dateSpan = document.createElement('span');
        if (task.date) {
            dateSpan.textContent = ` (до ${task.date})`;
            dateSpan.style.color = 'gray';
            dateSpan.style.fontSize = '0.9em';
        }
        
        infoContainer.append(span, dateSpan);

        infoContainer.style.display = 'flex';
        infoContainer.style.alignItems = 'center';
        infoContainer.style.gap = '10px';

        // выполнено\невыеполнено
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed; 
        
        if (task.completed) {
            infoContainer.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            renderTasks(); 
        });

        infoContainer.append(checkbox, span, dateSpan);

        const btnContainer = document.createElement('div')

        // кнопка редактирования
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        editBtn.className = 'btn-edit';


        editBtn.addEventListener('click', () => {
            li.textContent = ''; 
            
            const editText = document.createElement('input');
            editText.type = 'text';
            editText.value = task.text;
            editText.style.marginRight = '5px';

            const editDate = document.createElement('input');
            editDate.type = 'date';
            editDate.value = task.date || '';
            editDate.style.marginRight = '5px';

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'save';
            saveBtn.className = 'btn-save';

            saveBtn.addEventListener('click', () => {
                task.text = editText.value.trim() || task.text; 
                task.date = editDate.value;
                renderTasks(); 
            });

            li.append(editText, editDate, saveBtn);
        });


        // кнопка удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'del';
        deleteBtn.className = 'btn-delete';
        
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });



        btnContainer.append(editBtn, deleteBtn);
        li.append(infoContainer, btnContainer);
        taskList.append(li);
    });
}

function addTask() {
    const text = input.value.trim();
    const date = inputDate.value;

    if (!text) return; 

    const newTask = {
        id: Date.now(), 
        text: text,
        date: date,
        completed: false
    };

    tasks.push(newTask); 
    input.value = '';    
    inputDate.value = '';

    renderTasks();      
}

button.addEventListener('click', addTask);