// fetch("http://localhost:3000", {
//     method: ['GET', 'POST', 'PUT', 'DELETE']
// });

// const getButton = document.getElementById("get");
// const postButton = document.getElementById("post");

// getButton.addEventListener("click", () => {
//     fetch("http://localhost:3000/users")
//     .then(res => res.json())
//     .then(resJSON => console.log(resJSON))
//     .catch(err => console.log(err));
// });

// const getData = async () => {
//     const localhost = document.getElementById("localhost").value;
//     await fetch(`${localhost}` ,{method:'GET'})
//     .then(response => response.json())
//     .then(data => console.log(data));
// }

function onGet(version) {
    const url = "http://localhost:3000/" + version + "/messages";
    var headers = {}
    
    fetch(url, {
        method : "GET",
        mode: 'cors',
        headers: headers
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.error)
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('messages').value = data.messages;
    })
    .catch(function(error) {
        document.getElementById('messages').value = error;
    });
}