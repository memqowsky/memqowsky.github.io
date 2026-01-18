import './style.css';
import { Task, Story, StoryApi, Priority, Status } from './StoryApi';
import { User, UserApi } from './UserApi';
import { Project, ProjectApi } from './ProjectApi'; // Dodaj ten import

const app = document.querySelector<HTMLDivElement>('#app')!;

let loggedInUser: User | null;

type TaskWithStory = Task & { storyTitle: string };

async function showModal(title: string, fields: {id: string, label: string, type: string, options?: string[], value?: string}[]): Promise<Record<string, string> | null> {
    return new Promise((resolve) => {
        // Tworzymy główny kontener (tło)
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        // Generujemy pola formularza na podstawie przekazanej tablicy
        const inputsHTML = fields.map(f => {
            const isSelect = f.type === 'select';
            return `
                <div class="modal-field" style="margin-top: 15px; display: flex; flex-direction: column;">
                    <label style="font-weight: bold; margin-bottom: 5px; font-size: 14px;">${f.label}</label>
                    ${isSelect 
                        ? `<select id="modal-${f.id}" style="padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
                            ${f.options?.map(o => `<option value="${o}" ${f.value === o ? 'selected' : ''}>${o}</option>`).join('')}
                           </select>`
                        : `<input type="${f.type}" id="modal-${f.id}" value="${f.value || ''}" style="padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">`
                    }
                </div>
            `;
        }).join('');

        // Składamy całe okno w całość
        overlay.innerHTML = `
            <div class="modal-content">
                <h3 style="margin-top: 0; border-bottom: 2px solid #007bff; padding-bottom: 10px;">${title}</h3>
                <form id="modal-form">
                    ${inputsHTML}
                    <div class="modal-actions" style="margin-top: 25px; display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" class="btn-cancel" id="modal-cancel">Anuluj</button>
                        <button type="submit" class="btn-save" id="modal-save">Zapisz</button>
                    </div>
                </form>
            </div>
        `;

        // Bardzo ważne: dodajemy do document.body, aby ominąć błędy pozycjonowania w #app
        document.body.appendChild(overlay);

        const closeModal = () => {
            document.body.removeChild(overlay);
        };

        const form = overlay.querySelector('#modal-form') as HTMLFormElement;

        // Obsługa wysłania formularza (Zapisz)
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const results: Record<string, string> = {};
            fields.forEach(f => {
                const element = document.getElementById(`modal-${f.id}`) as HTMLInputElement | HTMLSelectElement;
                results[f.id] = element.value;
            });
            closeModal();
            resolve(results);
        });

        // Obsługa przycisku Anuluj
        overlay.querySelector('#modal-cancel')!.addEventListener('click', () => {
            closeModal();
            resolve(null);
        });

        // Zamknięcie po kliknięciu w szare tło (overlay)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
                resolve(null);
            }
        });
    });
}

async function loginUser() {
  const login = (document.querySelector<HTMLInputElement>('#login')!).value;
  const password = (document.querySelector<HTMLInputElement>('#password')!).value;

  loggedInUser = await UserApi.loginUser({ login, password });
  localStorage.setItem('loggedUser', JSON.stringify(loggedInUser));

  if (loggedInUser) {
    showMainPage();
  }
  console.log("Cant show login page, login not sucess");
}

async function showLoginPage() {
  app.innerHTML = `
        <h1>ManagMe - Logowanie</h1>
        <form id="login-form">
            <input type="text" id="login" placeholder="Login" required />
            <input type="password" id="password" placeholder="Hasło" required />
            <button type="submit">Zaloguj</button>
        </form>
    `;

    initializeTheme();
    


  const loginForm = document.querySelector<HTMLFormElement>('#login-form')!;
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginUser();
  });
}

async function setProject(projectName: string) {
  try {
    const response = await fetch('https://memqowsky-github-io-t2ej.onrender.com/api/select-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project: projectName }),
    });

    if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);

    localStorage.setItem('currentProjectCode', projectName);

    const allProjects = await ProjectApi.getAll();
    const selected = allProjects.find(p => p.code === projectName);
    if (selected) {
      localStorage.setItem('currentProjectName', selected.name);
    }

    console.log('Projekt ustawiony pomyślnie:', projectName);
  } catch (error) {
    console.error('Błąd:', error instanceof Error ? error.message : 'Nieznany błąd');
  }
  showLoginPage();
}


