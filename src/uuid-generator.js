
class UUIDGenerator {
  constructor() {
    const { v4: uuidv4 } = require('uuid');
    this.uuid = uuidv4;
  }

  getUUID() {
    return this.uuid();
  }
}

module.exports = UUIDGenerator;

var idGen = new UUIDGenerator();
