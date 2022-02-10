// let addActivitiesMainDiv = document.getElementById("addActivitiesMainDiv");
// addActivitiesMainDiv.style = "display: none"
let mainDivs = document.getElementsByClassName("main");
let navbarLis = document.getElementsByClassName("navbarLi");
let decideNavbarLi = document.getElementById("decideNavbarLi");
// decideNavbarLi.classList.add("active");
let viewNavbarLi = document.getElementById("viewNavbarLi");
let addNavbarLi = document.getElementById("addNavbarLi");

let allActivitiesDiv = document.getElementById("allActivitiesDiv");
let allActivitiesList;
let data;
let tagsArray = [];
let canDoThis = [];
let divToUpdate;
let classToUpdate;
let inputName;
let locationRadiosDiv = document.getElementById("locationRadiosDiv");
let tagCheckboxesDiv = document.getElementById("tagCheckboxesDiv");
let radios = document.getElementsByClassName("radios");
let locationInput;
let tagCheckboxes = document.getElementsByClassName("tagCheckboxes");
let decideButton = document.getElementById("decideButton");
let decision = document.getElementById("decision");
let refineCaret = document.getElementById("refineCaret");
let locationContainer = document.getElementById("locationContainer");
locationContainer.style = "display: none;";
let tagsContainer = document.getElementById("tagsContainer");
tagsContainer.style = "display: none";
let activitiesForThisLocation = [];
let newActivityName;
let clickedSpan;
let activityLi;
let taskId;
let addActivityDiv = document.getElementById("addActivityDiv");
let saveButton = document.getElementById("saveButton");
let addActivityNameInput = document.getElementById("addActivityNameInput");
let addLocationCheckboxes = document.getElementsByClassName("addLocationCheckboxes");
let newLocationsArray = [];
let addOtherLocationCheckbox = document.getElementById("addOtherLocationCheckbox");
let addOtherLocationInput = document.getElementById("addOtherLocationInput");
addOtherLocationInput.style = "display: none";
let newLocationString = "";
let newLocationStringCondensed = "";
let addTagCheckboxes = document.getElementsByClassName("addTagCheckboxes");
let addOtherTagCheckbox = document.getElementById("addOtherTagCheckbox");
let addOtherTagInput = document.getElementById("addOtherTagInput");
addOtherTagInput.style = "display: none";
let newTagsArray = [];
// let goToAddActivitiesButton = document.getElementById("goToAddActivitiesButton");
let clearButton = document.getElementById("clearButton");
let clicked; 
let addActivityFeedback = document.getElementById("addActivityFeedback");

let activities = [
  {
    activityName: "Work out",
    location: ["atHome"],
    tags: ["toDo"],
  },
  {
    activityName: "Read a novel",
    location: ["atHome","atWork"],
    tags: ["fun"],
  },
  {
    activityName: "Listen to a podcast",
    location: ["atHome","atWork"],
    tags: ["fun", "learning"],
  },
  {
    activityName: "Watch a movie",
    location: ["atHome","atWork"],
    tags: ["fun"],
  },
  {
    activityName: "Finish your homework",
    location: ["atHome"],
    tags: ["toDo","learning"],
  }
];

decideNavbarLi.onclick = function(){
  showMainDiv(document.getElementById("decideMainDiv"));
  uncheckCheckboxes(tagCheckboxes);
  makeNavbarLiActive(decideNavbarLi);
}

// goToAddActivitiesButton.onclick = function(){
//   showMainDiv(addActivitiesMainDiv);
//   makeNavbarLiActive(addNavbarLi);
// }


// function makeNavbarLiActive(clickedNavbarLi){
//   decideNavbarLi.classList.remove("active");
//   for (i = 0; i < navbarLis.length; i++){
//     let navbarLi = navbarLis[i];
//     if (navbarLi == clickedNavbarLi){
//       navbarLi.classList.add("active");
//     } else {
//       navbarLi.classList.remove("active");
//     }
//   }
// }

