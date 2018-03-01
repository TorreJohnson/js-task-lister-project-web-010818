/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1
  return class Task {
    constructor(description, priority, list) {
      this.id = ++id;
      this.description = description;
      this.priority = priority;

      if (list) {
        this.listId = list.id;
      }
    }

    displayAllTasks() {
      let options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      };
      fetch('https://flatiron-tasklistr.herokuapp.com/users', options)
        .then(res => res.json())
        .then(json => this.findTasksAssociatedWithLists(json[8].lists))
    }

    findTasksAssociatedWithLists(listArray) {
      listArray.forEach(list => {
        fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${list.id}/tasks`)
          .then(res => res.json())
          .then(json => this.displayTaskData(json, list))
      });
    }

    displayTaskData(taskArray, list) {
      if (Array.isArray(taskArray)) {
        taskArray.forEach(task => {
          let p = document.createElement('p');
          let p2 = document.createElement('p');
          let br = document.createElement('br');
          p.innerText = `Task: ${task.description}`;
          p2.innerText = `Priority: ${task.priority}`
          let ul = document.getElementById(`${list.id}`).childNodes[0];
          ul.appendChild(p);
          ul.appendChild(p2);
          ul.appendChild(br);
        })
      } else {
        let p = document.createElement('p');
        let p2 = document.createElement('p');
        let br = document.createElement('br');
        p.innerText = `Task: ${taskArray.description}`;
        p2.innerText = `Priority: ${taskArray.priority}`
        let ul = document.getElementById(`${list}`).childNodes[0];
        ul.appendChild(p);
        ul.appendChild(p2);
        ul.appendChild(br);
      }
    }

    creatingTask(){
      let submit = document.getElementById('create-task-form');
      submit.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(event.target[0][0].dataset.id);
        let list = event.target[0][0].dataset.id;
        let description = event.target.children[3].value;
        let priority = event.target.children[5].value;
        this.addTaskToDb(list, description, priority);
        document.getElementById('new-task-description').value = "";
        document.getElementById('new-task-priority').value = "";
      })
    }

    addTaskToDb(list, description, priority) {
      let options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({user_id: 9, description: description, priority: priority})
      };
      fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${list}/tasks`, options)
        .then(res => res.json())
        .then(json => this.displayTaskData(json, list))
    }
  }

})()
