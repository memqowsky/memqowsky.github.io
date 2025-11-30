import { StoryApi } from './StoryApi';

export interface Project {
  id: string;
  name: string;
  code: string;
}

export class ProjectApi {
  private static baseUrl = 'https://memqowsky-github-io-t2ej.onrender.com/api/projects';

  static async getAll(): Promise<Project[]> {
    const res = await fetch(`${this.baseUrl}`);
    if (!res.ok) {
      throw new Error('Błąd pobierania projektów');
    }
    return await res.json();
  }

  static async add(project: { name: string, code: string }): Promise<Project> {
    const newProjectData = {
      ...project,
      id: crypto.randomUUID()
    };

    const res = await StoryApi.fetchWithAuth(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProjectData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Nie udało się dodać projektu.');
    }

    return await res.json();
  }

  static async update(project: Project): Promise<Project> {
    const res = await StoryApi.fetchWithAuth(this.baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Nie udało się zaktualizować projektu.');
    }
    return await res.json();
  }

  static async delete(id: string): Promise<void> {
    const res = await StoryApi.fetchWithAuth(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Nie udało się usunąć projektu.');
    }
  }
}