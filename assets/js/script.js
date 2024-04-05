// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
var myModal = new bootstrap.Modal(document.getElementById('taskModal'));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let uniqueId = nextId;
    nextId++;
    return uniqueId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = task.name;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = task.description;

    const dueDate = document.createElement('p');
    dueDate.classList.add('card-text');
    dueDate.innerHTML = `<strong>Due Date:</strong> ${task.dueDate}`;

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(dueDate);

    card.appendChild(cardBody);

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$( function() {
    $( "#taskDueDate" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  } );