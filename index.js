const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/save",(req,res)=>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("sms2oct23");
	const coll = db.collection("student");
	const record = {"_id":req.body.rno, "name":req.body.name, "marks":req.body.marks};
	coll.insertOne(record)
	.then(result => res.send(result))
	.catch(error => res.send(error));
})

app.get("/gd", (req, res) =>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("sms2oct23");
	const coll = db.collection("student");
	coll.find({}).toArray()
	.then(result => res.send(result))
	.catch(error => res.send(error));
})

app.delete("/remove", (req, res) =>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("sms2oct23");
	const coll = db.collection("student");
	const data = {"_id":req.body.rno};
	coll.deleteOne(data)
	.then(result => res.send(result))
	.catch(error => res.send(error));
})

app.listen(9000, () => {console.log("ready @9000");});