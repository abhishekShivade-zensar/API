var express = require('express');
const res = require('express/lib/response');

var router = express.Router();

var books = [
	{id: 001, name: "Sofwtare Engineering", author: "David Pressman", rating: 10},
	{id: 002, name: "Digital Communication", author: "No Idea", rating:8},
];

// console.log(books);
	
router.get('/', function(req,res){
	res.json(books);
});

router.get('/:id([0-9]{3,})', function(req, res){
	var  book1 = books.filter(function(book) {
		if(book.id == req.params.id){
			return true;
		}
	});
		
	if(book1.length == 1){
		res.json(book1[0]);
	} else {
		res.status(404);
		res.send("book not found");
	}
});

router.get('/:id([1-9]{1,})', function(req, res){
		var  book1 = books.filter(function(book) {
			if(book.rating == req.params.id){
				return true;
			}
		});
		
	if(book1.length ==1){
		res.json(book1[0]);
	} else {
		res.status(404);
		res.send("book not found");
	}
});	

router.post('/', function(req,res) {
	if (!req.body.name || !req.body.author || !req.body.rating) {
		res.status(400);
//		res.json({message: "Bad request"});
		
	}  else {
		console.log(req.body.name);
		
		var newBook = books[books.length-1].id+1;
		books.push({
			id: newBook,
			name: req.body.name,
			author: req.body.author,
			rating: req.body.rating
		});
		res.json(books);
	}
});
	
router.put('/:id', function(req,res) {
	if (!req.body.name || !req.body.author || !req.body.rating || !req.params.id) {
		res.status(400);
//		res.json({message: "Bad request"});
		
	}  else {
		
		var newIndex =books.map(function(book){
			return book.id;
		}).indexOf(parseInt(req.params.id));
		
		if( newIndex === -1) {
			books.push({
				id: req.params.id,
				name: req.body.name,
				author: req.body.author,
				rating: req.body.rating
			});
			res.json(books);
		} else {
			books[newIndex] = {
				id : req.params.id,
				name: req.body.name,
				author: req.body.author,
				rating: req.body.rating
			};
			res.json(books);
		}
			
	}
		
		
});


router.delete('/:id', function(req,res) {
	if (!req.body.name || !req.body.author || !req.body.rating || !req.params.id) {
		res.status(400);
//		res.json({message: "Bad request"});
		
	}  else {
		var newIndex =books.map(function(book){
			return book.id;
		}).indexOf(parseInt(req.params.id));
		
		if( newIndex === -1) {
			console.log ("item Not found");
			res.json(books);
		} else {
			books.splice(newIndex,1);
			res.json(books);
		}
			
	}
		
		
});



module.exports= router;
		