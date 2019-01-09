var x = window.matchMedia("(max-width: 700px)")
x.addListener(random);
let projectsObjs = []

init()

function init() {
  loadProjects(projects);
  random(x);
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

function random(x) {
  let projects = document.getElementById("previews").getElementsByClassName("preview");
  let xPosRandomList = [];
  for (let p=0;p<projects.length;p++) {
    xPosRandomList.push(p);
  }
  for (let p=0;p<projects.length;p++) {
    let project = projects[p];
    if (x.matches) {
      undoRandomPos(project);
    } else {
      randomPos(project,xPosRandomList);
    }
  }

  function randomPos(project,xPosRandomList) {
    function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
                 parseFloat(styles['marginBottom']);

    return Math.ceil(el.offsetHeight + margin);
    }

    let pIndex = Math.floor(Math.random()*xPosRandomList.length);
    let p = xPosRandomList[pIndex];
    xPosRandomList.splice(pIndex,1);

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
}
