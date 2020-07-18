// Declare variables
const timeEL = document.getElementById('time')
const addEL = document.getElementById('add-input');
const taskListEL = document.getElementById('task-list');
const addButtonEL = document.getElementById('add-button');
const trashIconEL = document.querySelectorAll('fa-trash-alt')
const unchecked = "fa-circle";
const checked = "fa-check-circle";


// Get the current time
function getTime () {
  const date = new Date()
  let hours;
  let minutes;
  let seconds;

  function getHours () {
    hours = date.getHours() < 10? '0' + date.getHours() : date.getHours();
  }

  function getMinutes () {
    minutes = date.getMinutes() < 10? '0' + date.getMinutes() : date.getMinutes();
  }
  
  function getSeconds () {
    seconds = date.getSeconds() < 10? '0' + date.getSeconds() : date.getSeconds();
  }

  getHours()
  getMinutes()
  getSeconds()

  const currentTime = hours + ':' + minutes + ':' + seconds;
  
  timeEL.textContent = currentTime;
}

getTime()
setInterval(getTime, 1000);

// Add To-Do on click
addButtonEL.addEventListener('click', () => {
  
  if(addEL.value != '') {
  const toDo = addEL.value;

  const newTask = document.createElement('li');
  taskListEL.appendChild(newTask)

  const newTaskCircle = document.createElement('i');
  newTaskCircle.classList.add('far');
  newTaskCircle.classList.add(unchecked);

  const span1 = document.createElement('span')
  span1.classList.add('up')

  const span2 = document.createElement('span')
  span2.classList.add('down')

  const newTaskText = document.createElement('p')
  newTaskText.textContent = toDo;

  const newTaskTrash = document.createElement('i');
  newTaskTrash.classList.add('far');
  newTaskTrash.classList.add('fa-trash-alt');

  newTask.appendChild(newTaskCircle)
  newTask.appendChild(newTaskText)
  newTask.appendChild(span1)
  newTask.appendChild(span2)
  newTask.appendChild(newTaskTrash)

  addEL.value = '';

  }
})

// Add To-Do when pressing enter
addEL.addEventListener('keyup', (e) => {

  if(e.keyCode == 13 && addEL.value != '') {
    const toDo = addEL.value;

    const newTask = document.createElement('li');
    taskListEL.appendChild(newTask)
  
    const newTaskCircle = document.createElement('i');
    newTaskCircle.classList.add('far');
    newTaskCircle.classList.add(unchecked);

    const span1 = document.createElement('span')
    span1.classList.add('up')
  
    const span2 = document.createElement('span')
    span2.classList.add('down')
  
    const newTaskText = document.createElement('p');
    newTaskText.id = "toDoText";
    newTaskText.textContent = toDo;
  
    const newTaskTrash = document.createElement('i');
    newTaskTrash.classList.add('far');
    newTaskTrash.classList.add('fa-trash-alt');
  
    newTask.appendChild(newTaskCircle)
    newTask.appendChild(newTaskText)
    newTask.appendChild(span1)
    newTask.appendChild(span2)
    newTask.appendChild(newTaskTrash)
  
    addEL.value = '';

  }
})

// Remove To-Do on click
taskListEL.addEventListener('click', (e) => {

  if(e.target.classList[1] == "fa-trash-alt" ) {
    e.target.parentElement.remove()
  }

})

// Mark To-Do as completed
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

// Get location and set weather
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b9da68c37f7038bc52e2ec30464f26cf`

    fetch(api)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      const temp = Math.round((data.main.temp - 273.15));
      const icon = data.weather[0].icon;
      console.log(icon)
      

      // DOM Elements

      document.getElementById('weather-icon-img').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const degreeEL = document.getElementById('temperature-degree')
      degreeEL.textContent = temp + ' C°';


    });
  });
};


// Move task up / down
function moveUp(element) {
  if(element.previousElementSibling)
    element.parentNode.insertBefore(element, element.previousElementSibling);
}
function moveDown(element) {
  if(element.nextElementSibling)
    element.parentNode.insertBefore(element.nextElementSibling, element);
}
document.querySelector('ul').addEventListener('click', function(e) {
  if(e.target.className === 'down') moveDown(e.target.parentNode);
  else if(e.target.className === 'up') moveUp(e.target.parentNode);
});
