const addEL = document.getElementById('add-input');
const taskListEL = document.getElementById('task-list');
const addButtonEL = document.getElementById('add-button');
const trashIconEL = document.querySelectorAll('fa-trash-alt')
const unchecked = "fa-circle";
const checked = "fa-check-circle";

addButtonEL.addEventListener('click', function () {
  
  if(addEL.value != '') {
  const toDo = addEL.value;

  const newTask = document.createElement('li');
  taskListEL.appendChild(newTask)

  const newTaskCircle = document.createElement('i');
  newTaskCircle.classList.add('far');
  newTaskCircle.classList.add(unchecked);

  const newTaskText = document.createElement('p')
  newTaskText.textContent = toDo;

  const newTaskTrash = document.createElement('i');
  newTaskTrash.classList.add('far');
  newTaskTrash.classList.add('fa-trash-alt');

  newTask.appendChild(newTaskCircle)
  newTask.appendChild(newTaskText)
  newTask.appendChild(newTaskTrash)

  addEL.value = '';
  }
})

addEL.addEventListener('keyup', (e) => {
  if(e.keyCode == 13 && addEL.value != '') {
    const toDo = addEL.value;

    const newTask = document.createElement('li');
    taskListEL.appendChild(newTask)
  
    const newTaskCircle = document.createElement('i');
    newTaskCircle.classList.add('far');
    newTaskCircle.classList.add('fa-circle');
  
    const newTaskText = document.createElement('p');
    newTaskText.id = "toDoText";
    newTaskText.textContent = toDo;
  
    const newTaskTrash = document.createElement('i');
    newTaskTrash.classList.add('far');
    newTaskTrash.classList.add('fa-trash-alt');
  
    newTask.appendChild(newTaskCircle)
    newTask.appendChild(newTaskText)
    newTask.appendChild(newTaskTrash)
  
    addEL.value = '';
  }
})

taskListEL.addEventListener('click', (e) => {

  if(e.target.classList[1] == "fa-trash-alt" ) {
    e.target.parentElement.remove()
  }

})

taskListEL.addEventListener('click', (e) => {

  if(e.target.classList[1] == "fa-circle" ) {
    e.target.classList.remove(unchecked)
    e.target.classList.add(checked)
    e.target.parentElement.childNodes[1].style.textDecorationLine = "line-through"
    
  } else if (e.target.classList[1] == "fa-check-circle") {
    e.target.classList.add(unchecked)
    e.target.classList.remove(checked)
    e.target.parentElement.childNodes[1].style.textDecorationLine = "none"
   
  }

})