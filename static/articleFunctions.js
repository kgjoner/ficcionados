function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  if(tabName.match(/(\d)-/)) {
    var tabNumber = "tab" + tabName.match(/(\d)-/)[1] + " "
  } else {
    var tabNumber = ""
  }
  const tabcontentClass = tabNumber + "tabcontent"
  const tablinksCLass = tabNumber + "tablinks"

  tabcontent = document.getElementsByClassName(tabcontentClass);
  for (i = 0; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName(tablinksCLass);
  for (i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openAccordion(evt) {               
  evt.currentTarget.classList.toggle("active");

  var panel = evt.currentTarget.nextElementSibling;
  if (panel.style.maxHeight){
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  } 
}