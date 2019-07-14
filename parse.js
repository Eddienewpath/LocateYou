const csvFilePath = './dataset.csv'
const fs = require('fs');
const csv = require('csvtojson')
// let mongoose = require('mongoose');
// let { Physician } = require('./models/physician')
// mongoose.connect('mongodb://localhost/Affine_challenge', { useNewUrlParser: true });

let init_db = function(){
    csv().fromFile(csvFilePath).then((jsonObj) => {
        const table = []
        for(const physician of jsonObj){
            let first_name = physician['Physician_First_Name']
            let mid_name = physician['Physician_Middle_Name']
            let last_name = physician['Physician_Last_Name']
            let address = physician['Recipient_Primary_Business_Street_Address_Line1']
            let city = physician['Recipient_City']
            let state = physician['Recipient_State']
            let zipcode = physician['Recipient_Zip_Code']
            
            const physicianObj = {
                first_name,
                mid_name,
                last_name,
                address,
                city,
                state,
                zipcode
            }
            table.push(physicianObj)
        }
        const json = JSON.stringify(table);
        fs.writeFile('physicians.json', json, 'utf8', () => console.log('here?'));
    })
}

init_db()

module.exports = init_db

