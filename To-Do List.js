// Declaring variables
const inputText = document.querySelector('#input-task');
const taskBtn = document.querySelector('#add-task-button');

//create array
let todoList = [];

//retrieve task list as an array
const loadLocalStorage = () => {
    if (localStorage.getItem('tasks')) {
        todoList = JSON.parse(localStorage.getItem("tasks")) || [];
        renderList(todoList);
    }
}

//make event which load js after html without waiting for css, images etc
 document.addEventListener('DOMContentLoaded', () => {
     loadLocalStorage();
 })

//create function which would show us tasks
const renderList = (todoList) => {

    //prevent dublicates
    const list = document.querySelector('#task-list');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    //make foreach loop to add new tasks into list
    todoList.forEach((item) => {
        const rendered = renderItem(item);
        list.appendChild(rendered);
    });
}

//create function to make model of new task
const renderItem = (item) => {
    const makeLi = document.createElement('li');

    //make checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('class', 'check');
    checkbox.checked = item.checked;
    checkbox.addEventListener('change', (e) => {
            item.checked = checkbox.checked;
        updateLocalStorage();
    })

    //move input into list
    const mySpan = document.createElement('span');
    mySpan.setAttribute('class', 'task');
    mySpan.innerHTML = item.name;
    makeLi.append(checkbox, mySpan);

    //move delete button into list
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete-btn');
    deleteButton.addEventListener('click', (e) => {
        const index = todoList.indexOf(item);
        if (index !== -1) {
            todoList.splice(index, 1);
        }
        updateLocalStorage();
        renderList(todoList);
    })
    makeLi.appendChild(deleteButton);

    return makeLi;
}

//create button to add new tasks
taskBtn.addEventListener('click', (e) => {

    if (inputText.value !== '') {
         e.preventDefault();

        //create object and its properties
        let newTask = {}
        newTask.name = inputText.value;
        newTask.checked = false;

        //add object into array
        if (inputText.value !== 0) {
            todoList.push(newTask);
            updateLocalStorage();
        }

        renderList(todoList);

        //  clear input
        inputText.value = '';
    }
})

//mutate array into strings
const updateLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(todoList));
}

