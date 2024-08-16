const mongoose = require('mongoose');
const { ATLAS_DB_URL, NODE_ENV } = require('./serverConfig');

async function connectToDB(){

    try{
        if(NODE_ENV == "development"){
            await mongoose.connect(ATLAS_DB_URL)
        }
    } catch(e) {
        console.log('Unable to connect to the DB server');
        console.log(e);
    }
}

module.exports = connectToDB