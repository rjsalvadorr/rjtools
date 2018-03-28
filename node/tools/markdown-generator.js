
class MarkdownGenerator {
  constructor() {
  }

  generateMarkdownTemplate(date) {
    var str = '';
    var CRLF = '\r\n';

    console.log('ting');
    str += '# GeneratedTemplate' + CRLF;
    str += CRLF;
    str += '_' + date + '_' + CRLF;
    str += CRLF;
    str += '## Heading' + CRLF;
    str += CRLF;
    str += 'Placeholder' + CRLF;
    str += CRLF;
    str += '### Subheading' + CRLF;
    str += CRLF;
    str += 'Text' + CRLF;
    str += CRLF;
    str += '-----' + CRLF;

    return str;
  }
}

module.exports = MarkdownGenerator;
