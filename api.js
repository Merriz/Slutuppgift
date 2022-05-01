import http from 'http';

const server = http.createServer(apiHandleRequest);

server.listen(4000);

async function apiHandleRequest(request, response){
    const buffers = [];

    for await (const chunk of request){
        buffers.push(chunk);
    }
    const body = Buffer.concat(buffers).toString();
    const data = JSON.parse(body);

    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.statusCode = 200;
    response.end(JSON.stringify({
        success: true,
        data
    }));
}