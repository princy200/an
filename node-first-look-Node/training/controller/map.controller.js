const Model = require('../model/map.model.js');
exports.create = (req, res) => {
    if (!req.body.firstName) {
        return res.status(400).send({
            Message: "Content must"
        });
    }

    const toSave = new Model({
        id:req.body.id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        // title: req.body.title || "Untitled Note", 
        // content: req.body.content
    });

    // Save Note in the database
    toSave.save()
    .then(data => {
        res.send("stored");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
exports.listone = (req, res) => {
    Model.findById(req.params.id)
    .then(toSave => {
        if (!toSave) {
            return res.status(404).send({
                message:"Id not found" + req.params.id
            });
        }
        res.send(toSave);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message:"not found"
            });
        }
        return res.status(500).send({
            message: "error retriveing"
        });
    });
};
exports.listall = (req, res) => {
    Model.find()
    .then(toSave => {
        res.send(toSave);
    }).catch(err => {
        res.status(400).send({
            message:"errrrrr occured"
        });
    });
};
exports.update = (req, res) => {
    if(!req.body.Name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    Model.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
    },{new: true})
    .then(toSave => {
        if (!toSave) {
            return res.status(404).send({
                message:"id Not found" + req.params.id
            });
        }    
        res.send(toSave);
    }).catch(err => {
        if (err.kind ==='ObjectId') {
            return res.status(404).send({
                message:"id not founbdddd" + req.params.id
            });
        }
        return res.status(500).send({
            message:"error on updating"
        });
    });
};

exports.delete = (req, res) => {
    Model.findByIdAndRemove(req.params.id)
    .then(toSave => {
        if (!toSave){
            return res.status(400).send({
                message:"Id not found" + req.params.id
            });
        }
        res.send("Id deletes succesfully");
    }).catch(err => {
        if  (err.name === 'not Found') {
            return res.status(400).send({
                message:"Id not found" + req.params.id
            });
        }
        return res.status(500).send({
            message:"could not found Id" + req.params.id
        });
    });
};