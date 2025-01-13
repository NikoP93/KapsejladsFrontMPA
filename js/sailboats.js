import {getIpAdress, fetchAnyUrl, postObjectAsJson, restDelete} from "./module.js";

console.log("Jeg er i sailboats")
const popup = document.querySelector('dialog');


async function fetchBoats() {
    const url = getIpAdress() + "/sailboats"
    console.log("Fetching URL " + url)
    const data = await fetchAnyUrl(url)
    console.log("Fetching data " + data)
    tableBody.innerHTML = ""
    data.forEach(putDataInTable)

}

function putDataInTable(data, index) {
    const tr = document.createElement("tr");

    tr.innerHTML =
        "<td>" + data.boatID + "</td>" +
        "<td>" + data.boatType + "</td>" +
        "<td>" + data.boatName + "</td>" +
        "<td>" +
        "<button class='button-style' id='editBtn" + index + "' value='" + data + "'>Rediger</button>" +
        "</td>" +
        "<td>" +
        "<button class='button-style' id='racesBtn" + index + "' value='" + data + "'>Resultater</button>" +
        "</td>" +
        "<td>" +
        "<button class='button-style' id='deleteBtn" + index + "' value='" + data + "'>Slet</button>" +
        "</td>"

    tr.row = index

    tableBody.appendChild(tr)

    const editBtn = document.getElementById("editBtn" + index)
    const racesBtn = document.getElementById("racesBtn" + index)
    const deleteBtn = document.getElementById("deleteBtn" + index)

    editBtn.addEventListener("click", () => {
        editBoat(data)
    })

    deleteBtn.addEventListener("click", () => {
        deleteBoat(data)
    })

}

const closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", () => {
    popup.close()
})

function editBoat(data){
    popup.showModal()
    console.log("Edit boat")

    const idField = document.getElementById("boatID")
    idField.value = data.boatID

    const nameField = document.getElementById("boatName")
    nameField.value = data.boatName

    const boatTypeField = document.getElementById("boatType")
    boatTypeField.value = data.boatType

    const submitBoat = document.getElementById("boatForm")

    submitBoat.addEventListener("submit", updateBoat )
}

 async function updateBoat(){
    const form = document.getElementById("boatForm")
    const formData = new FormData(form)
    const newObject = Object.fromEntries(formData.entries())
    const url = getIpAdress() + "/sailboat/" + newObject.boatID
    const response = await postObjectAsJson(url, newObject,"PUT")
    if(!response.ok){
        alert("Det gik ikke godt med at update")
    }else{
        alert("Data er opdateret")
        popup.close()
        fetchBoats()
    }
    return response
}


async function deleteBoat(data){
    const confirmDelete = confirm("er du sikker på du vil slette " + data.boatName)
    if (confirmDelete) {
        const url = getIpAdress() + "/sailboat/" + data.boatID
        const response = await restDelete(url)
        if (!response.ok) {
            alert("Kunne ikke slette")
        } else {
            fetchBoats()
        }
        return response
    }
}

fetchBoats()



