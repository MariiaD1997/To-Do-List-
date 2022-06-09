// Declaring variables
const inputText = document.querySelector('#input-task');
const taskBtn = document.querySelector('#add-task-button');

let todoList = [];

const loadLocalStorage = () => {
    if (localStorage.getItem('tasks')) {
        todoList = JSON.parse(localStorage.getItem("tasks")) || [];
        renderList(todoList);
    }
}

 document.addEventListener('DOMContentLoaded', () => {
     loadLocalStorage();
 })


const renderList = (todoList) => {

    const list = document.querySelector('#task-list');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
console.log(todoList);
    todoList.forEach((item) => {
        const rendered = renderItem(item);
        list.appendChild(rendered);
    });
}

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

taskBtn.addEventListener('click', (e) => {

    if (inputText.value !== '') {
         e.preventDefault();

        let newTask = {}
        newTask.name = inputText.value;
        newTask.checked = false;
        if (inputText.value !== 0) {
            todoList.push(newTask);
            updateLocalStorage();
        }
console.log(todoList);
        renderList(todoList);

        //  clear input
        inputText.value = '';
    }
})


// make delete button work
/*const deleteButton = document.getElementsByClassName("delete-btn");
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
        const index = todoList.indexOf(e.target.parentElement);
        if (index !== -1) {
            todoList.splice(index, 1);
        }
        updateLocalStorage();
        renderList();
    }
)}*/

    /*todoList.splice(, 1);
    updateLocalStorage();
    renderList();*/
  //  this.parentNode.remove();


function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(todoList));
}

/*
//make event when check checkbox
const changeSpan = document.getElementsByTagNameNS('checkbox');
changeSpan.addEventListener('change', (e) => {
    const task = document.querySelector('.task');
    if (e.target.checked) {
        task.classList.add('crossed-out');
    } else {
        task.classList.remove('crossed-out');
    }
})
*/