function getIpAdress(){
    return "http://localhost:8080";
}

function fetchAnyUrl(url){
    return fetch(url).then(response => response.json());
}

async function postObjectAsJson(url,object,httpVerbum){
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions);
    return response;
}

async function restDelete(url){
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions);
    return response;
}

export {fetchAnyUrl,postObjectAsJson,restDelete,getIpAdress}