// For generating timestamps

var DEBUG_MODE = false;

class TimestampGenerator {
    constructor() {
        this.moment = require('moment');
    }

    getSimpleDate() {
        var date = this.moment().format('YYYY-MMM-DD');
        return date.toLowerCase();
    }

    getLongDate() {
        var date = this.moment().format('dddd, MMMM DD YYYY');
        return date;
    }

    getYearDay() {
        var year = this.moment().format('YYYY');
        var day = this.moment().format('DDDD');
        return year + '-day-' + day;
    }

    getYearWeek() {
        var year = this.moment().format('YYYY');
        var week = this.moment().format('ww');
        return year + '-week-' + week;
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

        finalText += 'Simple date:' + CRLF;
        finalText += this.getSimpleDate() + CRLF + CRLF;

        finalText += 'Day of year:' + CRLF;
        finalText += this.getYearDay() + CRLF + CRLF;

        finalText += 'Week of year:' + CRLF;
        finalText += this.getYearWeek() + CRLF + CRLF;
        
        finalText += 'UNIX timestamp (seconds):' + CRLF;
        finalText += this.getTimestamp() + CRLF + CRLF;

        finalText += 'UNIX timestamp (milliseconds):' + CRLF;
        finalText += this.getTimestampMilliseconds() + CRLF + CRLF;

        finalText += 'UNIX timestamp (seconds in hex):' + CRLF;
        finalText += this.getTimestampHex() + CRLF + CRLF;
        
        finalText += 'UNIX timestamp (milliseconds in hex):' + CRLF;
        finalText += this.getTimestampMillisecondsHex() + CRLF;

        return finalText;
    }
};

module.exports = TimestampGenerator;

var tGen = new TimestampGenerator();
console.log(tGen.getAllTimestamps());
