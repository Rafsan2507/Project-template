// src/services/authService.ts

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  async register(data: RegisterData): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some((u: any) => u.email === data.email)) {
          reject(new Error('User already exists'));
          return;
        }

        const user: User = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        };

        users.push({ ...user, password: data.password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        resolve(user);
      }, 1000);
    });
  }

  async login(data: LoginData): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(
          (u: any) => u.email === data.email && u.password === data.password
        );

        if (!user) {
          reject(new Error('Invalid credentials'));
          return;
        }

        const userData: User = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        resolve(userData);
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export default new AuthService();