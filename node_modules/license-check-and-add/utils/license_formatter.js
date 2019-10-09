const fs = require('fs');
const eol = require('os').EOL;

class LicenseFormatter {
    constructor(config, default_format, trailing_whitespace) {
        var default_formats = require('../default_license_formats.json');
        if (config) {
            this.license_formats = Object.assign(seperateFormats(default_formats), seperateFormats(config));
        } else {
            this.license_formats = seperateFormats(default_formats);
        }

        if (!default_format) {
            this.default_format = { "prepend": "/*", "append": "*/" };
            console.warn(`No default format specified using ${JSON.stringify(this.default_format)} as backup`);
        } else {
            this.default_format = default_format;
        }

        this.trailing_whitespace = trailing_whitespace;
    }

    formatLicenseForFile(file_type, license_text) {
        let format = this.default_format;
        license_text = license_text.trim();

        if(this.license_formats.hasOwnProperty(file_type)) {
            format = this.license_formats[file_type];
        }

        if (format.hasOwnProperty('file')) {
            return fs.readFileSync(format.file).toString();
        } 

        if (format.hasOwnProperty('eachLine')) {
            let license_lines = license_text.split(/\r\n|\n/);
            license_lines.forEach((line, index) => {
                if (format.eachLine.hasOwnProperty('prepend')) {
                    line = format.eachLine.prepend + line;
                }

                if (format.eachLine.hasOwnProperty('append')) {
                    line = line + format.eachLine.append;
                }

                if (this.trailing_whitespace) {
                    license_lines[index] = line;
                } else {
                    license_lines[index] = line.replace(/\s+$/, '');
                }
            });

            license_text = license_lines.join(eol);
        }

	    if (format.hasOwnProperty('prepend')) {
            license_text = format.prepend + eol + license_text;
        }

        if (format.hasOwnProperty('append')) {
            license_text = license_text + eol + format.append;
        }

        return license_text;
    }
}

function seperateFormats(json) {
    let seperated = {};

    for(key in json) {
        let splitup = key.split('|')

        splitup.forEach((el) => {
            seperated['.'+el] = json[key];
        })
    }

    return seperated;
}

module.exports = LicenseFormatter;
