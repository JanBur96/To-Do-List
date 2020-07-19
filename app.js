// Declare variables
const timeEL = document.getElementById('time')
const addEL = document.getElementById('add-input');
const taskListEL = document.getElementById('task-list');
const addButtonEL = document.getElementById('add-button');
const trashIconEL = document.querySelectorAll('fa-trash-alt')
const iconEL = "far";
const unchecked = "fa-circle";
const checked = "fa-check-circle";
let itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : []

localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

const liCreator = (text) => {
  const newTask = document.createElement('li');
  taskListEL.appendChild(newTask)

  const newTaskCircle = document.createElement('i');
  newTaskCircle.classList.add('far');
  newTaskCircle.classList.add(unchecked);
  
  const newTaskText = document.createElement('p')
  newTaskText.textContent = text;
  
  const arrowUp = document.createElement('i')
  arrowUp.classList.add('fas')
  arrowUp.classList.add('fa-arrow-up')

  const arrowDown = document.createElement('i')
  arrowDown.classList.add('fas')
  arrowDown.classList.add('fa-arrow-down')

  const newTaskTrash = document.createElement('i');
  newTaskTrash.classList.add('far');
  newTaskTrash.classList.add('fa-trash-alt');

  newTask.appendChild(newTaskCircle)
  newTask.appendChild(newTaskText)
  newTask.appendChild(arrowUp)
  newTask.appendChild(arrowDown)
  newTask.appendChild(newTaskTrash)

}

data.forEach((item) => {
  liCreator(item)
})

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
  
  const newTaskText = document.createElement('p')
  newTaskText.textContent = toDo;
  
  const arrowUp = document.createElement('i')
  arrowUp.classList.add('fas')
  arrowUp.classList.add('fa-arrow-up')

  const arrowDown = document.createElement('i')
  arrowDown.classList.add('fas')
  arrowDown.classList.add('fa-arrow-down')

  const newTaskTrash = document.createElement('i');
  newTaskTrash.classList.add('far');
  newTaskTrash.classList.add('fa-trash-alt');

  newTask.appendChild(newTaskCircle)
  newTask.appendChild(newTaskText)
  newTask.appendChild(arrowUp)
  newTask.appendChild(arrowDown)
  newTask.appendChild(newTaskTrash)

  addEL.value = '';

  itemsArray.push(toDo)
  localStorage.setItem('items', JSON.stringify(itemsArray))

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
    
    const newTaskText = document.createElement('p');
    newTaskText.id = "toDoText";
    newTaskText.textContent = toDo;

    const arrowUp = document.createElement('i')
    arrowUp.classList.add('fas')
    arrowUp.classList.add('fa-arrow-up')
  
    const arrowDown = document.createElement('i')
    arrowDown.classList.add('fas')
    arrowDown.classList.add('fa-arrow-down')
    
    const newTaskTrash = document.createElement('i');
    newTaskTrash.classList.add('far');
    newTaskTrash.classList.add('fa-trash-alt');
  
    newTask.appendChild(newTaskCircle)
    newTask.appendChild(newTaskText)
    newTask.appendChild(arrowUp)
    newTask.appendChild(arrowDown)
    newTask.appendChild(newTaskTrash)
    
    addEL.value = '';

    itemsArray.push(toDo)
    localStorage.setItem('items', JSON.stringify(itemsArray))
  
  }
})

// Remove To-Do on click
taskListEL.addEventListener('click', (e) => {
  if(e.target.classList[1] == "fa-trash-alt" ) {
    let targetedText = e.target.parentNode.childNodes[1].childNodes[0].data

    let targetLocal = JSON.parse(localStorage.getItem('items'))


    e.target.parentElement.remove()
    
    for(let i = 0; i < data.length; i++) {
      if(targetedText == targetLocal[i]) {
        
        targetLocal.splice(i, 1)
        localStorage.clear()
        localStorage.setItem("items", JSON.stringify(targetLocal))
      } else {
        
      }
    }
  }
})


// Mark To-Do as completed
taskListEL.addEventListener('click', (e) => {
  if(e.target.classList[1] == "fa-circle" ) {
    e.target.classList.remove(unchecked)
    e.target.classList.add(checked)
    e.target.parentElement.childNodes[1].style.textDecorationLine = "line-through"
  }
  else if (e.target.classList[1] == "fa-check-circle") {
    e.target.classList.add(unchecked)
    e.target.classList.remove(checked)
    e.target.parentElement.childNodes[1].style.textDecorationLine = "none"
  }
})

// Get location and set weather
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=9f92587ff09c4bb2a257074cdceeb176`

    fetch(api)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // Get data from api
      const weatherInfo = data.data[0]
      console.log(weatherInfo)
      const icon = weatherInfo.weather.icon;
      const temp = weatherInfo.temp;
      
      // DOM elements
      document.getElementById('weather-icon-img').src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
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
  if(e.target.className === 'fas fa-arrow-down') moveDown(e.target.parentNode);
  else if(e.target.className === 'fas fa-arrow-up') moveUp(e.target.parentNode);
});
