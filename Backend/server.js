const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database: 'signup'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});


app.post('/signup', (req, res) =>{
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
    req.body.name,
    req.body.email,
    req.body.password
 ]
    db.query(sql, values, (err, data) => {
        if(err) 
        { 
            console.error('Error executing query:', err);
            return res.json(err);
        }
        return res.json(data);
    })
} )

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE name = ? AND password = ?";
    const values = [
        req.body.username,
        req.body.password
    ];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

app.listen(8081,()=> {
    console.log("Listening");
})
