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

    creatingTask(){
      let submit = document.getElementById('create-task-form');
      submit.addEventListener('submit', (event) => {
        event.preventDefault();
        console.dir(event);
        let list = event.target.children[1].value;
        let description = event.target.children[3].value;
        let priority = event.target.children[5].value;
      })
    }

    // addingTaskToDb(list, description, priority) {
    //
    //
    //   let options = {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     },
    //     body: JSON.stringify({user_id: 9, description: description, priority: priority})
    //   };
    //   fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${}/tasks`)
    //
    // }

  }

})()
