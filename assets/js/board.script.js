let amount_subtasks = 0;
let subtsasks_done = 0;

async function init() {
    await getUserDataFromLocalStorage();
    await includeHTML();
    await loadUserTasks();
    navChangeColor();
    setAmounts();
    renderHtml();
}

function navChangeColor() {
    document.getElementById('nav-board').classList.add('link-active');
    document.getElementById('nav-board').onclick = null;
    document.getElementById('mobile-nav-board').classList.add('link-active');
    document.getElementById('mobile-nav-board').onclick = null;
}

function slideIn(container) {
    document.getElementById(container + '-container').classList.remove('d-none');
    document.getElementById(container).style.right = '16px';
    document.getElementById(container).style.animation = 'slide_in 0.3s ease-out';
}

function slideOut(container) {
    document.getElementById(container).style.animation = 'slide_out 0.3s ease-out';
    setTimeout(function () {
        document.getElementById(container + '-container').classList.add('d-none');
        document.getElementById(container).style.right = '-150%';
    }, 280);
}

function renderHtml() {
    clearTaskCardContainer();
    noTasksToDo();
    renderTaskCards();
    addSelection(selected);
}

function clearTaskCardContainer() {
    document.getElementById('div-tasks-to-do').innerHTML = '';
    document.getElementById('div-taks-in-progress').innerHTML = '';
    document.getElementById('div-tasks-await-feedback').innerHTML = '';
    document.getElementById('div-tasks-done').innerHTML = '';
}

function noTasksToDo() {
    if (tasksTodo == 0) document.getElementById('div-tasks-to-do').innerHTML = noTasksToDoHtml();
    if (tasksInProgress == 0) document.getElementById('div-taks-in-progress').innerHTML = noTasksToDoHtml();
    if (tasksAwaitFeedback == 0) document.getElementById('div-tasks-await-feedback').innerHTML = noTasksToDoHtml();
    if (tasksDone == 0) document.getElementById('div-tasks-done').innerHTML = noTasksToDoHtml();
}

function noTasksToDoHtml() {
    return '<div class="no-tasks">No tasks To do</div>';
}

function renderTaskCards() {
    userTasks.forEach(tasks => {
        if(tasks.task == 'todo') {document.getElementById('div-tasks-to-do').innerHTML += renderTaskCardHtml(tasks)};
    });
    
    
}

function renderAmountOfSubtasks(task){
    subtsasks_done = 0;
    task.subtasks.forEach((st) =>{
        if(st.done){
            subtsasks_done +=1;
        }
    });
    return `${subtsasks_done}/${task.subtasks.length} Subtasks`;
}

function renderTaskCardHtml(task) {
    return `
        <div class="task-card" onclick="slideIn('task-card-slide')">
            <div class="task-card-category">
                ${task.category}
            </div>
            <div class="task-card-headline">
                ${task.title}
            </div>
            <div class="task-card-content">
                ${task.description}
            </div>
            <div class="task-card-subtasks">
                <div class="task-card--subtasks-progressbar">bar</div>
                <div class="task-card-subtasks-amount">
                    ${renderAmountOfSubtasks(task)}
                </div>
                </div>
                <div class="task-card-footer">
                    <div class="task-card-footer-left">
                        <div class="task-card-footer-assigned">
                            SF
                        </div>
                        <div class="task-card-footer-assigned">
                            SF
                        </div>
                    </div>
                    <img src="assets/icons/prio_${task.prio}.png" class="task-card-footer-prio">
                </div>
            </div>`
}