async function logoutFunction() {
  localStorage.clear();
  await setProject('undefined');
  showProjectSelect();
}

async function showMainPage() {
  const userJson = localStorage.getItem('loggedUser');
  const loggedUser: User | null = userJson ? JSON.parse(userJson) : null;

  const currentProjectName = localStorage.getItem('currentProjectName');

  app.innerHTML = `
    <h1>Tablica: ${currentProjectName}</h1>
    <button id="view-kanban">Zobacz Kanban</button>
    <button id="add-story">Dodaj zgłoszenie</button>
    ${
      loggedUser?.role === 'admin'
        ? `<button id="manage-projects" 
            style="
              margin-left: 20px; 
              border: 2px solid #28a745; 
              background-color: white; 
              color: #28a745; 
              font-weight: bold;
              padding: 8px 14px; 
              border-radius: 6px; 
              cursor: pointer;
              transition: all 0.2s;
            "
            onmouseover="this.style.backgroundColor='#28a745'; this.style.color='white';"
            onmouseout="this.style.backgroundColor='white'; this.style.color='#28a745';"
          >
            Zarządzaj projektami
          </button>`
        : ''
    }
    <div id="main-content"></div>
    <button id="logout-button">Wyloguj się</button>
  `;

  initializeTheme(); 

  const mainContent = document.querySelector<HTMLDivElement>('#main-content')!;
  showStoryList(mainContent);

  document.querySelector<HTMLButtonElement>('#view-kanban')!.addEventListener('click', () => {
    showKanban();
  });

  document.querySelector<HTMLButtonElement>('#logout-button')!.addEventListener('click', () => {
    localStorage.clear();
    logoutFunction();
  });

  const currentProject = await getCurrentProject();

  document.querySelector<HTMLButtonElement>('#add-story')!.addEventListener('click', async () => {
    const title = prompt('Podsumowanie:')!;
    const description = prompt('Opis:')!;
    const priority = prompt('Priorytet (Low, Medium, High):') as Priority;
    const status = "ToDo"

    const userJson = localStorage.getItem('loggedUser');
    const loggedUser: User | null = userJson ? JSON.parse(userJson) : null;

    const newStory = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      priority: priority as Priority,
      project: currentProject as string,
      createdAt: new Date().toISOString(),
      status: status as Status,
      ownerId: loggedUser?.id as string,
      tasks: []
    };


    await StoryApi.addStory(newStory);
    showMainPage();
    window.location.reload();
  });
  if (loggedUser?.role === 'admin') {
    document.querySelector<HTMLButtonElement>('#manage-projects')!.addEventListener('click', () => {
      showProjectManagementPage();
    });
  }
}

// 1. Podmień w showMainPage (event listener dla #add-story)
async function handleAddStory() {
    const currentProject = await getCurrentProject();
    const data = await showModal('Nowe Zgłoszenie', [
        { id: 'title', label: 'Podsumowanie', type: 'text' },
        { id: 'desc', label: 'Opis', type: 'text' },
        { id: 'prio', label: 'Priorytet', type: 'select', options: ['Low', 'Medium', 'High'] }
    ]);

    if (data) {
        const userJson = localStorage.getItem('loggedUser');
        const loggedUser: User | null = userJson ? JSON.parse(userJson) : null;
        const newStory = {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.desc,
            priority: data.prio as Priority,
            project: currentProject as string,
            createdAt: new Date().toISOString(),
            status: "ToDo" as Status,
            ownerId: loggedUser?.id as string,
            tasks: []
        };
        await StoryApi.addStory(newStory);
        window.location.reload();
    }
}

