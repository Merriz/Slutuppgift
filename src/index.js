const baseUrl = 'https://ha-slutuppgift-chat-do.westling.workers.dev';

addEventListener('pageshow', init);
//setInterval(init, 10000);
async function init(){

    const request = await fetch(`${baseUrl}/api/messages`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer N31fRWVMZCtwU0JeZnBQdVBjTmlOImRzcTAxfl08cz1xR2lyWGFJfmo5JC5RNSc=',
            'Content-type': ''
        }
    }).then((response) => response.json()).then((data) => {
        return data
    });

    request.messages.sort((a, b) => a.timestamp - b.timestamp);

    const friendMessageContainer = document.getElementById("divFriendMessages");
    const userMessageContainer = document.getElementById("divUserMessages");
    const lastTimestamp = request.messages.at(-1).timestamp;
    localStorage.setItem('last', lastTimestamp);
    console.log(lastTimestamp);
    for (let i = 0; i < request.messages.length; i++){
        let div = document.createElement("div");
        div.innerHTML = 'User: ' + request.messages[i].user + '' + request.messages[i].message;
        if (request.messages[i].user === "Johan") {
            friendMessageContainer.appendChild(div);
        }
        else {
            userMessageContainer.appendChild(div);
        }
    }
}

addEventListener('submit', appendMessages);

async function appendMessages(event) {
    event.preventDefault();

    const message = document.getElementById('inputMessage').value;
    console.log(formInput);
    await fetch(`${baseUrl}/api/messages/append`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer N31fRWVMZCtwU0JeZnBQdVBjTmlOImRzcTAxfl08cz1xR2lyWGFJfmo5JC5RNSc=',
            'Content-type': ''
        },
        body: JSON.stringify({message})
    });
}

