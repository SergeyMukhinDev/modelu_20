import { appState } from "../app";
const ulReady = document.getElementById('ulReady');
const ulInProgress = document.querySelector('#ulInProgress')
const ulFinished = document.querySelector('#ulFinished');
const divBacklog = document.getElementById('memo-kanBan-backlog');
const divReady = document.querySelector('#memo-kanBan-ready');
const divInProgress = document.querySelector('#memo-kanBan-inProgress');
const divFinished = document.querySelector('#memo-kanBan-finished');
const backlogBtn = document.querySelector('#btn-backlog');
const readyBtn = document.getElementById('btn-ready');
const inProgressBtn = document.querySelector('#btn-inProgress');
const finishedBtn = document.querySelector('#btn-finished');
const svgIco = document.querySelectorAll('.svg');
const sectionFinished = document.querySelector('#app-kanBan-finished');
const activeTasks = document.getElementById('activTasks');
const finishedTasks = document.getElementById('finishedTasks');
const nameAndDate = document.getElementById('nameAndDate');
export let changeKan = false;

let childrebacklog = document.getElementById('memo-kanBan-backlog').children;
export let arrayOfSpan = [];
let arrayHTMLCollection = [];
let input;
let tempElementId;
let svgAlarm = '<svg class="svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';


counterTask();
checkDisableBtn();

divBacklog.addEventListener('click', (e) => {
  removeTask (e);
  counterTask();
})

export function removeTask (e) {
  if (e.target.className.animVal === 'svg') {
    if (confirm('Вы действительно хотите удалить?')){
      let parentRemovedElement = document.getElementById(e.target.parentNode.id);
      parentRemovedElement.parentNode.removeChild(parentRemovedElement);
      checkDisableBtn();
      } 
  }
}


//////////////////////////Проверка активаности кнопок/////////////////////////////
export function checkDisableBtn() {
  if (childrebacklog.length === 0) {
    readyBtn.setAttribute('disabled', 'disabled');
  } else {readyBtn.removeAttribute('disabled');}
  if (divReady.children.length === 0) {
    inProgressBtn.setAttribute('disabled', 'disabled');
  } else {inProgressBtn.removeAttribute('disabled');}
  if (divInProgress.children.length === 0) {
    finishedBtn.setAttribute('disabled', 'disabled');
  } else {finishedBtn.removeAttribute('disabled');}
}

inProgressBtn.addEventListener('click', () => {
 editAndAddElements (inProgressBtn, 'ulInProgress', 'memo-kanBan-ready');
})
readyBtn.addEventListener('click', () => {
  editAndAddElements (readyBtn, 'ulReady', 'memo-kanBan-backlog');
 })
finishedBtn.addEventListener('click', () => {
  editAndAddElements (finishedBtn, 'ulFinished', 'memo-kanBan-inProgress');
})

//////////////////функция редактирования и добавления элементов////////////////
export function editAndAddElements (button, ul1, memo) {
if (button.innerHTML === 'Submit') {
  document.getElementById(tempElementId).innerHTML = `${input.value}  ${svgAlarm}`;
  document.getElementById(tempElementId).style.display = 'flex';
  document.querySelector('#idInput').remove();
  button.innerHTML = '+ Add card';
  checkDisableBtn();
    } else {
    let ul = document.getElementById(ul1);
    arrayHTMLCollection = Array.from(document.getElementById(memo).children);
    ul.innerHTML = '';
    for (let i = 0; i < arrayHTMLCollection.length; i++) {
      let li = document.createElement('li');
      li.innerHTML = arrayHTMLCollection[i].innerHTML;
      li.id = arrayHTMLCollection[i].id;
      li.className = arrayHTMLCollection[i].className;
      ul.appendChild(li);
    }
    checkDisableBtn();
    document.getElementById(ul1).style.display = 'flex';
  }
  
    counterTask();
    arrayHTMLCollection = [];
}


backlogBtn.addEventListener('click', addTask(backlogBtn));

