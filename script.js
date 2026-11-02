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

// Панель управления: поиск и фильтры
const controlsSection = document.createElement('section');
controlsSection.className = 'controls-section';
controlsSection.style.display = 'flex';
controlsSection.style.gap = '10px';
controlsSection.style.marginTop = '20px';

// Поиск
const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Поиск по названию...';
searchInput.className = 'my-input';

// Фильтр по статусу
const filterSelect = document.createElement('select');
filterSelect.className = 'sort-select';
filterSelect.style.padding = '10px';
filterSelect.style.border = '1px solid #ccc';
filterSelect.style.borderRadius = '4px';

const optAll = document.createElement('option');
optAll.value = 'all';
optAll.textContent = 'Все задачи';

const optActive = document.createElement('option');
optActive.value = 'active';
optActive.textContent = 'В процессе';

const optCompleted = document.createElement('option');
optCompleted.value = 'completed';
optCompleted.textContent = 'Выполненные';

filterSelect.append(optAll, optActive, optCompleted);


// select для сортировки
const sortSelect = document.createElement('select');
sortSelect.className = 'sort-select';
sortSelect.style.padding = '10px';
sortSelect.style.border = '1px solid #ccc';
sortSelect.style.borderRadius = '4px';

const optNone = document.createElement('option');
optNone.value = 'none';
optNone.textContent = 'Без сортировки';

const optAsc = document.createElement('option');
optAsc.value = 'date-asc';
optAsc.textContent = 'Сначала старые';

const optDesc = document.createElement('option');
optDesc.value = 'date-desc';
optDesc.textContent = 'Сначала новые';

sortSelect.append(optNone, optAsc, optDesc);


controlsSection.append(searchInput, filterSelect, sortSelect); 
main.append(controlsSection);


let tasks = [];

// Сохранение задач в память браузера
function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Загрузка задач из памяти браузера
function loadTasks() {
    const saved = localStorage.getItem('todoTasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}


function renderTasks() {
    taskList.textContent = ''; 

    let displayTasks = [...tasks];

    // сортировка
    if (sortSelect.value === 'date-asc') {
        displayTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortSelect.value === 'date-desc') {
        displayTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // фильтрация
    const filterValue = filterSelect.value;
    if (filterValue === 'active') {
        displayTasks = displayTasks.filter(t => !t.completed);
    } else if (filterValue === 'completed') {
        displayTasks = displayTasks.filter(t => t.completed);
    }

    // поиск
    const searchValue = searchInput.value.toLowerCase().trim();
    if (searchValue) {
        displayTasks = displayTasks.filter(t => t.text.toLowerCase().includes(searchValue));
    }

    displayTasks.forEach(task =>  {
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
    
    saveTasks();
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
loadTasks(); 
renderTasks();
searchInput.addEventListener('input', renderTasks);
filterSelect.addEventListener('change', renderTasks);
sortSelect.addEventListener('change', renderTasks);