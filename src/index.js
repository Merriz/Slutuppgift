const baseUrl = 'http://localhost:4000';

addEventListener('DOMContentLoaded', init);

function init(){
    const form = document.querySelector('form[name="hej"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formInput = Object.fromEntries(formData);
        const url = new URL(form.action);
        const request = await fetch(`${baseUrl}/${url.pathname}`, {
            method: form.method,
            body: JSON.stringify(formInput)
        });
        const response = await request.text();

        console.log(response);
    });
}