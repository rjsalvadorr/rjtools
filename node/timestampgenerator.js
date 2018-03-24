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
        finalText += 'Simple date:  ' + this.getSimpleDate() + '\r\n';
        finalText += 'Day of year:  ' + this.getYearDay() + '\r\n';
        finalText += 'Week of year:  ' + this.getYearWeek() + '\r\n';
        finalText += 'UNIX timestamp (seconds):  ' + this.getTimestamp() + '\r\n';
        finalText += 'UNIX timestamp (milliseconds):  ' + this.getTimestampMilliseconds() + '\r\n';
        finalText += 'UNIX timestamp (seconds in hex):  ' + this.getTimestampHex() + '\r\n';
        finalText += 'UNIX timestamp (milliseconds in hex):  ' + this.getTimestampMillisecondsHex() + '\r\n';
        return finalText;
    }
};

module.exports = TimestampGenerator;

var tGen = new TimestampGenerator();
console.log(tGen.getAllTimestamps());
