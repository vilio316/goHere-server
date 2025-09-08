const express = require('express')
const app = express();
const cors = require('cors');
const axios = require("axios")

const corsOptions = {
    origin: ['http://localhost:5173']
};
const dotenv = require('dotenv')
dotenv.config()

const {searchByTxt, fetchByID} = require('./maps_requests')


app.use(cors(corsOptions))



app.get('/api', (req, res) => {
   
    res.json({"fruits" : ["a", "b", "c", "jackfruit"]});
})

//Text Search
app.get('/search/:query' , async (req, res)=> {
    const requestResults = await searchByTxt(req.params.query)
    res.json(
      requestResults
)
})

app.listen(8090, ()=> {
    console.log("Server started on port 8090");
});