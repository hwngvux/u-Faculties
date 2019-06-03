const db = require('../models/db');

module.exports.addUnit = function(req, res) {
    db.createUnit(req.body.unitName, req.body.unitType, req.body.address, req.body.phone, req.body.website, (err) => {
        if (err) {
            res.json({
                status: false,
                message: 'Creating failed'
            })
        }
        // return res.json({status: true, message: "ahihi"})
        return res.redirect('/unit');
    })
}

module.exports.delUnit = function(req, res) {
    if(req.body.type === "delete") {
        db.deleteUnit(req.body.id)
    }
}

module.exports.editUnit = function(req, res) {
    db.modifyUnit(req.body.id, req.body.name, req.body.type, req.body.address, req.body.phone, req.body.website, (err) => {
        if (err) {
            res.json({
                status: false,
                message: 'Modifying failed'
            })
        }
        // return res.redirect('/unit')
    })
}
// module.exports.renderUnit = function(req, res) {
   
// }