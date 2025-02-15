const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    dm.getList(rows => {
        ejs.renderFile('views/22.index.ejs', {
            rows                                // {rows: rows}
        }, (err, html) => {
            res.send(html);
        });
    });
});
app.get('/create', (req, res) => {
    ejs.renderFile('views/22.create.ejs', (err, html) => {
        res.send(html);
    });
});
app.post('/create', (req, res) => {
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player, backNo, position], () => {
        res.redirect('/');
    });
});
app.get('/update', (req, res) => {  // http://localhost:3000/update?id=123
    const id = parseInt(req.query.id);
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        ejs.renderFile('views/22.update.ejs', {
            id, player, backNo, position    // id:id, player:player, backNo:backNo, position:position
        }, (err, html) => {
            res.send(html);
        });
    });
});
app.post('/update', (req, res) => {
    const id = req.body.id;
    const player = req.body.player;
    const backNo = req.body.backNo;
    const position = req.body.position;
    dm.updatePlayer([player, backNo, position, id], () => {
        res.redirect('/');
    });
});
app.get('/delete', (req, res) => {      // http://localhost/delete?id=123
    const id = parseInt(req.query.id);
    ejs.renderFile('views/22.delete.ejs', {
        id
    }, (err, html) => {
        res.send(html);
    });
});
app.get('/deleteConfirm', (req, res) => {
    const id = parseInt(req.query.id);
    dm.deletePlayer(id, () => {
        res.redirect('/');
    });
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found.');
});
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});