export function recoverTasks (user) {
  clearElements ();
  if (localStorage.getItem(user)) {
    arrayHTMLCollection = JSON.parse(localStorage.getItem(user));
      for (let i = 0; i < arrayHTMLCollection.length; i++) {
      console.log(arrayHTMLCollection[i][1], i );
      let span = document.createElement('span')
      span.className = arrayHTMLCollection[i][1].class;   
      span.id = arrayHTMLCollection[i][1].id;
      span.innerHTML = arrayHTMLCollection[i][1].innerHTML;
      document.getElementById(arrayHTMLCollection[i][1].parentID).appendChild(span);
      counterTask();
    }        
  }
  checkDisableBtn();
}

export function addTask(button) {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (button.innerHTML === '+ Add card') {
      input = document.createElement('input');
      input.placeholder = 'Введите таск';
      const element = document.getElementById(event.target.id);
      input.className = 'draggable';
      input.id = 'idInput';
      input.value = '';
      element.previousElementSibling.appendChild(input);
      button.innerHTML = 'Submit';
      input.style.display = 'flex';

    } else {
      let stringInInnerHtml = `${input.value} ${svgAlarm}`;
      let idValue = Math.floor(Math.random() * (500 - 1)) + 1;
      let span = document.createElement('span');
      const elem = document.getElementById(event.target.id);
      span.id = `${idValue}`;
      span.className = 'draggable';
      span.innerHTML = stringInInnerHtml;
      elem.previousElementSibling.appendChild(span);
      document.querySelector('#idInput').remove();
      counterTask();
      button.innerHTML = '+ Add card';
      readyBtn.removeAttribute('disabled');
      childrebacklog = document.getElementById('memo-kanBan-backlog').children;

    }
  })
}

export function counterTask() {
  let date = new Date ();
  let ready = document.getElementById('memo-kanBan-ready').children.length;
  let inProgress = document.getElementById('memo-kanBan-inProgress').children.length;
  document.getElementById('h3-backlog').innerHTML = `Backlog ${document.getElementById('memo-kanBan-backlog').children.length}`;
  document.getElementById('h3-ready').innerHTML = `Ready ${ready}`;
  document.getElementById('h3-inProgress').innerHTML = `In Progress ${inProgress}`;
  document.getElementById('h3-finished').innerHTML = `Finished ${document.getElementById('memo-kanBan-finished').children.length}`;
  activeTasks.innerHTML = `Active tasks: ${ready + inProgress}`;
  finishedTasks.innerHTML = `Finished tasks: ${document.getElementById('memo-kanBan-finished').children.length}`;
  nameAndDate.innerHTML = `Kanban board by ${appState.currentUser.login}, ${date.getFullYear()}`;
}

ulReady.addEventListener('click', (e) => {
  ulReady.style.display = 'none';
  let span = document.createElement('span');
  span.id = e.target.id;
  span.className = e.target.className;
  span.innerHTML = e.target.innerHTML;
  divReady.appendChild(span);
  document.getElementById(e.target.id).remove();
  counterTask();
  checkDisableBtn();
  inProgressBtn.removeAttribute('disabled');
  let ul = document.getElementById(ulReady.id);
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
}
})

ulInProgress.addEventListener('click', (e) => {
  ulInProgress.style.display = 'none';
  let span = document.createElement('span');
  span.id = e.target.id;
  span.className = e.target.className;
  span.innerHTML = e.target.innerHTML;
  divInProgress.appendChild(span);
  document.getElementById(e.target.id).remove();
  counterTask();
  checkDisableBtn();
  finishedBtn.removeAttribute('disabled');
  let ul = document.getElementById(ulInProgress.id);
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
}
})
ulFinished.addEventListener('click', (e) => {
  ulFinished.style.display = 'none';
  document.getElementById(e.target.id).remove();
  let span = document.createElement('span');
  span.id = e.target.id;
  span.className = e.target.className;
  span.innerHTML = e.target.innerHTML;
  divFinished.appendChild(span);
  counterTask();
  checkDisableBtn();
  let ul = document.getElementById(ulFinished.id);
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
}
})

