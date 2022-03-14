const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeDevice = new Schema({
    Title: {
        type: String
    }
});

module.exports = mongoose.model("TypeDevice", TypeDevice);