// $.ajax(){
// 	url: '/',
// 	method: 'GET'
// }.done(function(data){
// 	console.log(data)
// })

$(".scrape").on("click", function(){
	event.preventDefault()
	$.ajax({
		url: '/scrape',
		method: "GET"
	}).done(function(){
		console.log("scape has been complete")
	})
})

$(".view-scrapes").on('click', function(){
	event.preventDefault();
	$.ajax({
		url: '/view-scrapes',
		method: 'GET'
	}).done(function(data){
		console.log(data)
	})
})