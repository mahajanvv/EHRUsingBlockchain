'use strict';
/* global describe, it */

let license = require('../');
let LicenseFormatter = require('../utils/license_formatter');

require('mocha');
let expect = require('chai').expect;
let path = require('path');
let sinon = require('sinon');

let fs = require('fs');
let eol = require('os').EOL;

describe('license-check-and-add', () => {

  describe('module.exports.run', () => {

    let config;
    let mockFs;
    beforeEach(() => {
      config = {
        "folder": path.join(__dirname, 'test-directory-structure'),
        "license": path.join(__dirname, 'licenses/test-license.txt'),
        "default_format": { "prepend": "/*", "append": "*/" },
        "exact_paths_method": "EXCLUDE",
        "exact_paths": [],
        "file_type_method": "EXCLUDE",
        "file_types": [],
        "insert_license": false
      };
    });

    it('should throw error if config not defined', () => {
        expect(() => {
          license.run();
        }).to.throw('You must define a minimum config e.g. one containing base_directory and license');
    });

    it('should throw error if insert and clear are both defined', () => {
      config.insert_license = true;
      config.clear_license = true;

      expect(() => {
        license.run(config);
      }).to.throw('You cannot insert and clear at the same time');
    });

    it('should throw error if folder not in config', () => {
        delete config.folder;

        expect(() => {
          license.run(config);
        }).to.throw('No folder passed');
    });

    it('should throw error if license not in config', () => {
        delete config.license;

        expect(() => {
          license.run(config);
        }).to.throw('No license passed');
    });

    it('should throw error if passed exact_paths not an array', () => {
        config.exact_paths = '';

        expect(() => {
          license.run(config);
        }).to.throw('exact_paths is not an array');
    });

    it('should throw error if passed file_types not an array', () => {
        config.file_types = '';

        expect(() => {
          license.run(config);
        }).to.throw('file_types is not an array');
    });

    it('should throw an error if exclude_defaults is not boolean', () => {
      config.exclude_defaults = 'EXCLUDE';

      expect(() => {
        license.run(config);
      }).to.throw('exclude_defaults is not boolean');
    })

    it('should handle exact_paths not set in the config', () => {
        delete config.exact_paths;

        expect(() => {
          license.run(config);
        }).to.throw('License Check failed. 4 file(s) did not have the license.');
    });

    it('should handle file_types not set in the config', () => {
        delete config.file_types;

        expect(() => {
          license.run(config);
        }).to.throw('License Check failed. 4 file(s) did not have the license.');
    });

    it('should error when files do not contain license', () => {
        expect(() => {
          license.run(config);
        }).to.throw('License Check failed. 4 file(s) did not have the license.');
    })

    it('should ignore files and directories in exact_paths when exact_paths_method set to EXCLUDE', () => {
        config.exact_paths = ['file.js', '.test-no-extension', 'sub-directory'];

        expect(license.run(config)).to.deep.equal(true);
    });

    it('should only test against files that are in exact_paths when exact_paths_method not set to EXCLUDE', () => {
      config.exact_paths = ['file.js'];
      config.exact_paths_method = 'INCLUDE';

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 1 file(s) did not have the license.');
    });

    it('should only test against directories that are in exact_paths when exact_paths_method not set to EXCLUDE', () => {
      config.exact_paths = ['sub-directory'];
      config.exact_paths_method = 'INCLUDE';

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 2 file(s) did not have the license.');
    });

    it('should only test against files in subdirectories that are in exact_paths when exact_paths_method not set to EXCLUDE', () => {
      config.exact_paths = ['sub-directory/sub-file.js'];
      config.exact_paths_method = 'INCLUDE';

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 1 file(s) did not have the license.');
    })

    it('should only test against files in subdirectories that are in exact_paths when exact_paths_method not set to EXCLUDE, handling multiple includes in one folder', () => {
      config.exact_paths = ['sub-directory/sub-file.js', 'sub-directory/sub-file-2.js'];
      config.exact_paths_method = 'INCLUDE';

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 2 file(s) did not have the license.');
    })

    it('should exclude files of types in file_types when file_type_method set to EXCLUDE', () => {
      config.file_types = ['.js'];

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 1 file(s) did not have the license.');
    });

    it('should include files of types in file_types when file_type_method is not set to INCLUDE', () => {
      config.file_types = ['.js'];
      config.file_type_method = 'INCLUDE';

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 3 file(s) did not have the license.');
    });

    it('should exclude files of types in file_types when file_type_method set to EXCLUDE when exact_paths_method is set to INCLUDE', () => {
      config.exact_paths = ['sub-directory'];
      config.exact_paths_method = 'INCLUDE';
      config.file_types = ['.js'];

      expect(license.run(config)).to.deep.equal(true);
    });

    it('should include files of types in file_types when file_type_method set to INCLUDE when exact_paths_method is not set to INCLUDE', () => {
      config.exact_paths = ['sub-directory'];
      config.exact_paths_method = 'INCLUDE';
      config.file_types = ['.js'];
      config.file_type_method = 'INCLUDE';

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 2 file(s) did not have the license.');
    });

    it('should include files of default type if exclude_defaults set to false', () => {
      config.exclude_defaults = false;

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 5 file(s) did not have the license.');
    });

    it('should add the license to a file when insert_license is true', () => {
        config.insert_license = true;
        config.exact_paths = ['sub-directory'];
        config.exact_paths_method = 'INCLUDE';
        let writeFileSync = sinon.stub(fs, 'writeFileSync');

        expect(license.run(config)).to.deep.equal(true);

        let file = fs.readFileSync(path.join(__dirname, 'test-directory-structure/sub-directory/sub-file.js')).toString();
        let license_text = fs.readFileSync(config.license).toString();
        var expected_text = '/*' + eol + license_text + '*/' + eol + file;

        expect(writeFileSync.calledWith(path.join(__dirname, 'test-directory-structure/sub-directory/sub-file.js'), expected_text)).to.be.ok;

        writeFileSync.restore();
    });

    it('should add the license to a file and trim trailing whitespace when insert_license is true and trailing_whitespace set to trim', () => {
      config.insert_license = true;
      config.exact_paths = ['sub-directory/sub-file.js'];
      config.exact_paths_method = 'INCLUDE';
      config.license = path.join(__dirname, 'licenses/test-license-blank-lines.txt')
      config.license_formats = {
        "js": {
          "prepend": "/*",
          "append": "*/",
          "eachLine": {
            "prepend": " * "
          }
        }
      }

      let writeFileSync = sinon.stub(fs, 'writeFileSync');

      expect(license.run(config)).to.deep.equal(true);

      expect(writeFileSync.getCall(0).args[0]).to.deep.equal(path.join(__dirname, 'test-directory-structure/sub-directory/sub-file.js'));
      let written_data = writeFileSync.getCall(0).args[1];
      expect(written_data.split(eol)[2]).to.deep.equal(' * ');
      expect(written_data.split(eol)[4]).to.deep.equal(' * ');

      writeFileSync.restore();
    });

    it('should add the license to a file and trim trailing whitespace when insert_license is true and trailing_whitespace set to trim', () => {
      config.insert_license = true;
      config.exact_paths = ['sub-directory/sub-file.js'];
      config.exact_paths_method = 'INCLUDE';
      config.license = path.join(__dirname, 'licenses/test-license-blank-lines.txt')
      config.license_formats = {
        "js": {
          "prepend": "/*",
          "append": "*/",
          "eachLine": {
            "prepend": " * "
          }
        }
      }
      config.trailing_whitespace = 'TRIM';

      let writeFileSync = sinon.stub(fs, 'writeFileSync');

      expect(license.run(config)).to.deep.equal(true);

      expect(writeFileSync.getCall(0).args[0]).to.deep.equal(path.join(__dirname, 'test-directory-structure/sub-directory/sub-file.js'));
      let written_data = writeFileSync.getCall(0).args[1];
      expect(written_data.split(eol)[2]).to.deep.equal(' *');
      expect(written_data.split(eol)[4]).to.deep.equal(' *');

      writeFileSync.restore();
    });

    it('should return true when all files contain the license', () => {
      config = {
          "folder": __dirname,
          "license": path.join(__dirname, 'licenses/test-license.txt'),
          "default_format": { "prepend": "/*", "append": "*/" },
          "exact_paths_method": "INCLUDE",
          "exact_paths": [path.join(__dirname, 'have-licenses/has-license.js')],
          "file_type_method": "EXCLUDE",
          "file_types": [],
          "insert_license": false
      };

      expect(license.run(config)).to.deep.equal(true);
    });

    it('should return true when the included file includes license not on the top line', () => {
	    config = {
          "folder": __dirname,
          "license": path.join(__dirname, 'licenses/test-license.txt'),
          "default_format": { "prepend": "/*", "append": "*/" },
          "exact_paths_method": "INCLUDE",
          "exact_paths": [path.join(__dirname, 'have-licenses/has-license-but-not-at-top.js')],
          "file_type_method": "EXCLUDE",
          "file_types": [],
          "insert_license": false
      };

      expect(license.run(config)).to.deep.equal(true);
    });

    it('should throw an error when the inserted license has incorrect whitespace at the start of line', () => {
      config = {
        "folder": __dirname,
        "license": path.join(__dirname, 'licenses/test-license.txt'),
        "default_format": { "prepend": "/*", "append": "*/" },
        "exact_paths_method": "INCLUDE",
        "exact_paths": [path.join(__dirname, 'have-licenses/has-license-incorrect-start-line.js')],
        "file_type_method": "EXCLUDE",
        "file_types": [],
        "insert_license": false
      };

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 1 file(s) did not have the license.');
    })

    it('should return true when license is in file and includes whitespace at end with trailing_whitespace unset', () => {
      config = {
        "folder": __dirname,
        "license": path.join(__dirname, 'licenses/test-license.txt'),
        "default_format": { "prepend": "/*", "append": "*/" },
        "exact_paths_method": "INCLUDE",
        "exact_paths": [path.join(__dirname, 'have-licenses/has-license-but-whitespace-at-end-of-line.js')],
        "file_type_method": "EXCLUDE",
        "file_types": [],
        "insert_license": false
      };

      expect(license.run(config)).to.deep.equal(true);
    })

    it('should return true when license contains whitespace at end but whitespace is not present in file with trailing_whitespace unset', () => {
      config = {
        "folder": __dirname,
        "license": path.join(__dirname, 'licenses/test-license-whitespace-at-end.txt'),
        "default_format": { "prepend": "/*", "append": "*/" },
        "exact_paths_method": "INCLUDE",
        "exact_paths": [path.join(__dirname, 'have-licenses/has-license.js')],
        "file_type_method": "EXCLUDE",
        "file_types": [],
        "insert_license": false
      };

      expect(license.run(config)).to.deep.equal(true);
    })

    it('should throw error when license is in file and includes whitespace at end with trailing_whitespace TRIM', () => {
      config = {
        "folder": __dirname,
        "license": path.join(__dirname, 'licenses/test-license.txt'),
        "default_format": { "prepend": "/*", "append": "*/" },
        "exact_paths_method": "INCLUDE",
        "exact_paths": [path.join(__dirname, 'have-licenses/has-license-but-whitespace-at-end-of-line.js')],
        "file_type_method": "EXCLUDE",
        "file_types": [],
        "insert_license": false,
        trailing_whitespace: 'TRIM'
      };

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 1 file(s) did not have the license.');
    })

    it('should remove the license when clear_license and file contains the license', () => {
      config = {
          "folder": __dirname,
          "license": path.join(__dirname, 'licenses/test-license.txt'),
          "default_format": { "prepend": "/*", "append": "*/" },
          "exact_paths_method": "INCLUDE",
          "exact_paths": [path.join(__dirname, 'have-licenses/has-license.js')],
          "file_type_method": "EXCLUDE",
          "file_types": [],
          "clear_license": true
      };

      let writeFileSync = sinon.stub(fs, 'writeFileSync');

      expect(license.run(config)).to.deep.equal(true);

      var expected_text = '\nlet me_start_by_saying = "HELLO WORLD";';

      expect(writeFileSync.calledWith(path.join(__dirname, 'have-licenses/has-license.js'), expected_text)).to.be.ok;

      writeFileSync.restore();
    });

    it('should not throw an error when clear_license and license not found', () => {
      config = {
        "folder": path.join(__dirname, 'test-directory-structure'),
        "license": path.join(__dirname, 'licenses/test-license.txt'),
        "default_format": { "prepend": "/*", "append": "*/" },
        "exact_paths_method": "EXCLUDE",
        "exact_paths": [],
        "file_type_method": "EXCLUDE",
        "file_types": [],
        "clear_license": true
      };

      expect(license.run(config)).to.deep.equal(true);
    });

    it('should write to output when output supplied in config and a failure occurs', () => {
      config.output = 'output.txt'
      let writeFileSync = sinon.stub(fs, 'writeFileSync');

      expect(() => {
        license.run(config);
      }).to.throw('License Check failed. 4 file(s) did not have the license.');

      let expected_files = [path.join(__dirname, 'test-directory-structure/.test-no-extension'), path.join(__dirname, 'test-directory-structure/file.js'), path.join(__dirname, 'test-directory-structure/sub-directory/sub-file-2.js'), path.join(__dirname, 'test-directory-structure/sub-directory/sub-file.js')]

      expect(writeFileSync.calledWith(path.join(process.cwd(), 'output.txt'), expected_files.join(eol))).to.be.ok;

      writeFileSync.restore();
    });
  });

  describe('LicenseFormatter', () => {
    let default_formats;

    beforeEach(() => {
      default_formats = {
        '.js': { prepend: '/*', append: '*/' },
        '.ts': { prepend: '/*', append: '*/' },
        '.css': { prepend: '/*', append: '*/' },
        '.scss': { prepend: '/*', append: '*/' },
        '.less': { prepend: '/*', append: '*/' },
        '.php': { prepend: '/*', append: '*/' },
        '.as': { prepend: '/*', append: '*/' },
        '.c': { prepend: '/*', append: '*/' },
        '.java': { prepend: '/*', append: '*/' },
        '.cpp': { prepend: '/*', append: '*/' },
        '.go': { prepend: '/*', append: '*/' },
        '.cto': { prepend: '/*', append: '*/' },
        '.acl': { prepend: '/*', append: '*/' },
        '.html': { prepend: '<!--', append: '-->' },
        '.xml': { prepend: '<!--', append: '-->' },
        '.gitignore': { eachLine: { prepend: '# ' } },
        '.npmignore': { eachLine: { prepend: '# ' } },
        '.eslintignore': { eachLine: { prepend: '# ' } },
        '.dockerignore': { eachLine: { prepend: '# ' } },
        '.sh': { eachLine: { prepend: '# ' } },
        '.py': { eachLine: { prepend: '# ' } },
        '.txt': {}
      };
    })

    it('should set license formats using default formats, splitting keys on |', () =>{
        let lf = new LicenseFormatter();
        expect(lf.license_formats).to.deep.equal(default_formats);
    });

    it('should allow the user to add their own formats', () => {
      let user_formats = {
        "dog|duck": {
          "prepend": "animal_start",
          "append": "animal_end" 
        }
      }

      let lf = new LicenseFormatter(user_formats);
      expect(lf.license_formats).to.deep.equal(Object.assign(default_formats, {
        ".dog": {
          "prepend": "animal_start",
          "append": "animal_end" 
        },
        ".duck": {
          "prepend": "animal_start",
          "append": "animal_end" 
        }
      }));
    });

    it('should overwrite default values when the user specified their own', () => {
      let user_formats = {
        "js|css": {
          "eachLine": {
            "prepend": "// "
          }
        }
      }

      let lf = new LicenseFormatter(user_formats);
      expect(lf.license_formats).to.deep.equal(Object.assign(default_formats, {
        ".js": {
          "eachLine": {
            "prepend": "// "
          }
        },
        ".css": {
          "eachLine": {
            "prepend": "// "
          }
        }
      }));
    });

    it('should warn the user when they have not specified a default to use for file types not found in license_formats', () =>{
      sinon.spy(console, 'warn');
      
      let lf = new LicenseFormatter({});

      sinon.assert.calledWith(console.warn, sinon.match('No default format specified using {"prepend":"/*","append":"*/"} as backup'));
      expect(lf.default_format).to.deep.equal({ "prepend": "/*", "append": "*/" });
    });

    it('should use the users passed default format', () => {
      let lf = new LicenseFormatter({}, { "prepend": "fish", "append": "bowl" });
      expect(lf.default_format).to.deep.equal({ "prepend": "fish", "append": "bowl" });
    })

    it('should return license specified in file', () => {
      let lf = new LicenseFormatter({}, { "file": path.join(__dirname, 'licenses/test-license-2.txt') });
      expect(lf.formatLicenseForFile('special', 'NORMAL LICENSE TEXT')).to.deep.equal(`MY SPECIAL TEST LICENSE\nWITH THIS LICENSE YOU CAN DO THE SPECIAL TEST\n`);
    })

    it('should prepend and append the license', () => {
      let lf = new LicenseFormatter({}, {});
      expect(lf.formatLicenseForFile('.js', 'NORMAL LICENSE TEXT')).to.deep.equal(`/*${eol}NORMAL LICENSE TEXT${eol}*/`);
    })

    it('should prepend to each line', () => {
      let lf = new LicenseFormatter({}, {});
      expect(lf.formatLicenseForFile('.sh', 'NORMAL LICENSE TEXT\nMULTILINE')).to.deep.equal(`# NORMAL LICENSE TEXT${eol}# MULTILINE`);
    })

    it('should append to each line', () => {
      let lf = new LicenseFormatter({'weirdFile': {"eachLine": {"append": " EOL"}}}, {});
      expect(lf.formatLicenseForFile('.weirdFile', 'NORMAL LICENSE TEXT\nMULTILINE')).to.deep.equal(`NORMAL LICENSE TEXT EOL${eol}MULTILINE EOL`);
    })

    it('should leave trailing whitespace on each line', () => {
      let user_formats = {
        "js": {
          "prepend": "/*",
          "append": "*/",
          "eachLine": {
            "prepend": " * "
          }
        }
      }

      let lf = new LicenseFormatter(user_formats, {}, true);

      expect(lf.formatLicenseForFile('.js', 'NORMAL LICENSE TEXT\nMULTILINE WITH WHITESPACE     \nAT THE END OF A LINE\n\nAND A BLANK LINE JUST FOR FUN')).to.deep.equal(`/*${eol} * NORMAL LICENSE TEXT${eol} * MULTILINE WITH WHITESPACE     ${eol} * AT THE END OF A LINE${eol} * ${eol} * AND A BLANK LINE JUST FOR FUN${eol}*/`);
    });

    it('should remove trailing whitespace from each line', () => {
      let user_formats = {
        "js": {
          "prepend": "/*",
          "append": "*/",
          "eachLine": {
            "prepend": " * "
          }
        }
      }

      let lf = new LicenseFormatter(user_formats, {}, false);

      expect(lf.formatLicenseForFile('.js', 'NORMAL LICENSE TEXT\nMULTILINE WITH WHITESPACE     \nAT THE END OF A LINE\n\nAND A BLANK LINE JUST FOR FUN')).to.deep.equal(`/*${eol} * NORMAL LICENSE TEXT${eol} * MULTILINE WITH WHITESPACE${eol} * AT THE END OF A LINE${eol} *${eol} * AND A BLANK LINE JUST FOR FUN${eol}*/`);
    });
  })
});
