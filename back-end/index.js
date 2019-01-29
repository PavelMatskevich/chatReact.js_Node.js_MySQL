const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const connection = mysql.createConnection({
	host: "localhost",
	user: "pawel",
	password: "pawel",
	database: "chat"
});


connection.connect(err => {
	if (err) throw err;
	return err;
});

app.get("/", (request, response) => {
	connection.query("SELECT * FROM tableForChat", (err, result) => {
		if (err) {
			return response.send(err);
		} else {
			return response.send({data: result});
		}
	});
});

app.get("/add", (request, response) => {
	const {email, text} = request.query;
		connection.query(`INSERT INTO tableForChat (email, text) VALUES('${email}', '${text}')`, (err, result) => {
			if (err) {
				return response.send(err);
			} else {
				return response.send('successfully added');
			}
 		});
});

/*app.get("/api/messages/list/0", (request, response) => {
	connection.query("SELECT * FROM tableForChat", (err, result) => {
		if (err) {
			return response.send(err);
		} else {
			return response.send({data: result.slice(0, 10)});
		}
	});
});*/


app.listen(3600, () => {
	console.log(`Server listening on port 3600`);
});