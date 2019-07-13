const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require("fs");
const contents = fs.readFileSync("physicians.json");
const physiciansObj = JSON.parse(contents);
const app = express();
const apiKey = 'AIzaSyDJ_3zDS3YqZ0RkN3M2NMZ7zSfpBY0qN2g'
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/find', (req, res) => {
    let name = req.query['name']
    console.log(req.query)
    name_list = name.split(" ")
    let phy = {}, first_name = '', mid_name = '', last_name = ''
    if(name_list.length === 3){
        first_name = name_list[0]
        mid_name = name_list[1]
        last_name = name_list[2]
        phy = physiciansObj.filter(p => p.first_name === first_name && p.mid_name === mid_name && p.last_name ===last_name)
    }else if(name_list.length == 2){
        first_name = name_list[0]
        last_name = name_list[1]
        phy = physiciansObj.filter(p => p.first_name === first_name && p.mid_name === mid_name && p.last_name === last_name)
    }else{
        res.send('wrong format')
    }

    console.log('found:', phy)
    const location = `${phy[0].address}, ${phy[0].city}, ${phy[0].state}`
    console.log(location)
    const encodedAddr = encodeURIComponent(location)
    const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=${apiKey}`
    axios.get(geoURL).then((result) => {
        if (result.data.status === 'OK') {
            const geo_info = result.data.results[0]['geometry']['location']
            res.send(geo_info)
            return
        }
    })
})



app.listen(port, () => {
    console.log('server is up on ' + port);
});


