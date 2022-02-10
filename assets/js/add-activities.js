let addActivitiesMainDiv = document.getElementById("addActivitiesMainDiv");
addActivitiesMainDiv.style = "display: none"
let mainDivs = document.getElementsByClassName("main");
let navbarLis = document.getElementsByClassName("navbarLi");
let decideNavbarLi = document.getElementById("decideNavbarLi");
decideNavbarLi.classList.add("active");
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



function clearArrays(){
  tagsArray = [];
  activitiesForThisLocation = [];
  canDoThis = [];
}


saveButton.onclick = function(){
  allActivitiesList.style = "text-align: left";
  newActivityName = addActivityNameInput.value;
  addLocationsToNewActivity();
  addTagsToNewActivity();
  console.log(`before push, there were ${activities.length} activities`);
  activities.push({
    activityName: newActivityName,
    location: newLocationsArray,
    tags: newTagsArray
  });
  console.log(`after push, there are ${activities.length} activities`);
  populateActivityList(); // adds to dom and array, adds delete button functionality
  console.log(`after populateList, there are ${activities.length} activities`);
  allActivitiesDiv.style = "padding: 0px";
  addActivityNameInput.value = "";
  addOtherLocationInput.value = "";
  addOtherTagInput.value = "";
  sayActivitySaved();
  uncheckCheckboxes(addLocationCheckboxes);
  uncheckCheckboxes(addTagCheckboxes);
}


function sayActivitySaved(){
  addActivityFeedback.innerHTML = "Activity was saved!";
  setTimeout(function(){ 
    addActivityFeedback.innerHTML = "";
   }, 2000);
}

function uncheckCheckboxes(checkboxes){
  for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}
function addLocationsToNewActivity(){
  for (i = 0; i < addLocationCheckboxes.length; i++) {
    let addLocationCheckbox = addLocationCheckboxes[i];
    if (addLocationCheckbox.checked) {
      if (addLocationCheckbox.value == "addAtWork"){
        newLocationsArray.push("atWork");
      } else if (addLocationCheckbox.value == "addAtHome"){
        newLocationsArray.push("atHome");
      } else if (addLocationCheckbox.value == "addOtherLocation"){
        newLocationString = addOtherLocationInput.value;
        newLocationStringCondensed = (newLocationString.split(" ").join("")).trim();
        newLocationsArray.push(newLocationStringCondensed);
        addNewOptionToUI(newLocationStringCondensed, newLocationString, locationRadiosDiv, "radio", "radios", "location");
      }
    }
  }
}

function addTagsToNewActivity(){
  for (i = 0; i < addTagCheckboxes.length; i++) {
    let addTagCheckbox = addTagCheckboxes[i];
    if (addTagCheckbox.checked) {
      if (addTagCheckbox.value == "addFun"){
        newTagsArray.push("fun");
      } else if (addTagCheckbox.value == "addHousework"){
        newTagsArray.push("housework");
      } else if (addTagCheckbox.value == "addToDo"){
        newTagsArray.push("toDo");
      } else if (addTagCheckbox.value == "addOtherTag"){
        newTagString = addOtherTagInput.value;
        newTagStringCondensed = (newTagString.split(" ").join("")).trim();
        newTagsArray.push(newTagStringCondensed);
        addNewOptionToUI(newTagStringCondensed, newTagString, tagCheckboxesDiv, "checkbox", "checkboxes", newTagStringCondensed + "checkbox",  );
      }
    }
  }
}

addOtherTagCheckbox.onclick = function(){
  showHideAddInput(addOtherTagCheckbox, addOtherTagInput);
}

addOtherLocationCheckbox.onclick = function(){
  showHideAddInput(addOtherLocationCheckbox, addOtherLocationInput);
}

function addNewOptionToUI(newStringCondensed, newString, divToUpdate, inputType, classToUpdate, inputName){
    divToUpdate.innerHTML += `<input type="${inputType}" id="${newStringCondensed}${inputType}" class = ${classToUpdate}" name="${inputName}" value="${newStringCondensed}"><label for="${newStringCondensed}">&nbsp${newString}</label><br>`;

}

function showHideAddInput(checkbox, input){
  if (checkbox.checked){
    input.style = "display: inline-block";
  } else {
    input.style = "display: none";
  }
}

console.log("HI");
uncheckCheckboxes(tagCheckboxes);