async function showProjectManagementPage() {
  const projects = await ProjectApi.getAll();

  app.innerHTML = `
    <h1 style="text-align:center; margin-bottom: 20px;">📋 Zarządzanie Projektami</h1>

    <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 25px;">
      <button id="add-project" 
        style="padding: 10px 15px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer;">
        Dodaj nowy projekt
      </button>
      <button onclick="showMainPage()" 
        style="padding: 10px 15px; font-size: 16px; background-color: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer;">
        Powrót
      </button>
    </div>

    <div id="projects-list" style="display: flex; justify-content: center;">
      <table style="
        border-collapse: collapse;
        width: 80%;
        max-width: 900px;
        background-color: #f8f9fa;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        border-radius: 8px;
        overflow: hidden;
        font-size: 16px;
      ">
        <thead style="background-color: #007bff; color: white;">
          <tr>
            <th style="padding: 12px;">Nazwa</th>
            <th style="padding: 12px;">Skrót</th>
            <th style="padding: 12px;">Akcje</th>
          </tr>
        </thead>
        <tbody id="projects-table-body">
          ${projects.map(p => `
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 14px 12px;">${p.name}</td>
              <td style="padding: 14px 12px;">${p.code}</td>
              <td style="padding: 12px; text-align: center;">
                <button class="edit-project"
                  data-id="${p.id}" data-name="${p.name}" data-code="${p.code}"
                  style="padding: 6px 10px; background-color: #ffc107; color: black; border: none; border-radius: 5px; cursor: pointer; margin-right: 6px;">
                  ✏️ Edytuj
                </button>
                <button class="delete-project"
                  data-id="${p.id}"
                  style="padding: 6px 10px; background-color: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  🗑️ Usuń
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  initializeTheme(); 

  // Obsługa zdarzeń
  document.querySelector<HTMLButtonElement>('#add-project')!.addEventListener('click', async () => {
    const name = prompt('Nazwa projektu:');
    const code = prompt('Skrót projektu:');
    if (name && code) {
      await ProjectApi.add({ name, code });
      window.location.reload();
    }
  });

  const projectsTableBody = document.querySelector('#projects-table-body')!;
  projectsTableBody.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('edit-project')) {
      const id = target.dataset.id!;
      const oldName = target.dataset.name!;
      const oldCode = target.dataset.code!;
      const newName = prompt('Nowa nazwa:', oldName);
      const newCode = prompt('Nowy skrót:', oldCode);
      if (newName && newCode) {
        await ProjectApi.update({ id, name: newName, code: newCode });
        window.location.reload();
      }
    } else if (target.classList.contains('delete-project')) {
      const id = target.dataset.id!;
      if (confirm('Czy na pewno chcesz usunąć ten projekt?')) {
        await ProjectApi.delete(id);
        window.location.reload();
      }
    }
  });
}


function deleteStory(storyId: string) {
  console.log("Deleting story ID: ", storyId);
  StoryApi.deleteStory(storyId);
  showMainPage();
}

interface ProjectResponse {
  project: string | null;
}

async function getCurrentProject(): Promise<string | null> {
  try {
    const response = await fetch('https://memqowsky-github-io-t2ej.onrender.com/api/current-project');

    if (!response.ok) {
      throw new Error(`Błąd HTTP: ${response.status}`);
    }

    const data: ProjectResponse = await response.json();
    return data.project;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Błąd pobierania projektu:', error.message);
    } else {
      console.error('Nieznany błąd:', error);
    }
    return null;
  }
}

// 2. Podmień funkcję updateStory
async function updateStory(oldStory: Story) {
    const data = await showModal('Edytuj Story', [
        { id: 'title', label: 'Tytuł', type: 'text', value: oldStory.title },
        { id: 'desc', label: 'Opis', type: 'text', value: oldStory.description },
        { id: 'prio', label: 'Priorytet', type: 'select', options: ['Low', 'Medium', 'High'], value: oldStory.priority },
        { id: 'status', label: 'Status', type: 'select', options: ['ToDo', 'InProgress', 'InQA', 'Done'], value: oldStory.status }
    ]);

    if (data) {
        const updatedStory = {
            ...oldStory,
            title: data.title,
            description: data.desc,
            priority: data.prio as Priority,
            status: data.status as Status,
        };
        await StoryApi.updateStory(updatedStory);
        window.location.reload();
    }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const light = document.getElementById("light-theme") as HTMLLinkElement;
  const dark = document.getElementById("dark-theme") as HTMLLinkElement;

  if (savedTheme === 'dark') {
    dark.disabled = false;
    light.disabled = true;
    document.body.classList.add("dark-mode");
  } else {
    dark.disabled = true;
    light.disabled = false;
    document.body.classList.remove("dark-mode");
  }
}

