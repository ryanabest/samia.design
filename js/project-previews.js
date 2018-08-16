
init()

function init() {
  for (p=0;p<projects.length;p++) {
    let project = new projectObj(projects[p].project_name,projects[p].project_type,projects[p].preview_type,projects[p].render_height,projects[p].display_name,projects[p].display_descr);
    load(project,"previews");
    randomPos(project);
    background(project);
  }
  projectFilters();
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
