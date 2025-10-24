const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoute')
app.use(express.json())

const corsOptions = {
    origin: ['http://localhost:5173'], credentials: true
};
app.use(cors(corsOptions));
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

async function mainMongConnect(){
    await mongoose.connect(process.env.MONGO_STRING).then(console.log("Connected!"))
}

mainMongConnect()

const {searchByTxt} = require('./maps_requests');
const { searchFunction, suggestLocation } = require('./geminiSetup');
app.use(cookieParser())

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

app.get('/distance/:sourceLat/:sourceLong/:destLat/:destLong', async (req, res) => {
    const getDistanceFromMapbox = await fetch(`
        https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${req.params.sourceLat},${req.params.sourceLong};${req.params.destLat},${req.params.destLong}?access_token=${process.env.MAPBOX_2}&annotations=distance,duration`)
    const results = await getDistanceFromMapbox.json()
    res.json(results)
} )

app.get('/ai/:search', async (req, res) => {
    const result = await searchFunction(req.params.search);
    res.json(JSON.parse(result))
})

app.get('/ai/suggest/:query', async (req, res) => {
    const suggested_values = await suggestLocation(req.params.query)
    res.json(JSON.parse(suggested_values))
})

app.get('/geocoded_location/:lat/:long', async(req, res) => {
    const location_details = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.long}&key=${process.env.PLACES_API_KEY}`)
    const location_res = await location_details.json()
    res.json(location_res)
})

app.use('/auth', authRoute)

app.listen(8090, ()=> {
    console.log("Server started on port 8090");
});