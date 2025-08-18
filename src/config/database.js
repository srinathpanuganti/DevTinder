const mongoose = require('mongoose');


const dbConnect = async () => {
    await mongoose.connect("mongodb+srv://srinathpanuganti:cdvSgdTp0S9Hy0A4@nodejs.nlopwza.mongodb.net/devTinder");  
}

module.exports = dbConnect;

