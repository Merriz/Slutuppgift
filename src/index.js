const baseUrl = 'https://ha-slutuppgift-chat-do.westling.workers.dev';
const bearer = 'Bearer N31fRWVMZCtwU0JeZnBQdVBjTmlOImRzcTAxfl08cz1xR2lyWGFJfmo5JC5RNSc=';
const username = 'Dennis&Gustav';
addEventListener('pageshow', init);

//setInterval(getUpdateStatus, 10000);

async function init(){
    const request = await fetch(`${baseUrl}/api/messages`, {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-type': ''
        }
    }).then((response) => response.json()).then((data) => {
        return data
    });

    request.messages.sort((a, b) => a.timestamp - b.timestamp);

    const messageBox = document.getElementById("allMessagesBox");

    console.log(request.last);
    localStorage.setItem('last', request.last);

    for (let i = 0; i < request.messages.length; i++){
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.innerHTML = formatUnixTimestamp(request.messages[i].timestamp) + ' ' + request.messages[i].user + ': ' + request.messages[i].message + '<br>';
        if (request.messages[i].user !== username) {
            div.classList.add('friendMessages');
        }
        else {
            div.classList.add('userMessages');
        }
        div.appendChild(p);
        messageBox.appendChild(div);
    }
}

addEventListener('submit', appendMessages);

async function appendMessages(event) {
    event.preventDefault();

    const message = document.getElementById('inputMessage').value;

    await fetch(`${baseUrl}/api/messages/append`, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-type': ''
        },
        body: JSON.stringify({message:message, user:username})
    });
}

function formatUnixTimestamp(unix_timestamp) {
    const date = new Date(unix_timestamp);
    return date.toLocaleDateString("en-GB");
}

async function getUpdateStatus() {
    await fetch(`${baseUrl}/api/messages/updated`, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-type': ''
        },
        body: localStorage.getItem('last')
    }).then((response) => response.json()).then((data) => {
        console.log(data)
        return data
    });
}