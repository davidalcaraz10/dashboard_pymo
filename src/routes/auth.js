class Auth {
    constructor() {
      this.authenticated = localStorage.getItem('auth_user') ? true : false;
    }
  
    login(cb) {
      localStorage.setItem('auth_user', 'true');
      this.authenticated = true;
      cb();
    }
  
    logout(cb) {
      localStorage.removeItem('auth_user');
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  