async function showStoryList(container: HTMLElement) {
  const currentProject = await getCurrentProject();
  if (!currentProject) return;

  const stories = await StoryApi.getAll(currentProject);

  const groupedStories: Record<Status | "InQA", Story[]> = {
    ToDo: [],
    InProgress: [],
    InQA: [], 
    Done: []
  };

  stories.forEach(story => {
    if (groupedStories[story.status as keyof typeof groupedStories]) {
      groupedStories[story.status as keyof typeof groupedStories].push(story);
    } else {
      console.warn("Nieznany status:", story.status, story);
    }
  });

  const renderStory = async (story: Story) => {
    const createdAt = new Date(story.createdAt);
    const formattedDate = createdAt.toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let assignedUserFullName = "Brak właściciela";
    if (story.ownerId) {
      try {
        assignedUserFullName = await UserApi.getUserFullNameById(story.ownerId) ?? "Brak";
      } catch (error) {
        assignedUserFullName = "Błąd podczas pobierania użytkownika";
      }
    }

    // 🧩 DODANY guzik "Następny etap"
    const nextStageButton = `
      <button class="next-stage-button" data-story-id="${story.id}">
        ➡️ Następny etap
      </button>
    `;

    return `
      <div class="story-item">
          <h3>${story.title} (${story.priority})</h3>
          <small>Utworzone: ${formattedDate}</small><br>
          <small>Opis: ${story.description}</small><br>
          <small>Właściciel: ${assignedUserFullName}</small><br>
          <small>Status: ${story.status}</small><br><br>
          <p><strong>Projekt:</strong> ${story.project}</p>
          <button class="edit-story-button" story-id="${story.id}">✏️ Edytuj</button>
          <button onclick="deleteStory('${story.id}')">🗑️ Usuń</button>
          ${nextStageButton}
          <br>
          <button onclick="createTask('${story.id}')">➕ Dodaj Zadanie</button>
          ${story.tasks.map(task => `
              <div class="task-item">
                  <strong>${task.title}</strong> (${task.status})
                  <button onclick="viewTaskDetails('${story.id}', '${task.id}')">📋 Szczegóły</button>
                  <button class="edit-task-button" data-story-id="${story.id}" data-task-id="${task.id}">✏️ Edytuj task</button>
                  <button onclick="deleteTask('${story.id}', '${task.id}')">🗑️ Usuń</button>
              </div>
          `).join('')}
      </div>
    `;
  };

  const renderSection = async (title: string, stories: Story[]) => {
    const renderedStories = await Promise.all(stories.map(renderStory));
    return `
      <section>
        <h2>${title}</h2>
        ${renderedStories.join('')}
      </section>
    `;
  };

  const toDoSection = await renderSection(" Do zrobienia 📝", groupedStories.ToDo);
  const inProgressSection = await renderSection(" W trakcie 🚧", groupedStories.InProgress);
  const inQASection = await renderSection(" W testach 🧪", groupedStories.InQA);
  const doneSection = await renderSection(" ✅ Ukończone ✅", groupedStories.Done);

  container.innerHTML = `
    <div id="task-container" style="display: flex; gap: 12px; overflow-x: auto; width: 1500px; padding: 8px;">
      ${toDoSection}
      ${inProgressSection}
      ${inQASection}
      ${doneSection}
    </div>
  `;


  container.querySelectorAll<HTMLButtonElement>('.edit-task-button').forEach(button => {
    button.addEventListener('click', () => {
      updateTask(button);
    });
  });

  container.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("edit-story-button")) {
      const storyId = target.getAttribute("story-id");
      if (storyId) {
        const storyToEdit = await StoryApi.getStory(storyId);
        await updateStory(storyToEdit);
      }
    }

    // 🧩 Obsługa "Następny etap"
    if (target.classList.contains("next-stage-button")) {
      const storyId = target.dataset.storyId!;
      const story = await StoryApi.getStory(storyId);
      const nextStatusMap: Record<Status | "InQA", Status | "InQA"> = {
        ToDo: "InProgress",
        InProgress: "InQA",
        InQA: "Done",
        Done: "Done"
      };
      const newStatus = nextStatusMap[story.status as keyof typeof nextStatusMap];
      if (story.status !== newStatus) {
        story.status = newStatus as Status;
        await StoryApi.updateStory(story);
        showMainPage();
        window.location.reload();
      } else {
        alert("Story jest już ukończone ✅");
      }
    }
  });
}

