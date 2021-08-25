import { appState } from "../app";
import { recoverTasks, arrayOfSpan, changeKan, saveMain } from "./js";
import { User } from "./User";
const labelUserMenu = document.querySelector('#userMenuLabel');
const tasksLi = document.querySelector('#userMenuTasks');
const logoutLi = document.querySelector('#userMenuLogout');
const userAvatar = document.querySelector('#userAvatar');
const divUlUserMenu = document.getElementById('divUlUserMenu');
let counter = 1;
userAvatar.addEventListener('click', () => {
    
    if (counter === 1){
    document.querySelector('#arrow').innerHTML = '&#8743';
    counter = 2;
    divUlUserMenu.style.display = 'flex';
    setTimeout(() => {
        divUlUserMenu.style.display = 'none';
        counter = 1; 
        document.querySelector('#arrow').innerHTML = '&#8744;';
    }, 2000);
    } else {
        counter = 1;
        document.querySelector('#arrow').innerHTML = '&#8744;';
        divUlUserMenu.style.display = 'none';
    }
})
tasksLi.addEventListener('click', () => {
    recoverTasks (appState.currentUser.login);
    divUlUserMenu.style.display = 'none';
    document.querySelector('#arrow').innerHTML = '&#8744;';
    counter = 1;
})

labelUserMenu.innerHTML = `Здравствуйте ${appState.currentUser.login}`;
logoutLi.addEventListener('click', () => {
    if (changeKan) {
        if (confirm(`Сохранить изменения?`)) {
            
            saveMain(appState.currentUser.login);
            window.location.reload();
        } 
    } 
        if (confirm('Вы действительно хотите выйти?')) {
            window.location.reload();
        } 
    
        divUlUserMenu.style.display = 'none';
   
})

