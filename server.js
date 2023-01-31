const express = require("express");
const { resolve } = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(resolve(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(resolve(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(resolve(__dirname, "public", "notes.html"));
});

app.use("/api", require("./routes/api"));

app.get("*", (req, res) => {
	res.sendFile(resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