async function createTask(storyId: string) {
    const data = await showModal('Nowe Zadanie', [
        { id: 'title', label: 'Tytuł zadania', type: 'text' },
        { id: 'desc', label: 'Opis zadania', type: 'text' },
        { id: 'prio', label: 'Priorytet', type: 'select', options: ['Low', 'Medium', 'High'] },
        { id: 'hours', label: 'Przewidywane godziny', type: 'number' }
    ]);

    if (data) {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.desc,
            priority: data.prio as Priority,
            estimatedHours: Number(data.hours),
            hoursWorked: 0,
            status: 'ToDo',
            createdAt: new Date().toISOString(),
        };
        await StoryApi.addTask(storyId, newTask);
        window.location.reload();
    }
}

async function viewTaskDetails(storyId: string, taskId: string) {
  const stories = await StoryApi.getAll();
  const story = stories.find(s => s.id === storyId);
  const task = story?.tasks.find(t => t.id === taskId);

  if (!story || !task) return;

  let assignedUserFullName = "Brak przypisanego użytkownika";
  if (task.assignedUserId) {
    try {
      assignedUserFullName = await UserApi.getUserFullNameById(task.assignedUserId) ?? "Brak";
    } catch (error) {
      assignedUserFullName = "Błąd podczas pobierania użytkownika";
    }
  }

  app.innerHTML = `
        <h1>Szczegóły Zadania</h1>
        <p><strong>Nazwa:</strong> ${task.title}</p>
        <p><strong>Opis:</strong> ${task.description}</p>
        <p><strong>Projekt:</strong> ${story.project}</p>
        <p><strong>Przewidywane godziny:</strong> ${task.estimatedHours}</p>
        <p><strong>Przepracowane godziny:</strong> ${task.hoursWorked}</p>
        <p><strong>Status:</strong> ${task.status}</p>
        <p><strong>Data dodania:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
        ${task.startAt ? `<p><strong>Data rozpoczęcia:</strong> ${new Date(task.startAt).toLocaleString()}</p>` : ''}
        ${task.endAt ? `<p><strong>Data zakończenia:</strong> ${new Date(task.endAt).toLocaleString()}</p>` : ''}
        <p><strong>Przypisany użytkownik:</strong> ${assignedUserFullName} </p>

        <button onclick="assignUser('${storyId}', '${task.id}')">Przypisz się</button>
        <button onclick="markTaskDone('${storyId}', '${task.id}')">Zmień na Done</button>
        <button onclick="showMainPage()">Powrót</button>
    `;
}

async function assignUser(storyId: string, taskId: string) {
    try {
        // 1. Pobieramy zadanie z API
        const task = await StoryApi.getTask(storyId, taskId);
        
        const userJson = localStorage.getItem('loggedUser');
        const loggedUser: User | null = userJson ? JSON.parse(userJson) : null;

        if (!task || !loggedUser) {
            alert("Błąd: Nie znaleziono zadania lub nie jesteś zalogowany.");
            return;
        }

        // 2. Weryfikacja roli
        if (loggedUser.role === 'devops' || loggedUser.role === 'developer') {
            // Modyfikujemy obiekt zadania
            task.assignedUserId = loggedUser.id;
            task.status = 'InProgress';
            task.startAt = new Date().toISOString();
            task.endAt = undefined;

            // 3. Wysyłamy do serwera i CZEKAMY na odpowiedź
            const response = await StoryApi.updateTask(storyId, task);
            
            if (response) {
                console.log("Zadanie przypisane poprawnie");
                // Odświeżamy szczegóły, by zobaczyć zmiany
                viewTaskDetails(storyId, taskId);
            }
        } else {
            alert('Tylko Developer lub DevOps mogą przypisać się do zadania.');
        }
    } catch (error) {
        console.error("Szczegóły błędu:", error);
        alert("Wystąpił błąd komunikacji z serwerem. Sprawdź konsolę (F12).");
    }
}

async function markTaskDone(storyId: string, taskId: string) {
    try {
        const task = await StoryApi.getTask(storyId, taskId);
        if (!task) return;

        if (task.status === 'InProgress') {
            task.status = 'Done';
            task.endAt = new Date().toISOString();
            
            await StoryApi.updateTask(storyId, task);
            viewTaskDetails(storyId, taskId);
        } else {
            alert('Zadanie musi być w stanie "InProgress", aby zmienić na "Done".');
        }
    } catch (error) {
        console.error("Błąd podczas kończenia zadania:", error);
    }
}

