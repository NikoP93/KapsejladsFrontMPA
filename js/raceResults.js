import{getIpAdress,restDelete,fetchAnyUrl,postObjectAsJson} from "./module.js";

const popup = document.querySelector("dialog")

async function fetchRaceResults(){
    const raceID = window.localStorage.getItem("RaceID");
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

function editResult(data){
    popup.showModal()



    const idField = document.getElementById("resultID")
    idField.value = data.resultID;

    const boatIDField = document.getElementById("boatID")
    boatIDField.value = data.sailboat.boatID

    const raceIDField = document.getElementById("raceID")
    raceIDField.value = data.race.raceID

    const positionField = document.getElementById("position")
    positionField.value = data.position

    const pointsField = document.getElementById("points")
    pointsField.value = data.points

    const statusField = document.getElementById("status")
    statusField.value = data.status

    console.log("Edit result data: ", data);

    const submitResult = document.getElementById("updateRaceForm")

    submitResult.addEventListener("submit",updateResult)
}

async function updateResult(){
    const form = document.getElementById("updateRaceForm")
    const formData = new FormData(form)
    const newObject = Object.fromEntries(formData.entries())
    console.log("Dette er det nye object: " + newObject)
    const url = getIpAdress() + "/result/" + newObject.resultID;
    console.log("dette er url: " + url)
    const response = await postObjectAsJson(url, newObject,"PUT")
    if(!response.ok){
        alert("Det gik ikke godt med at update")
    } else{
        alert("Data er opdateret")
        popup.close()
        fetchRaceResults()
    }
}

async function deleteResult(data){
    const url = getIpAdress() + "/result/" + data.resultID
    const response = await restDelete(url)
    if(!response.ok){
        alert("Kunne ikke slette result")
    } else{
        fetchRaceResults()
    }
}


fetchRaceResults()