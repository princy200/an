module.exports = (application) => {
    const map = require('../controller/map.controller.js');
    application.post('/map', map.create);
    application.get('/getone/:id', map.listone);
    application.get('/getall', map.listall);
    application.put('/updaterecord/:id', map.update)
    application.delete('/deleterecord/:id', map.delete);

}   
