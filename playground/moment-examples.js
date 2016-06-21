var moment = require('moment');

console.log(moment().format());

// Unix Epoch - # of seconds since Jan. 1st, 1970 @ 12:00am => 0

var now = moment();
console.log('Epoch: ', now.unix());

var timestamp = 1466493902;
var currentMoment = moment.unix(timestamp);

console.log('Current moment: ', currentMoment.format("MMMM Do, YYYY @ h:mm A"));
