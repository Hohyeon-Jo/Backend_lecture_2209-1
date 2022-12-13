const express  = require('express');
const app = express();

//use - 무엇인가를 사용하겠디. Middleware 적용
// http method - get, post, put, delete, all
//listen - 대기

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

//http://localhost:3000/query?id=123
app.get('/query', (req, res) => {
    const id = req.query.id;        // ?id = 123
    res.send(`<h1/query: id - ${id}</h1>`);
});

// http://localhost:3000/params/id/123
app.get('/params/id/:id', (req, res) => {
    const id =req.params.id;
    res.send(`<h1>/parpams/id: id - ${id}</h1>`)
})

app.get('*', (req,res) => {
    res.status(404).send('Path not found.');
});
app.listen(3000, () => {
    console.log('Server is runnig at http://127.0.0.1:3000');
});
