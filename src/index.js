const baseUrl = 'https://ha-slutuppgift-chat-do.westling.workers.dev';

addEventListener('pageshow', init);

async function init(){

    const request = await fetch(`${baseUrl}/api/messages`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer N31fRWVMZCtwU0JeZnBQdVBjTmlOImRzcTAxfl08cz1xR2lyWGFJfmo5JC5RNSc=',
            'Content-type': ''
        }
    });
    const response = await request;
    console.log(response);

    // let messageContainer = document.getElementById("divFriendMessages");
    // for (let i = 0; i < response.length; i++){
    //     let div = document.createElement("div");
    //     div.innerHTML = 'User: ' + response[i].user + '' + response[i].message;
    //     messageContainer.appendChild(div);
    // }

}

function appendMessages(){
    const form = document.querySelector('form[name="append"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formInput = Object.fromEntries(formData);
        const url = new URL(form.action);
        const request = await fetch(`${baseUrl}/${url.pathname}`, {
            method: form.method,
            headers: {
                'Authorization': 'Bearer N31fRWVMZCtwU0JeZnBQdVBjTmlOImRzcTAxfl08cz1xR2lyWGFJfmo5JC5RNSc=',
                'Content-type': ''
            },
            body: JSON.stringify(formInput),
        });
        const response = await request.json();

        console.log(response);

        // let messageContainer = document.getElementById("divFriendMessages");
        // for (let i = 0; i < response.length; i++){
        //     let div = document.createElement("div");
        //     div.innerHTML = 'User: ' + response[i].user + '' + response[i].message;
        //     messageContainer.appendChild(div);
        // }

        //displayMessages(response);
        //return response.body;


    });

}
