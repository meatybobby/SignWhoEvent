var Event = require('./event.js');
var User = require('./user.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getEvents = function(res) {
	Event.find().sort({ timestamp : -1}).exec(function(err,events) {
		if(err)
			throw err;
		res.send(events);
	});
};

exports.postEvent = function(newEvent, userid, username) {
	var event = new Event();
	event.title = newEvent.title;
	event.content = newEvent.content;
	event.date = newEvent.date;
	event.tag = newEvent.tag;
	event.timestamp = new Date().getTime();
	event.userid = userid;
	event.username = username;

	event.save(function(err) {
        if (err)
            throw err;
    });
}

exports.getEvent = function(id,res) {
	Event.findOne({ '_id' : new ObjectId(id) }, function(err,event) {
		if(err)
			throw err;
		res.send(event);
	});
}

exports.modifyEvent = function(modEvent, fbid, res) {
	Event.findOne({ '_id' : new ObjectId(modEvent.id) }, function(err,event) {
		if(err)
			throw err;
		if(!event || event.userid != fbid) {
			res.statusCode = 400;
			res.send('Failed');
			return;
		}
		event.title = modEvent.title;
		event.content = modEvent.content;
		event.date = modEvent.date;
		event.save(function(err) {
			if (err)
				throw err;
		});
		res.statusCode = 200;
		res.send('Succeed');
	});
}

exports.deleteEvent = function(id, fbid, res) {
	Event.findOne({ '_id' : new ObjectId(id) }, function(err,event) {
		if(err)
			throw err;
		
		if(!event || event.userid != fbid) {
			console.log(event.userid+"/"+fbid);
			res.statusCode = 400;
			res.send('Failed');
			return;
		}
		
		Event.remove({ '_id' : new ObjectId(id) }, function(err) {
			if(err)
				throw err;
		});
		res.statusCode = 200;
		res.send('Succeed');
	});
}