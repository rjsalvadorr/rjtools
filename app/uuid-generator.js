
class UUIDGenerator {
  constructor() {
    this.uuid = require('uuid/v4');
  }

  getUUID() {
    return this.uuid();
  }
}

module.exports = UUIDGenerator;

var idGen = new UUIDGenerator();
