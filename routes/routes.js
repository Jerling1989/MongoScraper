var express = require('express');
var router = express.Router();
var db = require('../server.js')
// Requiring comment and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

	

router.get('/scrape', function(req, res){

	Article.collection.drop();
	Comment.collection.drop();

	//first grab the body of the html with request
	request("https://www.reddit.com/r/tech_news_today/", function(err, response, html){
			// load that into cheerio and save it to $ for a shorthand selector

			var $ = cheerio.load(html);

			// With cheerio, find each p-tag with the "title" class
 		 // (i: iterator. element: the current element)
			$('p.title').each(function(i, element){
				var result = {};

				result.title = $(this).children('a').text();
				result.link = $(this).children('a').attr('href');

				// Using our Article model, create a new entry
				// This effectively passes the result object to the entry (and the title and link)
				var entry = new Article(result)

				entry.save(function(err, doc){
					if(err){
						console.log(err);
					}
					else{
						console.log(doc)
					}
				});
			});
	});
	// res.send('Site has been scraped');
	res.redirect('/')
});		


router.get('/', function(req, res){
	res.render('index')
})

router.get('/view-scrapes', function(req, res){
	Article.find({}, function(error, data){
		if(error){
			console.log(error)
		}
		else{
			res.json(data)
		}
	})
})

module.exports= router;