import{getIpAdress,fetchAnyUrl} from "./module.js";

async function fetchRaces(){
  const url = getIpAdress() + "/races"
  console.log(url)
  const data = await fetchAnyUrl(url);
  raceTableBody.innerHTML = ""
  data.forEach(putRaceDataInTable)
}

function putRaceDataInTable(data, index) {
  const tr = document.createElement("tr");

  tr.innerHTML =
      "<td>" + data.raceID + "</td>" +
      "<td>" + data.date + "</td>" +
      "<td>" + data.boatType + "</td>" +
      "<td>" +
      "<td>" +
      "<button class='button-style' id='editBtn" + index + "' value='" + data + "'>Se Resultat</button>" +
      "</td>"

  tr.row=index;

  raceTableBody.appendChild(tr);

  const tilføjResultatBTN = document.getElementById("editBtn" + index);

  tilføjResultatBTN.addEventListener('click', () => {
  tilføjResultat(data)
  })
}

function tilføjResultat(data){
console.log("Jeg er i tilføjResultat")
window.localStorage.setItem("RaceID", data.raceID)
  window.location.href = "raceResult.html"
}


fetchRaces()