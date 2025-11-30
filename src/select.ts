function selectProject(projectName: string) {
    console.log("Selecting: ", projectName);
    fetch('http://localhost:3000/api/select-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ project: projectName })
    })
    .then(res => {
      if (res.ok) {
        window.location.href = '/projects.html';
      } else {
        alert('Błąd przy wyborze projektu');
      }
    })
    .catch(err => {
      console.error('Błąd:', err);
      alert('Wystąpił błąd sieci');
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    (document.getElementById('btn-project1') as HTMLButtonElement)
      .addEventListener('click', () => selectProject('Project1'));
  
    (document.getElementById('btn-project2') as HTMLButtonElement)
      .addEventListener('click', () => selectProject('Project2'));
  
    (document.getElementById('btn-project3') as HTMLButtonElement)
      .addEventListener('click', () => selectProject('Project3'));
  });
  