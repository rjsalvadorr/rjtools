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
};

module.exports = TimestampGenerator;

if(DEBUG_MODE) {
    var timestampGenerator = new TimestampGenerator();
    console.log('DEBUG MODE ENABLED');
    console.log('getSimpleDate()', timestampGenerator.getSimpleDate());
    console.log('getYearDay()', timestampGenerator.getYearDay());
    console.log('getYearWeek()', timestampGenerator.getYearWeek());
    console.log('getTimestamp()', timestampGenerator.getTimestamp());
    console.log('getTimestampMilliseconds()', timestampGenerator.getTimestampMilliseconds());
    console.log('getTimestampHex()', timestampGenerator.getTimestampHex());
    console.log('getTimestampMillisecondsHex()', timestampGenerator.getTimestampMillisecondsHex());
}