async function deleteTask(storyId: string, taskId: string) {
  if (confirm('Czy na pewno chcesz usunąć to zadanie?')) {
    try {
      // Dodajemy 'await', aby poczekać na odpowiedź z API
      await StoryApi.deleteTask(storyId, taskId);
      
      console.log("Zadanie usunięte pomyślnie");
      
      // Dopiero po sukcesie odświeżamy widok
      showMainPage();
      window.location.reload();
    } catch (error) {
      console.error("Błąd podczas usuwania zadania:", error);
      alert("Nie udało się usunąć zadania. Spróbuj ponownie.");
    }
  }
}

async function updateTask(button: HTMLButtonElement) {
    const storyId = button.dataset.storyId!;
    const taskId = button.dataset.taskId!;
    const oldTask = await StoryApi.getTask(storyId, taskId);

    const data = await showModal('Edytuj Zadanie', [
        { id: 'title', label: 'Tytuł', type: 'text', value: oldTask.title },
        { id: 'desc', label: 'Opis', type: 'text', value: oldTask.description },
        { id: 'prio', label: 'Priorytet', type: 'select', options: ['Low', 'Medium', 'High'], value: oldTask.priority },
        { id: 'est', label: 'Planowane h', type: 'number', value: oldTask.estimatedHours.toString() },
        { id: 'work', label: 'Przepracowane h', type: 'number', value: oldTask.hoursWorked.toString() }
    ]);

    if (data) {
        const newTask: Task = {
            ...oldTask,
            title: data.title,
            description: data.desc,
            priority: data.prio as Priority,
            estimatedHours: Number(data.est),
            hoursWorked: Number(data.work)
        };
        await StoryApi.updateTask(storyId, newTask);
        window.location.reload();
    }
}

async function showKanban() {
  const currentProject = await getCurrentProject();
  if (!currentProject) return;

  const stories = await StoryApi.getAll(currentProject);
  let allTasks: TaskWithStory[] = [];
  for (const story of stories) {
    allTasks = allTasks.concat(story.tasks.map(task => ({ ...task, storyTitle: story.title })));
  }

  app.innerHTML = `
    <h1 style="margin-bottom:12px;">Kanban Board</h1>

    <div id="kanban-container" style="
      display:flex;
      gap:12px;
      overflow-x:auto;
      padding-bottom:8px;
      align-items:flex-start;
      width:1500px;
    ">
      <div class="kanban-column">
        <h3>Do zrobienia 📝</h3>
        <div id="kanban-todo"></div>
      </div>

      <div class="kanban-column">
        <h3>W trakcie 🚧</h3>
        <div id="kanban-inprogress"></div>
      </div>

      <div class="kanban-column">
        <h3>W testach 🧪</h3>
        <div id="kanban-inqa"></div>
      </div>

      <div class="kanban-column">
        <h3>Ukończone ✅</h3>
        <div id="kanban-done"></div>
      </div>
    </div>

    <div style="margin-top:14px;">
      <button id="kanban-back" style="padding:8px 12px; border-radius:6px; cursor:pointer;">Powrót</button>
    </div>

    <style>
      /* --- Styl jasny --- */
      .kanban-column {
        flex: 0 0 300px;
        min-width: 300px;
        background: #fafafa;
        border-radius: 8px;
        padding: 10px;
      }

      .kanban-column h3 {
        text-align: center;
        margin-top: 0;
      }

      /* --- Styl ciemny (działa przy aktywnym dark theme) --- */
      body.dark-mode .kanban-column {
        background-color: var(--bg-main) !important;
        color: var(--color-gray-600) !important;
      }

      body.dark-mode #kanban-container {
        background-color: var(--bg-main) !important;
      }
    </style>
  `;

  // Wypełnienie zadań
const renderTaskCard = (t: TaskWithStory) => {
  return `
    <div class="kanban-card">
      <div style="font-weight:700;">${t.title}</div>
      <div style="font-size:12px; color:#666;">Story: ${t.storyTitle}</div>
    </div>
  `;
};


  const todoEl = document.querySelector<HTMLDivElement>('#kanban-todo')!;
  const inprEl = document.querySelector<HTMLDivElement>('#kanban-inprogress')!;
  const inqaEl = document.querySelector<HTMLDivElement>('#kanban-inqa')!;
  const doneEl = document.querySelector<HTMLDivElement>('#kanban-done')!;

  todoEl.innerHTML = allTasks.filter(t => t.status === 'ToDo').map(renderTaskCard).join('');
  inprEl.innerHTML = allTasks.filter(t => t.status === 'InProgress').map(renderTaskCard).join('');
  inqaEl.innerHTML = allTasks.filter(t => t.status === 'InQA').map(renderTaskCard).join('');
  doneEl.innerHTML = allTasks.filter(t => t.status === 'Done').map(renderTaskCard).join('');

  document.querySelector<HTMLButtonElement>('#kanban-back')!.addEventListener('click', () => showMainPage());
}


