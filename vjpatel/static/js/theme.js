loadStyle();

function toggleStyle() {
  let links = document.getElementsByTagName("link")
  let oldStyleLink = links.item(links.length - 1);

  let currentStyle = sessionStorage.getItem("sessionStyle")
  if (currentStyle == "main.css") {
    sessionStorage.setItem("sessionStyle", "dark.css")
  } else {
    sessionStorage.setItem("sessionStyle", "main.css")
  }
  let head = document.getElementsByTagName("head").item(0);
  head.removeChild(oldStyleLink);

  loadStyle()
}

function loadStyle() {
  let sessionStyle = sessionStorage.getItem("sessionStyle")
  if (sessionStyle == null) {
    sessionStorage.setItem("sessionStyle", "main.css")
    loadStyle()
  }

  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", "/css/" + sessionStyle);
  document.getElementsByTagName("head").item(0).appendChild(newlink);
}
