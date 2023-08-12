//INITIAL REFERENCES

const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTaks, editTasks, tasks;
let updateNote = "";
let count;

//FUNCTION ON WINDOW LOAD
window.onload = () => {
    updateNote ="";
    count =Object.keys(localStorage).length;
    displayTasks();
}

//FUNCTION TO DISPLAY THE TASKS
const displayTasks = () => {
    if(Object.keys(localStorage).length>0){
        tasksDiv.style.display ="inline-block";
    } else{
        tasksDiv.style.display ="none";
    }

    //CLEAR THE TASKS
    tasksDiv.innerHTML="";

    //FECH ALL THE KEYS IN LOCAL STORAGE
    let tasks = Object.keys(localStorage);
    tasks = tasks.sort();

    for (let key of tasks){
        let classValue = "";

        //GET ALL VALUES
        let value =localStorage.getItem(key);
        let tasksInnerDiv = documet.createElement ("div");
        tasksInnerDiv.classList.add("task");
        tasksInnerDiv.setAtribute("id", key);
        tasksInnerDiv.innerHTML=`<span id="taskname">${key.split("_")[1]}</span>`;

        //LOCALSTORAGE WOULD STORE BOOLEAN AS STRINGS WE PARSE IT UYO BOOLEAN BACK
        let editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML =`<ion-icon name="create-outline"></ion-icon>`;
        if(!JSON.parse(value)) {
            editButton.style.visibility= "visible";
        }else {
            editButton.style.visibility="hidden";
            tasksInnerDiv.classList.add("completed");
        }
        tasksInnerDiv.appendChild(editButton);
        tasksInnerDiv.innerHTML +=`<button class"delete"<ion-icon name="close-outline"></ion-icon><ion-icon name="trash-outline"></ion-icon></button>`;
        tasksDiv.appendChild(tasksInnerDiv);
    }

    //TASKS COMPLETED
    tasks =document.querySelector(".task");
    tasks.forEach((element, index) =>{
        element.onclick = () => {
            //LOCAL STORAGE UPDATE
            if(element.classList.contains("completed")){
                updateStorage(element.id.split("_")[0], element.innerHTML, false);
            }else{
                updateStorage(element.id.split("_")[0], element.innerHTML, true);       
            }
        }
    });

    //EDIT TASKS
    editTasks = document.getElementsByClassName("edit");
    Array.from(editTasks).forEach((element, index) => {
        //STOP PROGRAMATION TO OUTER ELEMENT
        editTasks.stopProgramation();
        displayButtons(true);
        let  parent= element.parentElement;
        newTaskInput.value = parent.querySelector("tasksname").innerHTML;
        updateNote = parent.id;
        parent.remove();
    });
};