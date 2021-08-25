
export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};


export const generateTestUser = function (User) {
  localStorage.removeItem(`users`);
  localStorage.removeItem(`admins`);
  const testUser0 = new User("test0", "0", "users");
  User.save(testUser0);
  const testUser1 = new User("test1", "0", "users");
  User.save(testUser1);
  const testUser3 = new User("admin", "1", "admins");
  User.save(testUser3);
 
  };
  