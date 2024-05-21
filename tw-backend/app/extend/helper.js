const moment = require('moment');

exports.relativeTime = (time) => {
  return moment(new Date()).fromNow();
};
