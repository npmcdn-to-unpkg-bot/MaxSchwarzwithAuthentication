var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Patient = require('../models/patient');


router.get('/static', function(req, res, next) {
        res.json( [
         {
             "patientId": "2",
             "patientName": "Patient Name 2 from Patient express route",
             "patientCode": "Patient Code 2",
             "admissionDate": "March 18, 2002",
             "description": "Patient no 2",
             "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
         },
         {
            "patientId": "5",
             "patientName": "Patient Name 5",
             "patientCode": "Patient Code 5",
             "admissionDate": "March 18, 2005",
             "description": "Patient no 5",  
             "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
         },
                  {
            "patientId": "7",
             "patientName": "Patient Name 7",
             "patientCode": "Patient Code 7",
             "admissionDate": "March 18, 2007",
             "description": "Patient no 7",  
             "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
         }
     ])
 
});

router.get('/', function(req, res, next) {
    Patient.find()
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Authentication failed',
                error: err
            });
        }
        next();
    });
});


module.exports = router;