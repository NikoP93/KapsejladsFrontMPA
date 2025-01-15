import{getIpAdress,restDelete,fetchAnyUrl,postObjectAsJson} from "./module.js";

const popup = document.getElementById("modal1")
const popupAdd = document.getElementById("modal2")
const raceID = window.localStorage.getItem("RaceID");


async function fetchRaceResults(){

    const url = getIpAdress() + "/resultsbyraceid/" + raceID
    const data = await fetchAnyUrl(url);
    tableBody.innerHTML = "";
    data.forEach(putDataInTable)
    console.log(data)
}

function putDataInTable(data, index) {
    const tr = document.createElement("tr");

    tr.innerHTML =
        "<td>" + data.resultID + "</td>" +
        "<td>" + data.sailboat.boatName + "</td>" +
        "<td>" + data.position + "</td>" +
        "<td>" + data.points + "</td>" +
        "<td>" + data.status + "</td>" +
        "<td>" +
        "<button class='button-style' id='editBtn" + index + "' value='" + data + "'>Rediger</button>" +
        "</td>" +
        "<td>" +
        "<button class='button-style' id='deleteBtn" + index + "' value='" + data + "'>Slet</button>" +
        "</td>"
    tr.row=index;

    tableBody.appendChild(tr);

    const editBtn = document.getElementById("editBtn" + index)
    const deleteBtn = document.getElementById("deleteBtn" + index)

    deleteBtn.addEventListener("click", () => {
        deleteResult(data)
    })

    editBtn.addEventListener("click", () => {
        editResult(data)
    })
}

const addBtn = document.getElementById("addResultBtn")
addBtn.addEventListener("click",addResult)

function editResult(data){
    popup.showModal()

    const positionField = document.getElementById("position")
    positionField.value = data.position

    const pointsField = document.getElementById("points")
    pointsField.value = data.points

    const statusField = document.getElementById("status")
    statusField.value = data.status

    console.log("Edit result data: ", data);

    const submitResult = document.getElementById("updateRaceForm")


    submitResult.addEventListener("submit", () => {
        updateResult2(data)
    })
}

async function updateResult2(data){
    const positionField = document.getElementById("position")
    data.position = positionField.value

    const pointsField = document.getElementById("points")
    data.points = pointsField.value

    const statusField = document.getElementById("status")
    data.status = statusField.value

    console.log("Dette er det nye object: " + data)
    const url = getIpAdress() + "/result/" + data.resultID;
    console.log("dette er url: " + url)
    const response = await postObjectAsJson(url, data,"PUT")
    if(!response.ok){
        alert("Det gik ikke godt med at update")
    } else{
        alert("Data er opdateret")
        popup.close()
        fetchRaceResults()
    }
}



async function updateResult(){
    const form = document.getElementById("updateRaceForm")
    const formData = new FormData(form)
    const newObject = Object.fromEntries(formData.entries())

    const updateRequest = {
        "resultID": newObject.resultID,
        "position": newObject.position,
        "points": newObject.points,
        "status": newObject.status,
        "sailboat": {
            boatID: newObject.boatID,
        },
        "race":{
            "raceID":newObject.raceID,
        }
    }
    console.log("Dette er det nye object: " + newObject)
    const url = getIpAdress() + "/result/" + newObject.resultID;
    console.log("dette er url: " + url)
    const response = await postObjectAsJson(url, updateRequest,"PUT")
    if(!response.ok){
        alert("Det gik ikke godt med at update")
    } else{
        alert("Data er opdateret")
        popup.close()
        fetchRaceResults()
    }
}

async function addResult() {
    const raceURL = getIpAdress() + "/race/" + raceID
    console.log("Dette er raceURL" + raceURL)
    const race = await fetchAnyUrl(raceURL)
    console.log("Dette er race: " + race)

    const boatType = race.boatType
    const boatsURL = getIpAdress() + "/sailboats/" + boatType
    const boats = await fetchAnyUrl(boatsURL)
    console.log("Dette er de både der er blevet fetched: " + boats)

    const boatSelect = document.getElementById("boats")

    boats.forEach(boat => {
        const op = document.createElement("option")
        op.setAttribute("value", boat.boatID)
        op.innerHTML = boat.boatName
        boatSelect.appendChild(op)
    });

    popupAdd.showModal()

}

async function handleFormSubmit(event){
    event.preventDefault()

    const position = document.getElementById("position1").value
    const points = document.getElementById("points1").value
    const status = document.getElementById("status1").value
    const boat = document.getElementById("boats").value

    const resultData = {
        position: position,
        points: points,
        status: status,
        race: {raceID: raceID},
        sailboat: {boatID: boat},
    }

    const url = getIpAdress() + "/result"

    const response = await postObjectAsJson(url, resultData,"POST")
    if(!response.ok){
        alert("Kunne tilføje resultat")
    }else{
        alert("Data er opdateret")
        popupAdd.close;
        fetchRaceResults()
    }

}

const addResultForm = document.getElementById("AddRaceForm")
addResultForm.addEventListener("submit", handleFormSubmit);

async function deleteResult(data){
    const url = getIpAdress() + "/result/" + data.resultID
    const response = await restDelete(url)
    if(!response.ok){
        alert("Kunne ikke slette result")
    } else{
        fetchRaceResults()
    }
}

const closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", () => {
    popup.close()
})


fetchRaceResults()