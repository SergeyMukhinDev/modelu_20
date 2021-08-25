
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import administratorMenu from "./templates/administratorMenu.html";
import userMenu from "./templates/userMenu.html";
import noAccessTemplate from "./templates/noAccess.html";
import { LevelAccess, User } from "./models/User";
import { generateTestUser } from "./utils";
import { State  } from "./state";
import { authUser } from "./services/auth";
async function loadTask() {
  let {} = await import('./models/js');
  };
async function adminMenu() {
  let {} = await import('./models/adminMenu');
  };
async function userMenuJS() {
  let {} = await import('./models/userMenu');
  };

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");

generateTestUser(User);
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
 
  if (authUser(login, password)) {
    if (isAdmin(login)) {
    document.querySelector("#content").innerHTML = taskFieldTemplate;
    loadTask();
    adminMenu();
    document.getElementById('navbar').innerHTML = administratorMenu;
    } else {
      document.getElementById('navbar').innerHTML = userMenu;
    document.querySelector("#content").innerHTML = taskFieldTemplate;
    loadTask();  
    userMenuJS(); 
    }

    } else {
    document.querySelector("#content").innerHTML = noAccessTemplate;
  }

});

function isAdmin (user) {
  let tempArray = [];
  let usersArray = [];
  tempArray = JSON.parse(localStorage.getItem('users'));
  usersArray = tempArray.concat(JSON.parse(localStorage.getItem('admins')));
  let user1 = usersArray.findIndex(item => item.login == user);
  if (usersArray[user1].storageKey === 'admins') {
    return true;
  } else {return false;}
 
}