async function showProjectSelect() {
  const currentProject = await getCurrentProject();

  if (currentProject === 'undefined' || !currentProject) {
    const allProjects = await ProjectApi.getAll();

    app.innerHTML = `
      <h1>Projekty</h1>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <input type="text" id="project-search" placeholder="Szukaj projektu po nazwie lub skrócie">
          <button id="search-button">Szukaj</button>
          <button id="clear-button">Wyczyść</button>
          <button id="add-project-from-select">Dodaj projekt</button>
      </div>
      <div id="projects-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
    `;

    initializeTheme(); 

    const projectsContainer = document.querySelector<HTMLDivElement>('#projects-container')!;
    const searchInput = document.querySelector<HTMLInputElement>('#project-search')!;
    const searchButton = document.querySelector<HTMLButtonElement>('#search-button')!;
    const clearButton = document.querySelector<HTMLButtonElement>('#clear-button')!;
    const addProjectButton = document.querySelector<HTMLButtonElement>('#add-project-from-select')!;

    const renderProjects = (projectsToRender: Project[]) => {
      projectsContainer.innerHTML = projectsToRender.map(p => `
        <button
          onclick="window.setProject('${p.code}')"
          style="
            display: block;
            width: 100%;
            padding: 15px 20px;
            font-size: 18px;
            margin-bottom: 10px;
            text-align: left;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
            font-weight: bold;
            text-align: center;

          "
          onmouseover="this.style.backgroundColor='#0056b3'"
          onmouseout="this.style.backgroundColor='#007bff'"
        >
          ${p.name}
        </button>
      `).join('');
    };


    renderProjects(allProjects);

    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProjects = allProjects.filter(p =>
        p.name.toLowerCase().includes(searchTerm) || p.code.toLowerCase().includes(searchTerm)
      );
      renderProjects(filteredProjects);
    });

    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      renderProjects(allProjects);
    });

    addProjectButton.addEventListener('click', async () => {
      const name = prompt('Nazwa projektu:');
      const code = prompt('Skrót projektu:');
      if (name && code) {
        await ProjectApi.add({ name, code });
        window.location.reload();
      }
    });

    console.log("Jesteśmy w ifie, currentProject: ", currentProject);
  } else {
    console.log("Nie jesteśmy w ifie, currentProject: ", currentProject);
    showMainPage();
  }
}

// Zmodyfikowana funkcja toggleTheme
const toggleTheme = () => {
  const light = document.getElementById("light-theme") as HTMLLinkElement;
  const dark = document.getElementById("dark-theme") as HTMLLinkElement;

  if (dark.disabled) {
    // Włącz dark mode
    dark.disabled = false;
    light.disabled = true;
    document.body.classList.add("dark-mode");
    localStorage.setItem('theme', 'dark');
  } else {
    // Włącz light mode
    dark.disabled = true;
    light.disabled = false;
    document.body.classList.remove("dark-mode");
    localStorage.setItem('theme', 'light');
  }
};


const goToHomePage = () => {
  window.location.href = 'index.html';
};


(window as any).createTask = createTask;
(window as any).viewTaskDetails = viewTaskDetails;
(window as any).assignUser = assignUser;
(window as any).markTaskDone = markTaskDone;
(window as any).showMainPage = showMainPage;
(window as any).updateStory = updateStory;
(window as any).deleteStory = deleteStory;
(window as any).setProject = setProject;
(window as any).deleteTask = deleteTask;
(window as any).updateTask = updateTask;
(window as any).toggleTheme = toggleTheme;
(window as any).goToHomePage = goToHomePage;
(window as any).showProjectManagementPage = showProjectManagementPage;

// Inicjalizuj motyw przy starcie aplikacji
initializeTheme();

showProjectSelect();