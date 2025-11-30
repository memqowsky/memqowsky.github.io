export type Role = 'admin' | 'devops' | 'developer'

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  role: Role;
};

export class UserApi {

  static async loginUser(user: { login: string; password: string }): Promise<User | null> {
    try {
      const response = await fetch('https://memqowsky-github-io-t2ej.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        console.error('Logowanie nie powiodło się:', await response.json());
        return null;
      }

      const data = await response.json();

      console.log("User data: ", data);

      const loggedUser: User = {
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        login: data.user.login,
        password: data.user.password,
        role: data.user.role
      }

      console.log("Odpowiedz z backendu OK")
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('loggedUser', JSON.stringify(data.user));

      return loggedUser;
    } catch (err) {
      console.error('Błąd podczas logowania:', err);
      return null;
    }
  }

  static async getUserFullNameById(userId: string): Promise<string | null> {
    console.log("Tryingto getUserFullNameById, userId:", userId);
    try {
      const response = await fetch(`https://memqowsky-github-io-t2ej.onrender.com/api/users/${userId}`);
      if (!response.ok) {
        console.error('Nie udało się pobrać użytkownika:', await response.text());
        return null;
      }

      const user = await response.json();
      return `${user.firstName} ${user.lastName}`;
    } catch (error) {
      console.error('Błąd podczas pobierania użytkownika:', error);
      return null;
    }
  }

}