var express = require('express');
const res = require('express/lib/response');

var router = express.Router();

var students = [
    {id: 1, name:"Madhavi Gedam", branch:"Electronics & Tele-Commuication", passoutBatch: 2020},
    {id: 2, name:"Nikita Nikam", branch:"Information Technology", passoutBatch: 2019},
    {id: 3, name: "Mahesh Kadam", branch:"Mechanical", passoutBatch: 2019},
    {id: 4, name:"Pushpak Khiwasara", branch:"Civil", passoutBatch: 2021},
];

// console.log(students);

router.get('/',function(req,res){
    res.json(students);
});

router.get('/:id([0-9]{5,})', function(req, res){
    var student1 = students.filter(function(student) {
        if(student.id == req.params.id){
            return true;
        }
    });

    if(student1.length == 1){
        res.json(student1[0]);
    } else {
        res.status(404);
        res.send("Student not found");
    }
});

router.get('/:id([1-9]{1,})', function(req,res){
    var student1 = students.filter(function(student) {
        if(student.passoutBatch == req.params.id){
            return true;
        }
    });

    if(student1.length ==1){
        res.json(student1[0]);
    } else {
        res.status(404);
        res.send("Student not found");
    }
});

router.post('/', function(req,res){
    if(!req.body.name || !req.body.branch || !req.body.passoutBatch){
        res.status(400);
    } else {
        console.log(req.body.name);

        var newStudent = students[students.length-1].id+1;
        students.push({
            id: newStudent,
            name: req.body.name,
            branch: req.body.branch,
            passoutBatch: req.body.passoutBatch
        });

        res.json(students);
    }
});

router.put('/:id', function(req,res){
    if(!req.body.name || !req.body.branch || !req.body.passoutBatch || !req.params.id){
        res.status(400);
    } else {
        var newIndex = students.map(function(student){
            return student.id;
        }).indexOf(parseInt(req.params.id));

        if(newIndex === -1){
            students.push({
                id: req.params.id,
                name: req.params.name,
                branch: req.params.branch,
                passoutBatch: req.params.passoutBatch
            });
            res.json(students);
        } else {
            books[newIndex] = {
                id: req.params.id,
                name: req.params.name,
                branch: req.params.branch,
                passoutBatch: req.params.passoutBatch
            };
            res.json(students);
        }
    }
});

router.delete('/:id', function(req,res){
    if(!req.body.name || !req.body.branch || !req.body.passoutBatch || req.params.id){
        res.status(400);
    } else {
        var newIndex = students.map(function(student){
            return student.id;
        }).indexOf(parseInt(req.params.id));

        if(newIndex === -1){
            console.log("Student not found");
            res.json(students);
        } else{
            students.splice(newIndex,1);
            res.json(students);
        }
    }
});

module.exports = router;