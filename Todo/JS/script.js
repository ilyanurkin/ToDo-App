window.onload = function(){
    const toDoList = document.querySelector('.todo-Class');
    const setTask = document.querySelector('.input-task');
    const taskButton = document.querySelector('.input-button');
    const chekboxButton = document.querySelector('.check-task');
    let toDos = [];
    function loadFromMember(toDos) {
        for (let i = 0; i < localStorage.length; i++) {
                let container = localStorage.getItem(localStorage.key(i));
                let parsedContainer = JSON.parse(container);
                toDos.push(parsedContainer);
                
        }
        return toDos;
    }
    function addQuest(text){
        let todo = {
            
            text,
            id: `${Math.random()}`,
            status: false,
            
        };
        if(text == ''){
            alert("Вы ввели пустой Task");
        }
        else{
            toDos.push(todo);
            localStorage.setItem(`ToDoID${todo.id}`, JSON.stringify(todo));
        }
    }
    
    function deleteQuest(id){
        toDos.forEach(todo => {
            if(todo.id === id){
                todo.status = true;
                localStorage.removeItem(`ToDoID${todo.id}`);
            }
        });
    }
    
    function render(){
       let html = '';
        toDos.forEach(todo => {
            if(todo.status == true){
                return;
            }
                html += `
                        <div class="some-task"> 
                        ${todo.text} \n
                        <span class="date-inf">Добавлено: ${setDateOfAddingQuest()} </span>
                        <button class="delete-button" data-id="${todo.id}"> </button> 
                        </div>
                        `;
        })
        toDoList.innerHTML = html;
    }
    function setDateOfAddingQuest(){
        currentDate = new Date();
        console.log(currentDate);
        currentYear = currentDate.getFullYear();
        console.log(currentYear);
        currentMonth = currentDate.getMonth() + 1;
        currentDay = currentDate.getDate();
        currentHour = currentDate.getHours();
        currentMinutes = currentDate.getMinutes();
        return `0${currentDay}.0${currentMonth}.${currentYear} ${currentHour}: ${currentMinutes}`;
    }
    taskButton.addEventListener('click', () => {
        const taskText = setTask.value;
        addQuest(taskText);
        setDateOfAddingQuest();
        render();
        setTask.value=setTask.ariaPlaceholder;
        console.log(toDos);
    })
    toDoList.addEventListener('click', (event) => {
        if(event.target.tagName !== 'BUTTON'){
            return;
        }
        const id = event.target.dataset.id;
        deleteQuest(id);
        render();
    })
    loadFromMember(toDos);
    render();
};



