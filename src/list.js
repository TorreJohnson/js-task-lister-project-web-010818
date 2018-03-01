/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1;
  return class List {

    constructor(title) {
      this.title = title;
      this.id = ++id;
    }

    // submit button event listener
    createNewListEventListener() {
      document.getElementById('create-list-form').addEventListener('submit', (event) => {
        event.preventDefault();
        let submittedListName = event.target.children[1].value;
        this.addNewListToDatabase(submittedListName);
        document.getElementById('new-list-title').value = "";
      })
    }

    // adding a new list to the database
    // and add the list name to the task drop down
    addNewListToDatabase(title){
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
          this.createDivStructureForLists(json);
          this.createOptionForDropDown(json);
        });
    }

    // structure for creating the list divs and x (delete button)
    createDivStructureForLists(json) {
        let div = document.createElement('div');
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        let h2 = document.createElement('h2');
        let btn = this.createDeleteButton(json);
        div.id = json.id;
        h2.innerText = json.title;
        h2.appendChild(btn);
        li.appendChild(h2);
        ul.appendChild(li);
        div.appendChild(ul);
        document.getElementById('lists').appendChild(div);
    }

    createDeleteButton(json) {
      let btn = document.createElement('button');
      btn.dataset.id = json.id;
      btn.innerText = 'X';
      btn.classList.add('delete-button');
      btn.addEventListener('click', event => {
        this.deleteListItem(event.target);
      });
      return btn;
    }

    deleteListItem(e) {
      let options = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({user_id: 9})
      };
      fetch(`https://flatiron-tasklistr.herokuapp.com/lists/${e.dataset.id}`, options);
      let dropDowns = document.getElementById("parent-list").children;
      let innerText = e.parentElement.innerText;
      for(let i = 0; i < dropDowns.length; i++) {
        if (`${dropDowns[i].innerText}X` === innerText) {
          document.getElementById("parent-list").remove(i);
        }
      }
      let div = document.getElementById(`${e.dataset.id}`);
      let parent = div.parentElement;
      parent.removeChild(div);
    }

    createOptionForDropDown(json) {
      let parentList = document.getElementById("parent-list");
      let newOption = document.createElement("option");
      newOption.text = json.title;
      newOption.dataset.id = json.id;
      parentList.add(newOption);
    }

    // get an updated list of lists from the database
    // and then send that data to update the bottom div
    // and the drop down list in tasks
    updateCurrentLists(){
      fetch(`https://flatiron-tasklistr.herokuapp.com/users`)
      .then(res => res.json())
      .then(json => {
        this.showAllLists(json)
        this.populateList(json);
      })
    }

    // take in a collection of lists
    // and send them to #createDivStructureForLists to populate the page
    showAllLists(json) {
      json[8].lists.forEach(list => {
        this.createDivStructureForLists(list)
      })
    }

    // add all lists to the drop down menu in tasks
    populateList(json){
      json[8].lists.forEach(list => {
          var x = document.getElementById("parent-list");
          var option = document.createElement("option");
          option.text = list.title;
          option.dataset.id = list.id;
          x.add(option);
      })
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
