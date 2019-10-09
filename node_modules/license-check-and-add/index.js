let fs = require('fs'),
    path = require('path'),
    eol = require('os').EOL;

module.exports.run = function (config) {

  if (typeof config === 'undefined') {
      throw new Error('You must define a minimum config e.g. one containing base_directory and license');
  }

  let base_directory = config.folder;
      license = config.license; // THE TEXT TO GO IN THE LICENSE AND GET FORMATTED
      exclude_defaults = true;
      exclude_exact_paths = config.exact_paths_method === 'EXCLUDE' ? true : false;
      exact_paths = typeof config.exact_paths !== 'undefined' ? config.exact_paths : [];
      exclude_file_type = config.file_type_method === 'EXCLUDE' ? true : false;
      file_types = typeof config.file_types !== 'undefined' ? config.file_types : [];
      insert_license = config.insert_license === true ? true : false;
      clear_license = config.clear_license === true ? true : false;
      trailing_whitespace = config.trailing_whitespace !== 'TRIM' ? true : false;
  
  let default_ignore_extensions = [".png", ".svg", ".jpeg", ".jpg", ".gif", ".tif", ".ico", ".json"]

  if(config.hasOwnProperty('exclude_defaults')) {
    if(typeof config.exclude_defaults !== 'boolean') {
      throw new Error('exclude_defaults is not boolean')
    }
    exclude_defaults = config.exclude_defaults;
  }

  if(exclude_exact_paths) {
    console.log('Running using exclude exact_paths list');
  } else {
    console.log('Running using include exact_paths list');
  }

  if(exclude_file_type) {
    console.log('Running using exclude file type list');
  } else {
    console.log('Running using include file type list');
  }

  if(insert_license && clear_license) {
    throw new Error('You cannot insert and clear at the same time')
  }

  if(insert_license) {
    console.log('Automatically adding licenses');
  }

  if(clear_license) {
    console.log('Automatically removing licenses');
  }

  if(trailing_whitespace) {
    console.log('Trailing whitespace will be ignored in checking')
  } else {
    console.log('Trailing whitespace will not be accepted in checking')
  } 
  
  if (trailing_whitespace && insert_license) {
    console.log('Trailing whitespace will be left in inserted licenses')
  } else if (!trailing_whitespace && insert_license) {
    console.log('Trailing whitespace will be removed from inserted licenses')
  }

  let checkedFolders = [];
  let files = [];

  if(typeof base_directory === 'undefined') {
    throw new Error('No folder passed');
  } else if(typeof license === 'undefined') {
    throw new Error('No license passed');
  } else if(!(exact_paths instanceof Array)) {
    throw new Error('exact_paths is not an array')
  } else if(!(file_types instanceof Array)) {
    throw new Error('file_types is not an array')
  }

  base_directory = path.resolve(process.cwd(), base_directory);
  license = path.resolve(process.cwd(), license);

  exact_paths = exact_paths.map(function(el){
    return path.resolve(base_directory, el);
  });

  LicenseFormatter = require('./utils/license_formatter.js');
  LicenseFormatter = new LicenseFormatter(config.license_formats, config.default_format, trailing_whitespace);

  function getFolderContent(folder) {
      if (checkedFolders.includes(folder)) {
	return;
      }
      checkedFolders.push(folder);
      fs.readdirSync(folder).forEach(item => {
        let pth = path.join(folder, item);
        if(fs.lstatSync(pth).isDirectory()) {
          if(exclude_exact_paths) {
            if(!exact_paths.includes(pth)) {
              getFolderContent(pth);
            }
          } else if (exact_paths.includes(pth)){
            // WE NEED TO ADD THE FILES IN THE SUBDIRECTORY TO THE INCLUDE LIST
            fs.readdirSync(pth).forEach(item => {
              exact_paths.push(path.join(pth, item));
            });
            getFolderContent(pth);
          } else {
	    // WE NEED TO STILL GO THROUGH THE DIRECTORY IF WE ARE INCLUDING A FILE SOMEWHERE IN IT
	    exact_paths.forEach((exact_path) => {
	      if(exact_path.substring(0, pth.length) === pth) {
		getFolderContent(pth);
	      }
	    });
	  }
        } else if(fs.lstatSync(pth).isFile()) {
          let push = false;
          if(exclude_exact_paths && !exact_paths.includes(pth)) {
            if(exclude_file_type) {
              if(!file_types.includes(path.extname(pth))) {
                  push = true;
              }
            } else if (file_types.includes(path.extname(pth))) {
                push = true;
            }
          } else if(!exclude_exact_paths && exact_paths.includes(pth)) {
            if(exclude_file_type) {
              if(!file_types.includes(path.extname(pth))) {
                  push = true;
              }
            } else if (file_types.includes(path.extname(pth))) {
                push = true;
            }
          }

          if (exclude_defaults) {
            if (default_ignore_extensions.includes(path.extname(pth))) {
              push = false;
            }
          }

          if (push) {
            files.push(pth)
          }
        }
      });
  }

  function giveFilesLicense() {
    let err = [];
    let removed = 0;
    let license_text = fs.readFileSync(license).toString();
    for(let i = 0; i < files.length; i++) {
      let file = fs.readFileSync(files[i]).toString();
      let file_array = file.split(/\r?\n/);
      let file_trimmed = file_array.map((line) => {
	      if (trailing_whitespace) {
          return line.replace(/\s+$/, '');
        } else {
          return line;
        }
      }).join('\n');
      let extension = path.extname(files[i]) ? path.extname(files[i]) : path.basename(files[i]);
      
      let formatted_text = LicenseFormatter.formatLicenseForFile(extension, license_text);
      let formatted_text_array = formatted_text.split(/\r?\n/);
      let formatted_text_trimmed = formatted_text_array.map((line) => {
	      if (trailing_whitespace) {
          return line.replace(/\s+$/, '');
        } else {
          return line;
        }
      }).join('\n');

      if(!file_trimmed.includes(formatted_text_trimmed)) {
        if(insert_license) {
          let new_text = formatted_text + eol + file;
          fs.writeFileSync(files[i], new_text);
        } else {
          console.error('\x1b[31m\u2717\x1b[0m License not found in ', files[i]);
          err.push(files[i])
        }
      } else if (clear_license) {
        let new_text = file_array.slice(formatted_text_array.length).join(eol);
        fs.writeFileSync(files[i], new_text);
        removed++;
      }
    }
    if(err.length > 0 && !clear_license) {
      if(config.output) {
        fs.writeFileSync(path.resolve(process.cwd(), config.output), err.join(eol));
      }

      throw new Error('License Check failed. '+err.length+' file(s) did not have the license.');
    } else if (!clear_license) {
      console.log('\x1b[32m\u2714\x1b[0m All files have licenses.')
    } else {
      console.log('\x1b[32m\u2714\x1b[0m Removed license from '+removed+' file(s).')
    }
  }

   getFolderContent(base_directory);
   giveFilesLicense()
  return true;
}
