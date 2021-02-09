const input = document.getElementById('input-field');
const addButton = document.getElementById('add');
const list = document.getElementById('list');
let LIST = [];
let id = 0;
const UNCHECK = "uncheck";
const CHECK = "check";
const CROSSEDLINE = "line-through"
const clear = document.getElementById('clear');





//add a todo item
const addToDo = (todo,id,done,trash) =>{
    //return if trash
    if (trash) {return};
    //check if todo is empty
    if(todo){
    const DONE =  done ? CHECK : UNCHECK;
    const CROSSED = done ? CROSSEDLINE : " ";
    const value = `
    <li>
        <i data-feather="check" class="icon ${DONE}" id=${id} job="complete"></i>
        <div class="text-wrap"><p class="text${CROSSED}">${todo}</p></div>
        <i data-feather="trash" class="icon remove" id=${id} job="delete"></i>
                           
    </li>       
    `
    const position = "beforeend";
    list.insertAdjacentHTML(position,value);
    feather.replace();
    }
}

//load data 
const loadData = (array) =>{
    array.forEach(element => {
        addToDo(element.name,element.id,element.done,element.trash);
        
    });
}

//get the list from local storage
const data = localStorage.getItem('TODO');
if(data){
    LIST = JSON.parse(data);
    loadData(LIST);
    id = LIST.length;   

}else{
    LIST = [];
    id = 0;
}


//complete a task
const completeTodo = function(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(CROSSEDLINE);
    LIST[element.id].done = LIST[element.id].done? false : true;
    
}

//remove a todo item
const removeTodo = function (element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
    
}


list.addEventListener("click", function(event){
    const button = event.target;
    if(button.attributes.job){
    const job = button.attributes.job.value;
    
    if(job == "complete"){
        completeTodo(button);
    }else if(job == "delete"){
        removeTodo(button);
    }

    localStorage.setItem('TODO',JSON.stringify(LIST));
}})



//click "add" button
addButton.onclick = function(item){
    item = input.value;
    if(item){
        addToDo(item,id,false,false);
        LIST.push(
            {
                name: item,
                id: id,
                done: false,
                trash: false
            }
        )
    localStorage.setItem('TODO',JSON.stringify(LIST));
    input.value = ''
    id++;

    }
}


document.addEventListener("keyup",function(event){
    if(event.code=='Enter'){
        let item = input.value;
        if(item){
        addToDo(item,id,false,false);
        LIST.push(
            {
                name: item,
                id: id,
                done: false,
                trash: false
            }
        )
        localStorage.setItem('TODO',JSON.stringify(LIST));
        input.value = ''
    id++;
    }
}})




//clear local storage

clear.onclick = function(){
    localStorage.clear();
    location.reload();

}