// All source code Copyright 2013 Cope Consultancy Services. All rights reserved


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var forex = require('/cloud');
forex.init();
// create base root window
//
var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});

var options = Ti.UI.createView({layout: 'vertical'});

var sendPhoto = Ti.UI.createButton({title: 'Send photo to the cloud'});

sendPhoto.addEventListener('click', function(e) {
	Ti.Media.openPhotoGallery({
		autoHide:   true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
		success:    function(e) {showPhoto(e); sendPiccyToCloud(e)}
		});
});

var thePhoto = Ti.UI.createImageView({height: '30%', width: '30%'});

function showPhoto(_args) {
	thePhoto.setImage(_args.media);
}

function sendPiccyToCloud(_args) {
    // first we need to write out a file of the piccy
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'cloudThis.png');
    file.write(_args.media);
    // then send this file to the Cloud

    forex.sendPiccy(file.name);
    file = null;
}

options.add(sendPhoto);
options.add(thePhoto);
win1.add(options);
win1.open();
