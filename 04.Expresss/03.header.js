const express  = require('express');
const app = express();

//use - 무엇인가를 사용하겠디. Middleware 적용
// http method - get, post, put, delete, all
//listen - 대기

app.get('/', (req, res) => {
    const agent = req.header('User-Agent');
    const host = req.header('Host');
    res.send(`<h3>User-Agent: ${agent}</h3>`);
    res.send(`<h3>Host: ${host}</h3>`);
});

app.get('/set/:key/value', (req, res))


app.get('*', (req,res) => {
    res.status(404).send('Path not found.');
});
app.listen(3000, () => {
    console.log('Server is runnig at http://127.0.0.1:3000');
});