document.getElementById("refineDiv").onclick = function(){
  // if (refineCaret.classList.contains("fa-caret-right") && locationContainer.style == "display: none"){
    if (refineCaret.classList.contains("fas fa-caret-right")){
    refineCaret.classList.remove("fas fa-caret-right");
    refineCaret.classList.add("fas fa-caret-down");
    locationContainer.style = "display: block";
    tagsContainer.style = "display: block";
  } else {
    refineCaret.classList.add("fas fa-caret-right");
    refineCaret.classList.remove("fas fa-caret-down");
    locationContainer.style = "display: none";
    tagsContainer.style = "display: none";
  }
}

decideButton.onclick = function () {

  // if decision is not refined by tags or location (i.e. caret points right)
  if (refineCaret.classList.contains("fas fa-caret-right")){
    for (i = 0; i < activities.length; i++){
      canDoThis.push(activities[i].activityName);
    }
    if (canDoThis.length > 1) {
      randomNumber = getRandomNumber();
    } else {
      decision.innerHTML = canDoThis;
    }
  } else { // if decision is refined by location and tags
    getActivitiesForLocation();
    getActivitiesWithTagsForLocation();
    if (canDoThis.length > 1) {
      randomNumber = getRandomNumber();
    } else {
      decision.innerHTML = canDoThis;
    }
  }

  
};

function getActivitiesForLocation() {
  setCheckedLocation();
  for (let activity of activities) {
    if (activity.location.includes(locationInput)) {
      activitiesForThisLocation.push(activity);
    }
  }
}

function setCheckedLocation() {
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      locationInput = radios[i].value;
      break;
    } 
  }
}

function setCheckedTags() {
  for (i = 0; i < tagCheckboxes.length; i++) {
    if (tagCheckboxes[i].checked) {
      tagsArray.push(tagCheckboxes[i].value);
    }
  }
}

function getActivitiesWithTagsForLocation() {
  setCheckedTags();
  for (let activityForThisLocation of activitiesForThisLocation) {
    for (let tag of tagsArray) {
      if (activityForThisLocation.tags.includes(tag)) {
        canDoThis.push(activityForThisLocation.activityName);
      }
    }
  }
}

function clearArrays(){
  tagsArray = [];
  activitiesForThisLocation = [];
  canDoThis = [];
}

function getAjaxObject() {
  var ajaxRequest;
  try {
    ajaxRequest = new XMLHttpRequest();
  } catch (e) {
    try {
      ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("Something went wrong");
        ajaxRequest = null;
      }
    }
  }
  return ajaxRequest;
}

function getRandomNumber() {
  let ajaxRequest = getAjaxObject();
  let url = "https://api.random.org/json-rpc/1/invoke";
  if (ajaxRequest != null) {
    ajaxRequest.open("POST", url);
    ajaxRequest.onreadystatechange = function () {
      if (ajaxRequest.readyState == 4) {
        let resultJSON = JSON.parse(ajaxRequest.responseText); // the result will be in json format.
        console.log(resultJSON);
        let randomNumber = parseInt(resultJSON.result.random.data);
        showDecision(randomNumber);
      }
    };
    data = {
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: {
        apiKey: "4093a042-4c25-4d6d-b73d-8f8a88cb53d3",
        n: 1,
        min: 1,
        max: canDoThis.length-1,
        replacement: true,
        base: 10,
      },
      id: 683489,
    };
    data = JSON.stringify(data);
    ajaxRequest.send(data);
  } // if (ajaxRequest != null)
}

function showDecision(randomNumber) {
let doThis = canDoThis[randomNumber];
decision.innerHTML = doThis;
clearArrays();
}

function uncheckCheckboxes(checkboxes){
  for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function showHideAddInput(checkbox, input){
  if (checkbox.checked){
    input.style = "display: inline-block";
  } else {
    input.style = "display: none";
  }
}

uncheckCheckboxes(tagCheckboxes);
// populateActivityList();



