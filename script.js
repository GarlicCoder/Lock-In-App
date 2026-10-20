// declare variables
const inputBox = document.getElementById("input-box");
const todoLists = document.getElementById("todo-lists");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const todoListContainer = document.getElementById("todo-lists-container");
const nullList = document.getElementById("null-list");

// updating the completed & uncompleted counters
function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed-task").length;
  const uncompletedTasks =
    document.querySelectorAll("li:not(.completed-task)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
  if (uncompletedTasks === 0 && completedTasks === 0) {
    nullList.style.display = "block";    
  }
  else if (uncompletedTasks === 0 && completedTasks >= 1) {
    nullList.style.display = "block";
  nullList.innerText = "All tasks completed! Great job :D";    
  }
  else {
        nullList.style.display = "none";    
  }
  console.log(
    "completed: " + completedTasks + "\n" + "uncompleted: " + uncompletedTasks,
  );
}

// add task function
function addTask() {
  const task = inputBox.value.trim();

  // if task is null
  if (!task) {
    alert("Oops, did you forget to add a task?");
    console.log("no task has been added");
    return;
  }

  // creating the task as a new list element
  const li = document.createElement("li");
  li.innerHTML = `
    <label>
    <input type="checkbox">
    <span>${task}</span>
    </label>
    <div class="task-buttons">
    <span class="edit-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--pink)"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></span>
    <span class="delete-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--pink)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></span></div>
    `;

  todoLists.appendChild(li);

  // clears the input
  inputBox.value = "";

  // declare variables
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  // mark task as completed
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed-task", checkbox.checked);
    updateCounters();
  });

  // edit button
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed-task");
      checkbox.checked = false;
      updateCounters();
    }
  });

  // delete function
  deleteBtn.addEventListener("click", function () {
    if (
      confirm(
        "Warning! You're about to delete this task. Are you sure you'd like to proceed?",
      )
    ) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
};

// add task when enter key is used
inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
}
);


// play background noise
// const audioPlayer = document.getElementById('audioPlayer');
// const playPauseButton = document.getElementById('playPauseButton');
// const audioInput = document.getElementById('noise');



//   playPauseButton.addEventListener('click', () => {
//    if (audioPlayer.paused) {
//     audioPlayer.play();  
//     playPauseButton.textContent = 'Pause White Noise';  
//    } else {
//     audioPlayer.pause();  
//     playPauseButton.textContent = 'Play White Noise';  
//    }
//   });

function submittedAudio() {
  link = document.getElementById('audio-select').value;
  document.getElementById('audio-src').src = link;
  document.getElementById('audioPlayer').load();
};
const audioPlayer = document.getElementById('audioPlayer')
const audioButton = document.getElementById('audio-button')


audioButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      audioButton.textContent = 'Play';
    } else {
      audioPlayer.pause();
      audioButton.textContent = 'Play';
    }
  });


  // timer functionality 
 const bells = new Audio("/audio/bell.mp3");
 const timerStart = document.getElementById('timerStart');
 const session = document.querySelector('.minutes');
 let myInterval;
 let state = true;

 const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state) {
    state = false;
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondsDiv = document.querySelector('.seconds');

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondsDiv.textContent = "0" + secondsLeft;
      } else {
        secondsDiv.textContent = secondsLeft;
      }

      minuteDiv.textContent = `${minutesLeft}`;
      
      if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
      }
    };
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started!');
  }
 };

 timerStart.addEventListener("click", appTimer);


  /*
  function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-lists li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.classList.contains('completed');
      tasks.push({text: taskText, completed: isCompleted});
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

*/