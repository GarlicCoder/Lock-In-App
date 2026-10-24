// declare variables
const inputBox = document.getElementById("input-box");
const todoLists = document.getElementById("todo-lists");
const completedCounter = document.getElementById("completed-counter");
const totalCounter = document.getElementById("total-counter");
const todoListContainer = document.getElementById("lists-container");
const nullList = document.getElementById("null-list");


// @ts-check

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    try {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
        tasks = [];
    }
    updateTasksList();
    updateStats();
});


const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text,completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
}


const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if (tasks.length && completedTasks === totalTasks) {
        blastConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.replaceChildren();

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        const taskItem = document.createElement("div");
        taskItem.className = "taskItem";

        const taskContent = document.createElement("div");
        taskContent.className = `task ${task.completed ? "completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskComplete(index));

        const text = document.createElement("p");
        text.textContent = task.text;

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            startInlineEdit(task, index, text);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(index));

        taskContent.append(checkbox, text);
        buttons.append(editButton, deleteButton);
        taskItem.append(taskContent, buttons);
        listItem.appendChild(taskItem);
        taskList.appendChild(listItem);
    });
};

const startInlineEdit = (task, index, textElement) => {
    const originalText = task.text;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "task-edit-input";
    input.value = originalText;

    textElement.replaceWith(input);
    input.focus();
    input.select();

    let finished = false;

    const finish = (save) => {
        if (finished) return;
        finished = true;

        if (save) {
            task.text = input.value.trim() || originalText;
            saveTasks();
        }

        updateTasksList();
        updateStats();
    };

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") finish(true);
        if (event.key === "Escape") finish(false);
    });

    input.addEventListener("blur", () => finish(true));
};


document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault()
    addTask()
});

const blastConfetti = () => {
    function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
confetti({
  angle: randomInRange(55, 125),
  spread: randomInRange(50, 70),
  particleCount: randomInRange(50, 100),
  origin: { y: .6 }
});
}



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
    volumeSlider.style.display = "block";
  });

  // increase and decrease volume
  const volumeSlider = document.getElementById('volumeSlider');
 
  // Update audio volume when slider changes
  volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
  });
 
  // Optional: Sync slider with audio volume if volume changes programmatically
  audioPlayer.addEventListener('volumechange', () => {
    volumeSlider.value = audioPlayer.volume;
  });

  // timer functionality 
 const bells = new Audio("audio/bell.mp3");
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
    bells.play();

        clearInterval(myInterval);
      }
    };
    myInterval = setInterval(updateSeconds, 1000);
    timerStart.innerHTML= "Timer has begun!";
    timerStart.disabled = true;

  } else {
    alert('Session has already started!');
  }
 };



 timerStart.addEventListener("click", appTimer);


/* Clock Widget */
setInterval(showTime, 1000);
function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  am_pm = "AM";

  // setting time for 12 hrs format
  if (hour >= 12) {
    if (hour > 12) hour -= 12;
    am_pm = "PM";
  } else if (hour === 0) {
    hr = 12;
    am_pm = "AM"
  }
  hour = 
  hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec <10 ? "0" + sec : sec;

  let currentTime = 
  hour + 
  ":" + 
  min + 
  ":" +
  sec + 
  " " +
  am_pm;

  //displaying the time
  document.getElementById('clock').innerHTML = currentTime;
}

showTime();

