var friends = require("../data/friends.js"); // Array holding all current 'friends'

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		convertStringtoInt(req.body.selected);

		var bestMatch = null;
		var minDiff = null;
	
		var recentlyAdded = req.body;
		for(var i = 0; i < friends.length; i++) {	
			var existingFriend = friends[i];
			var diff = 0;
			for(var j = 0; j < 10; j++) {  // 10 questions
				diff += Math.abs(recentlyAdded.selected[j] - existingFriend.selected[j]);
			}
			console.log(diff);
			if(bestMatch == null && minDiff == null) {
				bestMatch = existingFriend;
				minDiff = diff;
			} 
			else if(diff < minDiff) {
				bestMatch = existingFriend;
				minDiff = diff;
			}
		}
		friends.push(req.body);
		res.send(bestMatch);
	});
}

function convertStringtoInt(choices) {
	for(var i = 0; i < choices.length; i++) {
		choices[i]= parseInt(choices[i]);
	}
}