export function saveMain (login) {
  arrayOfSpan = [];
  arrayHTMLCollection = [];
  arrayHTMLCollection = Array.from(childrebacklog);
  for (let i = 0; i < childrebacklog.length; i++) {
     arrayOfSpan.push (
        [`${login}`, {
       'class': arrayHTMLCollection[i].className,
       'id': arrayHTMLCollection[i].id,
       'innerHTML': arrayHTMLCollection[i].innerHTML,
       'parentID': arrayHTMLCollection[i].parentElement.id
       }])
    }
  arrayHTMLCollection = [];
  arrayHTMLCollection = Array.from(divReady.children);
  for (let i = 0; i < divReady.children.length; i++) {
    arrayOfSpan.push (
      [`${login}`, {
      'class': arrayHTMLCollection[i].className,
      'id': arrayHTMLCollection[i].id,
      'innerHTML': arrayHTMLCollection[i].innerHTML,
      'parentID': arrayHTMLCollection[i].parentElement.id
    }])
  }
  arrayHTMLCollection = [];
  arrayHTMLCollection = Array.from(divInProgress.children);
  for (let i = 0; i < divInProgress.children.length; i++) {
    arrayOfSpan.push (
      [`${login}`, {
      'class': arrayHTMLCollection[i].className,
      'id': arrayHTMLCollection[i].id,
      'innerHTML': arrayHTMLCollection[i].innerHTML,
      'parentID': arrayHTMLCollection[i].parentElement.id
    }])
  }
  arrayHTMLCollection = [];
  arrayHTMLCollection = Array.from(divFinished.children);
      for (let i = 0; i < divFinished.children.length; i++) {
        arrayOfSpan.push (
          [`${login}`, {
          'class': arrayHTMLCollection[i].className,
          'id': arrayHTMLCollection[i].id,
          'innerHTML': arrayHTMLCollection[i].innerHTML,
          'parentID': arrayHTMLCollection[i].parentElement.id
        }])
      }
      arrayHTMLCollection = []; 
    if (arrayOfSpan.length > 0) {
      localStorage.removeItem(`${login}`);
      localStorage.setItem(login, JSON.stringify(arrayOfSpan));
      arrayHTMLCollection = []; 
      arrayOfSpan = [];
 
} else {
  localStorage.removeItem(`${login}`);
}

}
divInProgress.addEventListener('click', (e) => {
  editInput (e, inProgressBtn);
  removeTask (e);
    });
divFinished.addEventListener('click', (e) => {
  editInput (e, finishedBtn);
  removeTask (e);
      });
divReady.addEventListener('click', (e) => {
  editInput (e, readyBtn);
  removeTask (e);
      });

export function editInput (e, button) {
  if (e.target.className === 'draggable') {
    e.preventDefault();
      input = document.createElement('input');
      const element = document.getElementById(e.target.id);
     tempElementId = e.target.id;
      input.className = 'draggable1';
      input.id = 'idInput';
      let str = e.target.innerHTML;
      let reverse = str.split('').reverse().join('');
      reverse = reverse.slice(reverse.lastIndexOf('<'));
      str = reverse.split('').reverse().join('');
      str = str.slice(0, -1);
      str = str.replace(/\s+/g, '');
      input.value = str;
      element.parentElement.appendChild(input);
      button.innerHTML = 'Submit';
      setTimeout(() => {
        input.style.display = 'flex';
      }, 1000); 
      input.focus();
      e.target.style.display = 'none';
      button.removeAttribute('disabled');
      
    } 
}
export function clearElements () {
  while (divReady.firstChild) {
    divReady.removeChild(divReady.firstChild);
  }
  while (divFinished.firstChild) {
    divFinished.removeChild(divFinished.firstChild);
  }
  while (divInProgress.firstChild) {
    divInProgress.removeChild(divInProgress.firstChild);
  }
  divBacklog
  while (divBacklog.firstChild) {
    divBacklog.removeChild(divBacklog.firstChild);
  }
}

  // Конфигурация observer (за какими изменениями наблюдать)
  const config = {
      childList: true,
      subtree: true
  };
  
  // Колбэк-функция при срабатывании мутации
  const callback = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            changeKan = true;
          } 
      }
  };
  
  // Создаём экземпляр наблюдателя с указанной функцией колбэка
  const observer = new MutationObserver(callback);
  
  observer.observe(divFinished, config);
  observer.observe(divBacklog, config);
  observer.observe(divReady, config);
  observer.observe(divInProgress, config);
 
