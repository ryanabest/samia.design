// nextProject()

function nextProject() {
  let project_name = ""
  let project_type = ""
  let next_project = ""
  getProjectType();
  assignRandomProject();
}

function getProjectType() {
  for (let p=0;p<projects.length;p++) {
    if (projects[p].project_name === document.getElementsByTagName("title")[0].innerHTML.toLowerCase()) {
      project_name = projects[p].project_name
      project_type = projects[p].project_type
    }
  }
}

function assignRandomProject() {

  let next_projects = []

  getNextProjectList();
  goToRandomProject();
  // renderRandomProject();

  function getNextProjectList() {
    for (let p=0;p<projects.length;p++) {
      if (projects[p].project_type === project_type & projects[p].project_name !== project_name) {
        next_projects.push(projects[p])
      }
    }
  }

  function goToRandomProject() {
    let p = Math.floor(Math.random() * next_projects.length)
    let project = new projectObj(next_projects[p].project_name,next_projects[p].project_type,next_projects[p].preview_type,next_projects[p].render_height,next_projects[p].display_name,next_projects[p].display_descr);
    window.location.href = project.html_file_path;
  }

  function renderRandomProject() {
    let p = Math.floor(Math.random() * next_projects.length)
    let project = new projectObj(next_projects[p].project_name,next_projects[p].project_type,next_projects[p].preview_type,next_projects[p].render_height,next_projects[p].display_name,next_projects[p].display_descr);
    load(project,"footer");
    background(project);
  }
}
