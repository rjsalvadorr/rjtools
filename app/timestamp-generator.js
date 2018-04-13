// For generating timestamps

var DEBUG_MODE = false;

class TimestampGenerator {
    constructor() {
        this.moment = require('moment');
    }

    getSimpleDate() {
        var date = this.moment().format('YYYY-MMM-DD');
        return date.toUpperCase();
    }

    getSimpleDateTime() {
        var date = this.moment().format('YYYY-MMM-DD HH:mm');
        return date.toUpperCase();
    }

    getLongDate() {
        var date = this.moment().format('dddd, MMMM DD YYYY');
        return date;
    }

    getYearDay() {
        var year = this.moment().format('YYYY');
        var day = this.moment().format('DDDD');
        return 'Day #' + day + ' in ' + year;
    }

    getYearWeek() {
        var year = this.moment().format('YYYY');
        var week = this.moment().format('ww');
        return 'Week #' + week + ' in ' + year;
    }

    getTimestamp() {
        return this.moment().unix();
    }

    getTimestampMilliseconds() {
        return this.moment().valueOf();
    }

    getTimestampHex() {
        return this.getTimestamp().toString(16);
    }

    getTimestampMillisecondsHex() {
        return this.getTimestampMilliseconds().toString(16);
    }

    getAllTimestamps() {
        var finalText = '';
        var CRLF = '\r\n';

        finalText += 'DATE AND TIME: \r\n' + this.getSimpleDateTime() + CRLF + CRLF;

        finalText += 'DAY OF YEAR: \r\n' + this.getYearDay() + CRLF + CRLF;

        finalText += 'WEEK OF YEAR: \r\n' + this.getYearWeek() + CRLF + CRLF;
        
        finalText += 'UNIX TIMESTAMP (seconds): \r\n' + this.getTimestamp() + CRLF + CRLF;

        finalText += 'UNIX TIMESTAMP (milliseconds): \r\n' + this.getTimestampMilliseconds() + CRLF + CRLF;

        finalText += 'UNIX TIMESTAMP (seconds in hex): \r\n' + this.getTimestampHex() + CRLF + CRLF;
        
        finalText += 'UNIX TIMESTAMP (milliseconds in hex): \r\n' + this.getTimestampMillisecondsHex() + CRLF;

        return finalText;
    }
};

module.exports = TimestampGenerator;