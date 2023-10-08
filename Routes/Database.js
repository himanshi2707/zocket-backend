const express = require("express");
const dbRouter = express.Router();

const createDB = require("../Database/createDB");
const createTables = require("../Database/create-table");

const {storeIntoDb} = require("../Controllers/dataHandler");
const {getCampaign} = require("../Controllers/dataHandler");

dbRouter.get("/create-db", (req, res) => {
  createDB().then((result) => {
    if (result) res.status(201).json({ message: result });
  });
});

dbRouter.get("/create-tables", (req, res) => {
  createTables().then((result) => {
    res.status(201).json({ message: result });
  });
});

dbRouter.post("/storeIntoDb", storeIntoDb);
dbRouter.get("/getCampaign", getCampaign)

module.exports = dbRouter;