export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'ToDo' | 'InProgress' | 'InQA' | 'Done';

export type Task = {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    estimatedHours: number;
    hoursWorked: number;
    status: Status;
    createdAt: string;
    startAt?: string;
    endAt?: string;
    assignedUserId?: string;
};

export type Story = {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    project: string;
    createdAt: string;
    status: Status;
    ownerId: string;
    tasks: Task[];
};

export class StoryApi {
    private static baseUrl = 'http://localhost:3000/api/stories';

    private static getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem('accessToken');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    public static async fetchWithAuth(
        url: string,
        options: RequestInit = {}
    ): Promise<Response> {
        return fetch(url, {
            ...options,
            headers: {
                ...this.getAuthHeaders(),
                ...(options.headers || {})
            }
        });
    }

    static async getAll(currentProject?: string): Promise<Story[]> {
        const url = currentProject
            ? `${this.baseUrl}?project=${encodeURIComponent(currentProject)}`
            : this.baseUrl;

        const res = await this.fetchWithAuth(url);
        return await res.json();
    }

    static async addStory(story: Story): Promise<Story> {
        const res = await this.fetchWithAuth(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(story)
        });
        return await res.json();
    }

    static async getStory(storyId: string): Promise<Story> {
        const res = await this.fetchWithAuth(`${this.baseUrl}/${storyId}`);
        return await res.json();
    }

    static async updateStory(story: Story): Promise<Story> {
        const res = await this.fetchWithAuth(this.baseUrl, {
            method: 'PUT',
            body: JSON.stringify(story)
        });
        return await res.json();
    }

    static async deleteStory(storyId: string): Promise<void> {
        await this.fetchWithAuth(`${this.baseUrl}/${storyId}`, { method: 'DELETE' });
    }

    static async addTask(storyId: string, task: Task): Promise<Story> {
        const res = await this.fetchWithAuth(`${this.baseUrl}/${storyId}/tasks`, {
            method: 'POST',
            body: JSON.stringify(task)
        });
        return await res.json();
    }

    static async updateTask(storyId: string, task: Task): Promise<Story> {
        const res = await this.fetchWithAuth(`${this.baseUrl}/${storyId}/tasks`, {
            method: 'PUT',
            body: JSON.stringify(task)
        });
        return await res.json();
    }

    static async deleteTask(storyId: string, taskId: string): Promise<Story> {
        const res = await this.fetchWithAuth(`${this.baseUrl}/${storyId}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        return await res.json();
    }

    static async getTask(storyId: string, taskId: string): Promise<Task> {
        const res = await this.fetchWithAuth(`${this.baseUrl}/${storyId}/tasks/${taskId}`);
        return await res.json();
    }
}
