const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const application = express();
application.use(bodyParser.urlencoded({ extended: true}))
application.use(cors());
application.use(bodyParser.json())
const dbconfiguration = require('./db/config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
    mongoose.connect(dbconfiguration.url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        
        }).then(() => {
            console.log("successfuly connected");
        }).catch(err => {
            console.log('couldnt connect'+err);
            process.exit();
        });
        application.get('/', (req, res) => {
            res.json({"output" : "welcome to new node training"});
        });
        require('./routes/routes.js')(application);
        application.listen(8000, () => {
            console.log("server is listening on 8000");
        });
