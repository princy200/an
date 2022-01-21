const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const ModelSchema = mongoose.Schema ({
    id:Number,
    firstName:String,
    lastName:String,
    email: String,
    password: String,
});
module.exports = mongoose.model('Model', ModelSchema);