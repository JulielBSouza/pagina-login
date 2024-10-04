class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class Auth {
  constructor() {
    this.users = [];
  }

  registerUser(name, email, password, confirmPassword) {
    if (this.isEmailRegistered(email)) {
      this.showError("E-mail já cadastrado!", 'registerError');
      return false;
    }
    if (!this.validatePassword(password, confirmPassword)) {
      this.showError("As senhas não coincidem!", 'registerError');
      return false;
    }
    const newUser = new User(name, email, password);
    this.users.push(newUser);
    alert("Usuário cadastrado com sucesso!");
    return true;
  }

  loginUser(email, password) {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      window.location.href = 'main.html';
    } else {
      this.showError("E-mail ou senha incorretos!", 'loginError');
    }
  }

  isEmailRegistered(email) {
    return this.users.some(user => user.email === email);
  }

  validatePassword(password, confirmPassword) {
    return password === confirmPassword;
  }

  showError(message, errorElementId) {
    const errorDiv = document.getElementById(errorElementId);
    errorDiv.textContent = message;
  }
}

const auth = new Auth();

// Validação do Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.loginUser(email, password);
});

// Cadastro de novo usuário
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  auth.registerUser(name, email, password, confirmPassword);
});
