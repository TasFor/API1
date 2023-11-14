// script.js
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const searchBox = document.getElementById('search-box');
    const todoList = document.getElementById('todo-list');
    const taskDate = document.getElementById('task-date');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    

    function addTask() {
        const taskContent = newTaskInput.value;
        const taskDeadline = taskDate.value;
        
        if (taskContent.length >= 3 && taskContent.length <= 255 && (!taskDeadline || new Date(taskDeadline) > new Date())) {
            const newTask = {
                id: Date.now(),  // Utwórz unikalne ID dla zadania
                content: taskContent,
                deadline: taskDeadline,
                completed: false
            };
    
            tasks.push(newTask);  // Dodaj nowe zadanie do tablicy zadań
            saveTasks();
            drawTasks();
            newTaskInput.value = '';
            taskDate.value = '';
        } else {
            alert('Zadanie musi mieć od 3 do 255 znaków i data musi być pusta lub w przyszłości.');
        }
    }
    

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function filterTasks() {
        const searchTerm = searchBox.value.toLowerCase();
        if (searchTerm.length >= 2) {
            const filteredTasks = tasks.filter(task => task.content.toLowerCase().includes(searchTerm));
            todoList.innerHTML = '';
            filteredTasks.forEach((task, index) => {
                const taskElement = document.createElement('li');
                let taskContent = task.content;

                const contentSpan = document.createElement('span');
                contentSpan.textContent = task.content;
                contentSpan.id = `content-${task.id}`;
                contentSpan.addEventListener('click', () => editTask(task.id));
        
                // Span dla daty zadania z unikalnym ID.
                const deadlineSpan = document.createElement('span');
                deadlineSpan.textContent = formatDate(task.deadline);
                deadlineSpan.id = `deadline-${task.id}`;
                deadlineSpan.addEventListener('click', () => editTask(task.id));
        
                taskElement.appendChild(contentSpan);
                taskElement.appendChild(deadlineSpan);
    
                // Wyróżnienie frazy
                const regex = new RegExp(searchTerm, 'gi');
                taskContent = taskContent.replace(regex, match => `<span class="highlight">${match}</span>`);
                taskElement.innerHTML = `<span>${taskContent} <span class="task-date">(Termin: ${formatDate(task.deadline)})</span></span>`;

                // // Przycisk edycji
                // const editButton = document.createElement('button');
                // editButton.textContent = 'Edytuj';
                // editButton.className = 'edit';
                // editButton.onclick = () => editTask(taskId); // Pamiętaj o zmianie tej linii, jeśli twoja logika wymaga innej implementacji
                // taskElement.appendChild(editButton);
    
                // Przycisk usuwania
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Usuń';
                deleteButton.className = 'delete';
                deleteButton.onclick = () => deleteTask(index); // Pamiętaj o zmianie tej linii, jeśli twoja logika wymaga innej implementacji
                taskElement.appendChild(deleteButton);
    
                todoList.appendChild(taskElement);
            });
        } else {
            drawTasks();
        }
    }

    function drawTasks() {
            todoList.innerHTML = ' ';
            tasks.forEach((task, index) => {
                const taskElement = document.createElement('li');
                taskElement.innerHTML = `<span>${task.content} <span class="task-date">(Termin: ${formatDate(task.deadline)})</span></span>`;
            
                const contentSpan = document.createElement('span');
                contentSpan.textContent = task.content;
                contentSpan.id = `content-${task.id}`;
                contentSpan.addEventListener('click', () => editTask(task.id));
        
                // Span dla daty zadania z unikalnym ID.
                const deadlineSpan = document.createElement('span');
                deadlineSpan.textContent = formatDate(task.deadline);
                deadlineSpan.id = `deadline-${task.id}`;
                deadlineSpan.addEventListener('click', () => editTask(task.id));
        
                taskElement.appendChild(contentSpan);
                taskElement.appendChild(deadlineSpan);
            // Przycisk edycji
            // const editButton = document.createElement('button');
            // editButton.textContent = 'Edytuj';
            // editButton.className = 'edit';
            // editButton.onclick = () => editTask(index);
            // taskElement.appendChild(editButton);
    
            // Przycisk usuwania
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Usuń';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => deleteTask(index);
            taskElement.appendChild(deleteButton);
    
            todoList.appendChild(taskElement);
        });
    }
    
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        drawTasks();
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString( options);
    }


    function editTask(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const task = tasks[taskIndex];
    
            // Utwórz element input dla treści zadania.
            const contentInput = document.createElement('input');
            contentInput.type = 'text';
            contentInput.value = task.content;
            contentInput.className = 'edit-input'; // Dodaj klasę CSS dla stylizacji
    
            // Utwórz element input dla daty zadania.
            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = task.deadline;
            dateInput.className = 'edit-input'; // Dodaj klasę CSS dla stylizacji
    
            // Znajdź elementy DOM dla treści i daty zadania.
            const contentSpan = document.querySelector(`#content-${task.id}`);
            const deadlineSpan = document.querySelector(`#deadline-${task.id}`);
    
            // Zastąp elementy DOM polami input.
            contentSpan.replaceWith(contentInput);
            deadlineSpan.replaceWith(dateInput);
    
            // Skupienie na polu treści.
            contentInput.focus();
    
            // Funkcja do zapisania zmian i przywrócenia widoku.
            const saveChanges = () => {
                const newContent = contentInput.value.trim();
                const newDeadline = dateInput.value;
                if (newContent && newDeadline) {
                    task.content = newContent;
                    task.deadline = newDeadline;
                    saveTasks();
                    drawTasks();
                }
            };
    
            // Dodanie obsługi zdarzeń do zapisania zmian po opuszczeniu pól input.
            contentInput.addEventListener('blur', saveChanges);
            dateInput.addEventListener('blur', saveChanges);
    
            // Opcjonalnie: Możesz chcieć zapisać zmiany po naciśnięciu klawisza Enter.
            contentInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    saveChanges();
                }
            });
            dateInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    saveChanges();
                }
            });
        }
    }


    addButton.addEventListener('click', addTask);
    searchBox.addEventListener('keyup', filterTasks);

    drawTasks();
});