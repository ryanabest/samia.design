var projects = [
   {"project_name":"blr","project_type":"digital","preview_type":"svg","render_height":160,"display_name":"BLR","display_descr":"Rebrand for the Bellevue Literary Review uplifting their online presence. 2018."}
  ,{"project_name":"exhalt","project_type":"digital","preview_type":"svg","render_height":200,"display_name":"Building Youth","display_descr":"Online platform for exalt pairing business owners and disenfranchised youth for employment programs. 2017."}
  ,{"project_name":"firefly","project_type":"digital","preview_type":"svg","render_height":144,"display_name":"Firefly","display_descr":"Interactive app for pedestrians wanting to discover their interests effortlessly while roaming the streets of New York City.  2017."}
  ,{"project_name":"mark","project_type":"digital","preview_type":"svg","render_height":248,"display_name":"Mark","display_descr":"Strategic app for cautious clients wanting a tattoo based on their intuitive preferences. 2018."}
  ,{"project_name":"monkeybars","project_type":"digital","preview_type":"svg","render_height":144,"display_name":"MONKEYBARS","display_descr":'Comprehensive branded conference promoting all designers to take a break from the digital world to “Unplug & Play.”2017.'}
  ,{"project_name":"parks","project_type":"digital","preview_type":"svg","render_height":160,"display_name":"NYC Parks","display_descr":"Data visualization representing the daily preservation of parks in New York City. 2017."}
  ,{"project_name":"screen","project_type":"digital","preview_type":"svg","render_height":248,"display_name":"Screen","display_descr":"Platform for designers showcasing works around the theme of the interactive prototyping process. 2018."}
  ,{"project_name":"acc","project_type":"print","preview_type":"jpg","render_height":160,"display_name":"ACC 50th","display_descr":"Rebrand for Arabian Construction Company celebrating their 50 years of excellence. 2017."}
  ,{"project_name":"aub","project_type":"print","preview_type":"jpg","render_height":144,"display_name":"AUB Campus","display_descr":"Yearbook for the American University at Beirut depicting student life through patterns. 2014."}
  ,{"project_name":"graphics","project_type":"print","preview_type":"jpg","render_height":144,"display_name":"Graphics","display_descr":"Magazine tailored to professionals exploring design and its relationship another field using a unique footnoting system. 2013."}
  ,{"project_name":"kooz","project_type":"print","preview_type":"jpg","render_height":200,"display_name":"KOOZ","display_descr":"Product line of clutches for the modern user embodying the Arabian traditions of the bi'jeh. 2014."}
  ,{"project_name":"marvelous","project_type":"print","preview_type":"jpg","render_height":200,"display_name":"Marvelous Moulures","display_descr":"Artisanal wall ornaments for the Sursock Art Museum celebrating its rebirth after its closure in 2008. 2016."}
  ,{"project_name":"shedding","project_type":"print","preview_type":"jpg","render_height":160,"display_name":"Shedding Layers","display_descr":"Exhibition for Dubai Art Fair showcasing a line of 13 hand crafted wallpapers. 2016."}
]

function projectObj(project_name,project_type,preview_type,render_height,display_name,display_descr) {
  this.project_name = project_name;
  this.display_name = display_name;
  this.display_descr = display_descr;
  this.html_file_path = "/" + project_type + "/" + project_name;
  this.class = "preview " + project_type;
  this.preview_file_path = "/" + project_type + "/" + project_name + "/assets/" + project_name + "." + preview_type;
  this.height = render_height;
}

function load(project,elementID) {
  let previewsDiv = document.getElementById(elementID)
  let a = document.createElement("a");
  a.setAttribute("href",project.html_file_path);
  a.innerHTML = "<div class='preview " + project.class + "' id='" + project.project_name + "'><h3>" + project.display_name + "</h3><h4>" + project.display_descr + "</h4></div>"
  previewsDiv.appendChild(a);
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
