var Cloud = require('Ti.Cloud');

//login as the cloud user....
function init(_args) {
	if (!Cloud.sessionId) {
		Cloud.Users.login({
		    login: 'pic',
		    password: 'piccy'
		}, function (e) {
		    if (e.success) {
		        _args.success({user : e.users[0]});
		    } else {
		        _args.error({error: e.error});
		    }
		});
	}
};
exports.init = init;

function sendPiccy(_args) {
	// create a new photo

	Cloud.Photos.create({
	    photo: Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/'+_args)
	}, function (e) {
	    if (e.success) {
	        var photo = e.photos[0];
	        alert('Success:\n' +
	            'id: ' + photo.id );
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}
exports.sendPiccy = sendPiccy;