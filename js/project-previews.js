var x = window.matchMedia("(max-width: 700px)")
x.addListener(render);
let projectsObjs = []

init()
// dragProjects()

function init() {
  loadProjects(projects);
  render(x);
  projectFilters();
}

function loadProjects(projects) {
  for (p=0;p<projects.length;p++) {
    let project = new projectObj(projects[p].project_name,projects[p].project_type,projects[p].preview_type,projects[p].render_height,projects[p].display_name,projects[p].display_descr);
    projectsObjs.push(project);
    load(project,"previews");
    background(project);
  }
}

function render(x) {
  let projects = document.getElementById("previews").children;
  for (p=0;p<projects.length;p++) {
    let project = projects[p].children[0];
    if (x.matches) {
      undoRandomPos(project);
    } else {
      randomPos(project);
    }

  }
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


  let currentPos = project.getBoundingClientRect().x;
  let randomWidth = window.innerWidth * 0.95;
  let randomPos = p/(projects.length-1);
  randomPos *= randomWidth - project.offsetWidth;
  randomPos += (window.innerWidth - randomWidth) / 2;
  // let randomPos = (p/projects.length)window.innerWidth - project.offsetWidth;
  let tx = (randomPos - currentPos)/window.innerWidth*100;
  tx += "vw";
  let headerHeight = getAbsoluteHeight(document.getElementsByClassName("header")[0]);
  let ty = Math.floor(Math.random() * (window.innerHeight - getAbsoluteHeight(project) - headerHeight)/window.innerHeight*100) + "vh";
  project.style.transform = "translate(" + tx + "," + ty + ")";
  let projectDiv = document.getElementById(project.id);
}

function undoRandomPos(project) {
  project.style.transform = "translate(0vw,0vh)";
  document.getElementById(project.id+"_parent").style.order = Math.floor(Math.random() * 900);
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
        setTimeout(function() {previews[p].style.display = "none";},300);
        previews[p].style.opacity = "0"
      } else {
        previews[p].style.visibility = "visible"
        previews[p].style.opacity = "1"
        if (project_type === "info") {
          previews[p].style.display = "inline-flex"
        } else {
          previews[p].style.display = "inline-block"
        }
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

function dragProjects() {
  let projects = document.getElementsByClassName("preview");

  for (let p=0;p<projects.length;p++) {
    dragElement(projects[p]);
  }

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // click = false;
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}
