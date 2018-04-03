var path = require('path');

class Constants {
  constructor() {
    this.ROOT_DIR = path.join(__dirname, '..');
    this.DATA_DIR = path.join(this.ROOT_DIR, 'data');
    this.TEMPLATES_DIR = path.join(this.ROOT_DIR, 'templates');
	this.IDE_SETTINGS_DIR = path.join(this.ROOT_DIR, 'ide-settings');
  }
}

module.exports = new Constants();
