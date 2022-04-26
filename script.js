const addTaskButton = document.getElementById('addButton');
const clearTaskButton = document.getElementById('clearButton');
const inputTask = document.getElementById('inputValue');
const todoWrapper = document.querySelector('.todo-wrapper')

let tasks;
!localStorage.tasks ? tasks = []: tasks = JSON.parse(localStorage.getItem('tasks'));

let checkedTask = [];

function objTask(description){
    this.description = description;
    this.completed = false;
}

function updateStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function TemplateHTML(){
    todoWrapper.innerHTML = '';
    if(tasks.length > 0){
        tasks.forEach((element, index) => {
            todoWrapper.innerHTML += createTemplate(element,index)
        });
        checkedTask = document.querySelectorAll('.task-wrapper');
    }
}

TemplateHTML();

function createTemplate(element,index){
    return `  <div class="task-wrapper ${element.completed ? 'checked' : ''}">
                <div class="description-wrapper ${element.completed ? 'checked' : ''}">
                ${element.description}
                </div>
                <div class="deleteButton-wrapper">
                    <button type="button" id="deleteButton"
                    onclick = deleteTask(${index})>
                        Delete
                    </button>
                </div>
                <div class="checkboxButton-wrapper">
                    <input onclick = checkFunc(${index}) type="checkbox" id="checkboxButton" ${element.completed ? 'checked' : ''}>
                </div>
            </div>`
}

function checkFunc(index){
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
       checkedTask[index].classList.add('checked');
    }
    else {
        checkedTask[index].classList.remove('checked');
    }
    updateStorage();
    TemplateHTML();
}

function deleteTask(index){
    tasks.splice(index,1);
    updateStorage();
    TemplateHTML()
}

addTaskButton.addEventListener('click', () => {
    if(inputTask.value != ''){
        tasks.push(new objTask(inputTask.value));
        updateStorage();
        TemplateHTML();
        inputTask.value = '';
    }
})

clearTaskButton.addEventListener('click', () => {
    tasks = [];
    updateStorage();
    TemplateHTML();
})
