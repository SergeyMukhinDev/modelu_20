import { BaseModel } from "./BaseModel";
import { getFromStorage, addToStorage } from "../utils";
export let LevelAccess;
export class User extends BaseModel {
  constructor(login, password, access) {
    super();
    this.login = login;
    this.password = password;
    this.storageKey = access;
    
  }
  
  get hasAccess() {
    let users = getFromStorage('users');
    if (users.length == 0) return false;
    for (let user of users) {
      if (user.login == this.login && user.password == this.password)
      {LevelAccess = user.storageKey;
        return true;}
    }
    let admins = getFromStorage('admins');
    if (admins.length == 0) return false;
    for (let admin of admins) {
      if (admin.login == this.login && admin.password == this.password){
       LevelAccess = admin.storageKey;
        return true;}
    }
    return false;
  }
  static save(user) {
    try {
      addToStorage(user, user.storageKey);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
