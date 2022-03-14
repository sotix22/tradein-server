const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Retails = new Schema({
    Code: {
        type: String
    },
    Iniciators: {
        type: Array
    },
    Title: {
        type: String
    },
    Brand: {
        type: String
    }
});

module.exports = mongoose.model("Retails", Retails);