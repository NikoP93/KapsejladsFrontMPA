import{getIpAdress,restDelete,fetchAnyUrl,postObjectAsJson} from "./module.js";

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
        "<td>" +
        "<button class='button-style' id='racesBtn" + index + "' value='" + data + "'>Resultater</button>" +
        "</td>" +
        "<td>" +
        "<button class='button-style' id='deleteBtn" + index + "' value='" + data + "'>Slet</button>" +
        "</td>"
    tr.row=index;

    tableBody.appendChild(tr);

    const editBtn = document.getElementById("editBtn" + index)
    const deleteBtn = document.getElementById("deleteBtn" + index)
}

fetchRaceResults()