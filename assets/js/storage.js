const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'UU4RB7BRPN2YSGRZ06XDWN8DMCNIQREQNQAJ6DYF';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };

    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
    });
}

async function getUserDataFromLocalStorage() {
    loggedInUser = JSON.parse(localStorage.getItem('user'));
}

function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(userTasks));

}

async function loadUserTasks() {
    userTasks = [];
    await loadTasksFromBackend();
    tasks.forEach(task => {
        if (task.autor == loggedInUser.id) {
            let fetchTasks = new Task;
            fetchTasks.taskId = task.taskId;
            fetchTasks.autor = loggedInUser.id;
            fetchTasks.title = task.title;
            fetchTasks.description = task.description;
            fetchTasks.assigned_to = task.assigned_to;
            fetchTasks.date = task.date;
            fetchTasks.prio = task.prio;
            fetchTasks.category = task.category;
            fetchTasks.subtasks = task.subtasks;
            fetchTasks.task = task.task;
            userTasks.push(fetchTasks);
        }
    });
    tasks = [];
}

async function saveTasksToBackend(taskToSave) {
    await loadTasksFromBackend();
    taskToSave.taskId = setTaskId();
    tasks.push(taskToSave);
    setItem('tasks', tasks);
    tasks = [];
}

async function loadTasksFromBackend() {
    tasks = JSON.parse(await getItem('tasks'));
}

function setTaskId() {
    if (tasks.length > 0) {
        return Number(tasks[tasks.length - 1].taskId) + 1;
    }
    else {
        return 1;
    }
}

async function saveChangesTaskChanges(taskIdFromChangedTask, taskPosition){
    await loadTasksFromBackend();
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].taskId == taskIdFromChangedTask){
            tasks.splice(tasks[i],1);
            tasks.push(taskPosition);
        }
        setItem('tasks', tasks);
    }
    tasks = [];
}

async function loadContactsFromBackend() {
    allContacts = JSON.parse(await getItem('contacts'));
}

async function saveContactsToBackend(contact) {
    await loadContactsFromBackend();
    contact.id = allContacts.length;
    allContacts.push(contact);
    setItem('contacts', allContacts);
    allContacts = [];
}

async function loadUsersContacts() {
    userContacts = [];
    await loadContactsFromBackend();

    allContacts.forEach(uc => {
        if (uc.assignedTo == loggedInUser.id) {
            let fetchContacts = new Contact;
            fetchContacts.id = uc.id;
            fetchContacts.firstName = uc.firstName
            fetchContacts.lastName = uc.lastName;
            fetchContacts.eMail = uc.eMail;
            fetchContacts.phone = uc.phone;
            fetchContacts.assignedTo = uc.assignedTo;
            userContacts.push(fetchContacts);
        }
    });
    allContacts = [];
}