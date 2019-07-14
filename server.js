const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require("fs");
const contents = fs.readFileSync("physicians.json");
const physiciansObj = JSON.parse(contents);
const app = express();
const {apiKey} = require('./key')
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


app.get('/api/find', (req, res) => {
    let name = req.query['name']
    console.log(req.query)
    name_list = name.split(" ")
    let phy = {}, first_name = '', mid_name = '', last_name = ''
    const len = name_list.length
    if(len >= 3){
        if(len === 3){
            if(name_list[len-1].toUpperCase() === 'JR' || name_list[len-1].toUpperCase() === 'SR'){
                first_name = name_list[0].toUpperCase()
                mid_name = ''
                last_name = name_list[1].toUpperCase()
                phy = physiciansObj.filter(p => p.first_name.toUpperCase() === first_name && p.mid_name.toUpperCase() === mid_name && p.last_name.toUpperCase() === (last_name + ' JR' || ' SR')) 
            }else{
                first_name = name_list[0].toUpperCase()
                mid_name = name_list[1].toUpperCase()
                last_name = name_list[2].toUpperCase()
                phy = physiciansObj.filter(p => p.first_name.toUpperCase() === first_name && p.mid_name.toUpperCase() === mid_name && p.last_name.toUpperCase() === last_name) 
            }
        }else if(len === 4){
            first_name = name_list[0].toUpperCase()
            mid_name = name_list[1].toUpperCase()
            last_name = name_list[2].toUpperCase()
            phy = physiciansObj.filter(p => p.first_name.toUpperCase() === first_name && p.mid_name.toUpperCase() === mid_name && p.last_name.toUpperCase() === (last_name + ' JR' || ' SR')) 
        }
    }else if(name_list.length == 2){
        first_name = name_list[0].toUpperCase()
        last_name = name_list[1].toUpperCase()
        phy = physiciansObj.filter(p => p.first_name.toUpperCase() === first_name && p.mid_name.toUpperCase() === mid_name && p.last_name.toUpperCase() === last_name)
    }else{
        res.send('')
        return 
    }
  
    if(phy.length === 0){
        res.send('')
        return 
    }

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



app.get('/api/physicians', (req, res) => {
    res.sendFile(path.join(__dirname, 'physicians.json'))
})



app.listen(port, () => {
    console.log('server is up on ' + port);
});


