const baseUrl = 'https://ha-slutuppgift-chat-do.westling.workers.dev';
const bearer = 'Bearer N31fRWVMZCtwU0JeZnBQdVBjTmlOImRzcTAxfl08cz1xR2lyWGFJfmo5JC5RNSc=';
const username = 'Dennis&Gustav';
let msgTstamp;
let userTag;
let msgBody;
let limiter = '';

addEventListener('pageshow', init);
setInterval(getUpdateStatus, 2000);
addEventListener('submit', appendMessages);

async function init(){
    const request = await fetch(`${baseUrl}/api/messages${limiter}`, {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-type': ''
        },
    }).then((response) => response.json()).then((data) => {
        return data
    });

    request.messages.sort((a, b) => a.timestamp - b.timestamp);

    const messageBox = document.getElementById("allMessagesBox");
    localStorage.setItem('last', request.last);
    const fragment = new DocumentFragment();

    for (let i = 0; i < request.messages.length; i++){
        let container = document.createElement("article");
        let content = document.createElement("p");

        msgTstamp = request.messages[i].timestamp;
        userTag = request.messages[i].user+":";
        msgBody = request.messages[i].message;
        content.innerHTML = formatUnixTimestamp(msgTstamp) +`<br> ${userTag} ${msgBody} <br>`;

        if (request.messages[i].user !== username) {
            container.classList.add('friendMessages','message');
        }
        else {
            container.classList.add('userMessages','message');
        }
        container.appendChild(content);
        fragment.appendChild(container);
    }
    messageBox.appendChild(fragment);
}

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
    document.getElementById('inputMessage').value = '';
}

function formatUnixTimestamp(unixTimestamp) {
    return new Intl.DateTimeFormat('sv-FI', {dateStyle: 'short', timeStyle: 'short'}).format(unixTimestamp);
}

async function getUpdateStatus() {
    const request = await fetch(`${baseUrl}/api/messages/updated`, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-type': ''
        },
        body: JSON.stringify({last:Number(localStorage.getItem('last'))})
    });
    const response = await request.json();

    if (!response.updated){
        limiter = '?limit=1';
        await init();
    }
}