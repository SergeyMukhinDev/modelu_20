import { appState } from "../app";
import { recoverTasks, arrayOfSpan, changeKan, saveMain } from "./js";
import { User } from "./User";
console.log(changeKan);

const displayTaskUser = document.querySelector('#displayTaskUser');
const inputCheckbox = document.querySelector('#inputCheckbox');
const displayUser = document.querySelector('#displayUser');
const registrationBtn = document.querySelector('#registrationBtn');
const delUserBtn = document.querySelector('#app-del-user');
const labelUserMenu = document.querySelector('#adminMenuLabel');
const tasksLi = document.querySelector('#adminMenuTasks');
const logoutLi = document.querySelector('#adminMenuLogout');
const adminAvatar = document.querySelector('#adminAvatar');
const divUlAdminMenu = document.getElementById('divUlAdminMenu');
let counter = 1;
export let usersArray = [];
let isAdmin;
let notFound = true;

displayTask (displayTaskUser,'users');
displayTask (displayUser,'users');

delUserBtn.addEventListener('click', () => {
    delUser ();
})

export function delUser () {

    if (document.querySelector('#inputCheckbox').checked === true) {
        usersArray = JSON.parse(localStorage.getItem('admins'));
        if (usersArray.length == 0) {
            return alert('Все пользователи удалены.');
        } else {
            let selectedIndex = displayTaskUser.selectedIndex;
            let user = displayTaskUser.options[selectedIndex].text;
            let user1 = usersArray.findIndex(item => item.login == user);
            usersArray.splice(user1, 1);
            localStorage.removeItem(user);
            localStorage.setItem('admins', JSON.stringify(usersArray));
            usersArray = [];
           
            }
        
    } else {
        usersArray = JSON.parse(localStorage.getItem('users'));
        if (usersArray.length == 0) {
            return alert('Все пользователи удалены.');
        } else { 
            let selectedIndex = displayTaskUser.selectedIndex;
            let user = displayTaskUser.options[selectedIndex].text;           
            let user1 = usersArray.findIndex(item => item.login == user);
            usersArray.splice(user1, 1);
            localStorage.removeItem(user);
            localStorage.setItem('users', JSON.stringify(usersArray))
            usersArray = [];
        }
        
    }
    displayTask (displayTaskUser,'admins');
    displayTask (displayTaskUser,'users');

}
export function displayTask (user, access) {
    while (user.firstChild) {
        user.removeChild(user.firstChild);
        }
    usersArray = JSON.parse(localStorage.getItem(access));
    if (usersArray.length) {
        for (let i = 0; i < usersArray.length; i++) {
    
    let option = document.createElement('option');
    option.innerHTML = usersArray[i].login;
    user.appendChild(option);
            }
    }
    usersArray = [];
}
inputCheckbox.addEventListener('click', () => {
       if (inputCheckbox.checked === true) {
        while (displayTaskUser.firstChild) {
            displayTaskUser.removeChild(displayTaskUser.firstChild);
        }
       
        displayTask (displayTaskUser, 'admins')
       }
    else {
        while (displayTaskUser.firstChild) {
        displayTaskUser.removeChild(displayTaskUser.firstChild);
        }
    
    displayTask (displayTaskUser, 'users')
    }
});  
displayUser.addEventListener('change', () => {
    let selectedIndex = displayUser.selectedIndex;
    let value = displayUser.options[selectedIndex].text;
    recoverTasks (value);
})

registrationBtn.addEventListener('click', () => {
if ((document.querySelector('#inputLoginRegistration').value === '') || (document.querySelector('#inputPasswordRegistration').value === '')) {
 return alert('Не заполнено одно из полей.')} else {
    let login = document.querySelector('#inputLoginRegistration').value;
    let password = document.querySelector('#inputPasswordRegistration').value;
    if (document.querySelector('#inputCheckboxAdmin').checked === true) {
        isAdmin = 'admins';
    } else {
        isAdmin = 'users';
    }
    checkUser (login, isAdmin);
if (notFound === false) {
    const newUser = new User(login, password, isAdmin);
    User.save(newUser);
    usersArray = [];
    document.querySelector('#inputLoginRegistration').value = '';
    document.querySelector('#inputPasswordRegistration').value = '';
    document.querySelector('#inputCheckboxAdmin').checked = false;
    alert(`Регистрация пользователя: ${login} прошла успешно.`);
    
    if (isAdmin === 'users') {
        displayTask (displayTaskUser, isAdmin);
        displayTask (displayUser, isAdmin);
    } else {
        displayTask (displayTaskUser, isAdmin);
        document.querySelector('#inputCheckbox').checked = true;
    }
} 
}
})

export function checkUser (login, key) {
    let tempArray = [];
    usersArray = [];
    tempArray = JSON.parse(localStorage.getItem('users'));
    usersArray = tempArray.concat(JSON.parse(localStorage.getItem('admins')))
 if (usersArray.length) {
     for (let i = 0; i < usersArray.length; i++) {
         console.log(login, usersArray[i].login, usersArray.length);
             if (login === usersArray[i].login) {
            usersArray = [];
            notFound = true;
             return alert('Пользователь с указаным именем уже существует!')
         } else {
             notFound = false;
         }
     }

 } else {
     alert('Создаем первого пользователя');
     notFound = false;
 }

}

adminAvatar.addEventListener('click', () => {
    
    if (counter === 1){
    document.querySelector('#arrow').innerHTML = '&#8743';
    counter = 2;
    divUlAdminMenu.style.display = 'flex';
    setTimeout(() => {
        divUlAdminMenu.style.display = 'none';
        counter = 1; 
        document.querySelector('#arrow').innerHTML = '&#8744;';
    }, 2000);
    
    } else {
        counter = 1;
        document.querySelector('#arrow').innerHTML = '&#8744;';
        divUlAdminMenu.style.display = 'none';
        
    }
})

labelUserMenu.innerHTML = `Здравствуйте ${appState.currentUser.login}`;

logoutLi.addEventListener('click', () => {

    if (changeKan) {
        let selectedIndex = displayUser.selectedIndex;
        let value = displayUser.options[selectedIndex].text;
        if (confirm(`Сохранить изменения пользователя ${value} ?`)) {
            
            saveMain(value);
            window.location.reload();
        } 
    } 
        if (confirm('Вы действительно хотите выйти?')) {
            console.log('exit');
            window.location.reload();
        } 
    
        divUlAdminMenu.style.display = 'none';
})

