const express = require("express");
const { resolve } = require("path");
const crypto = require("crypto");
const { readFile, writeFile } = require("fs/promises");

const getId = () => {
	return crypto.randomBytes(16).toString("hex");
};

async function getNotesData() {
	return JSON.parse(
		await readFile(resolve(__dirname, "..", "db", "db.json"), "utf-8")
	);
}

async function writeNotesData(filtered) {
	await writeFile(
		resolve(__dirname, "..", "db", "db.json"),
		JSON.stringify(filtered)
	);
}

const route = express.Router();

route.use(express.json());

route.post("/notes", async (req, res) => {
	const note = req.body;
	note.id = getId();
	const json = await getNotesData();
	json.push(note);
	writeNotesData(json);

	res.sendStatus(200);
});

route.get("/notes", (req, res) => {
	res.sendFile(resolve(__dirname, "..", "db", "db.json"));
});

route.delete("/notes/:id", async (req, res) => {
	const id = req.params.id;
	const json = await getNotesData();
	const filtered = json.filter((note) => note.id !== id);
	await writeNotesData(filtered);
	res.sendStatus(200);
});

module.exports = route;
