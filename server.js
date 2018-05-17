var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restful_task_api');

var TaskSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String, default: '' },
    completed: {type: Boolean, default: false}
}, { timestamps: true });


var Task = mongoose.model('Task', TaskSchema);



app.use(bodyParser.json());

var path = require('path');

app.use(express.static(__dirname + '/helloAngular/dist/helloAngular'));


app.set('views', path.join(__dirname, './views'));

app.get("/", function(req,res){
    let letasks = getTasks();
    console.log(letasks);

    res.render("index", {
        tasks: letasks
    });
});

app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            console.log(tasks);
            console.log('works')
            res.json(tasks);
        }
    });
});

app.post("/tasks", function (req, res) {
    Task.create(req.body, function(err, task){
        if(err){
            console.log(err);
            res.json(err);
        } else {
            console.log(task);
            res.json(true);
        }
    });
    // task.save();
    console.log(req.body);
    // res.redirect('/tasks');
});

app.get("/tasks/:id", function (req, res) {
    Task.find({_id: req.params.id}, function(err, task){
        if(err){
            console.log(err);
            res.json(err);
        } else {
            console.log(task);
            res.json(task);
        }
    });
}); 

app.put('/update/:id', function (req, res) {
    Task.update({ _id: req.params.id }, {$set: req.body }, function(err, task){
        if(err){
            console.log(err);
        } else {
            console.log(req.body);
            console.log(task);
            console.log(req.params.id);
            // res.redirect(303, '/view/' + req.params.id);
            // 303 prevents a put req from redirecting stricktly to another put req
            res.json(true);    
        }
    });
});

app.delete('/delete/task/:id', function (req, res) {
    Task.remove({ _id: req.params.id }, function (err, task) {
        if (err) {
            console.log(err);
            // res.redirect('/');
            res.json(err);
        } else {
            console.log("Deleted task");
            res.json(true);
        }
    });
    // res.redirect('/tasks');
});

app.listen(8000, function () {
    console.log("listening on port 8000");
});
