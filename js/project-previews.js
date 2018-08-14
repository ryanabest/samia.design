
init()

function init() {
  for (p=0;p<projects.length;p++) {
    let project = new projectObj(projects[p].project_name,projects[p].project_type,projects[p].preview_type,projects[p].render_height,projects[p].display_name,projects[p].display_descr);
    load(project);
    randomPos(project);
    background(project);
  }
  projectFilters();
}

function load(project) {
  let previewsDiv = document.getElementById("previews")
  let a = document.createElement("a");
  a.setAttribute("href",project.html_file_path);
  a.innerHTML = "<div class='preview " + project.class + "' id='" + project.project_name + "'><h3>" + project.display_name + "</h3><h4>" + project.display_descr + "</h4></div>"
  previewsDiv.appendChild(a);
}

function randomPos(project) {
  function getAbsoluteHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el;

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

  let projectDiv = document.getElementById(project.project_name);
  let tx = Math.floor(Math.random() * (window.innerWidth - projectDiv.offsetWidth)/window.innerWidth * 100) + "vw";
  let headerHeight = getAbsoluteHeight(document.getElementsByClassName("header")[0]);
  let ty = Math.floor(Math.random() * (window.innerHeight - (3*getAbsoluteHeight(projectDiv)) - headerHeight)/window.innerHeight*100) + "vh";
  projectDiv.style.transform = "translate(" + tx + "," + ty + ")";
}

function background(project) {
  let projectDiv = document.getElementById(project.project_name);

  // randomPos();
  setBackground();

  projectDiv.addEventListener("mouseover",function( event) {
    clearBackground();
  })

  projectDiv.addEventListener("mouseout",function( event) {
    setBackground();
  })

  function setBackground() {
    projectDiv.style.backgroundImage = "url("+project.preview_file_path+")";
    projectDiv.style.height = Math.floor(project.height/window.innerHeight*100) + "vh"
    projectDiv.style.maxHeight = project.height + "px";
    projectDiv.style.color = "transparent";
    projectDiv.style.backgroundColor = "#fff";
    projectDiv.style.zIndex = Math.floor(Math.random() * 900);
  }

  function clearBackground() {
    projectDiv.style.backgroundImage = "none";
    projectDiv.style.backgroundColor = "#fff";
    projectDiv.style.color = "black";
    projectDiv.style.zIndex = "999";
  }
}

function projectObj(project_name,project_type,preview_type,render_height,display_name,display_descr) {
  this.project_name = project_name;
  this.display_name = display_name;
  this.display_descr = display_descr;
  this.html_file_path = "../" + project_type + "/" + project_name;
  this.class = "preview " + project_type;
  this.preview_file_path = "../" + project_type + "/" + project_name + "/assets/" + project_name + "." + preview_type;
  this.height = render_height;
}

function projectFilters() {
  let filters = document.getElementsByClassName("filter");
  let filterIsClicked = false;
  function clickHandler(filter) {
    elementIsClicked = true;
    filter.srcElement.classList.toggle("checked")
    let project_type = filter.srcElement.classList[1]
    previews = document.getElementsByClassName("preview " + project_type)
    for (let p=0;p<previews.length;p++) {
      if (Object.values(filter.srcElement.classList).indexOf("checked") === -1) {
        previews[p].style.visibility = "hidden"
        previews[p].style.opacity = "0"
      } else {
        previews[p].style.visibility = "visible"
        previews[p].style.opacity = "1"
      }
    }
    if (document.getElementsByClassName("checked").length === 0) {
      document.getElementById("surprise").style.visibility = "visible"
      document.getElementById("surprise").style.opacity = "1"
    } else {
      document.getElementById("surprise").style.visibility = "hidden"
      document.getElementById("surprise").style.opacity = "0"
    }
  }

  for (let f=0;f<filters.length;f++) {
    let filter = filters[f];
    filter.addEventListener("click",clickHandler);
  }
}
