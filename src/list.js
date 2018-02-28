/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1
  return class List {

    constructor(title) {
      this.title = title;
      this.id = ++id;
    }

    createList() {
      let newListBtn = document.getElementById('create-list-form');
      newListBtn.addEventListener('submit', (event) => {
        event.preventDefault();
        let taskForm = event.target.children[1];
        this.addedList(taskForm.value);
        let id = document.getElementById('new-list-title');
        id.value = "";

      })
    }

    createdList(taskForm) {
        let div = document.createElement('div');
        div.id = taskForm.id;
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        let h2 = document.createElement('h2');
        let btn = document.createElement('button');
        btn.dataset.id = taskForm.id
        btn.innerText = 'X';
        btn.classList.add('delete-button');
        btn.addEventListener('click', event => {
          this.deleteListItem(event.target.dataset.id);
        });
        h2.innerText = taskForm.title;
        h2.appendChild(btn);
        li.appendChild(h2);
        ul.appendChild(li);
        div.appendChild(ul);

        let lists = document.getElementById('lists');
        lists.appendChild(div);
    }

    addedList(title){
      let options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({user_id: 9, title: title})
      };

      fetch(`https://flatiron-tasklistr.herokuapp.com/lists`, options)
      .then(res => res.json())
      .then(json => {

        this.createdList(json);
        var x = document.getElementById("parent-list");
        var option = document.createElement("option");
        option.text = title;
        option.dataset.id = json.id;
        x.add(option);
      });

    }

    getAllList(){
      fetch(`https://flatiron-tasklistr.herokuapp.com/users`)
      .then(res => res.json())
      .then(json => {
        this.showAllLists(json)
        this.populateList(json);
      })
    }

    showAllLists(colOfLists) {
      colOfLists[8].lists.forEach(list => {
        this.createdList(list)
      })
    }

    populateList(json){
      json[8].lists.forEach(list => {
          var x = document.getElementById("parent-list");
          var option = document.createElement("option");
          option.text = list.title;
          x.add(option);
      })
    }

    deleteListItem(id) {

      let options = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({user_id: 9})
      };

      fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${id}`, options);
      let div = document.getElementById(`${id}`);
      let parent = div.parentElement;
      parent.removeChild(div);
      // var x = document.getElementById("parent-list");
      // x.remove()
    }


    // toggleVisibilityOfTaskForm() {
    //   var x = document.getElementById("create-task-form");
    //   if (x.style.display === "none") {
    //     x.style.display = "block";
    //   } else {
    //     x.style.display = "none";
    //   }
    // }

  }

})()
