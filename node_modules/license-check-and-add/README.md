# license-check-and-add

> license-check-and-add is an npm plugin that checks whether a specified piece of text is present in files and if asked to do so inserts it.

## Install
```
npm install license-check-and-add
```

## Usage

### Running from npm
Add to your package.json a script for calling license-check-and-add and also the config:

```
"scripts": {
    "licchkadd": "license-check-and-add"
},
"license-check-and-add-config": {
    "folder": ".",
    "license": "header.txt",
    "exact_paths_method": "INCLUDE",
    "exact_paths": ["src"],
    "file_type_method": "EXCLUDE",
    "file_types": [".html", ".txt", ".json"],
    "insert_license": false
}
```

You can then run the script from the terminal using:

```
npm run licchkadd
```

In the example config described the checks are running to test whether the license in header.txt is found within files only within the folder src and in the default formats specified e.g. a license in a JS file formatted:
```
/*
LICENSE CONTENT
*/
```
and a license in an SH file formatted:
```
# LICENSE CONTENT
```
It is explicitly not checking against files that have the extension .html, .txt and .css. It is not automatically adding the license to those files it finds which do not contain it. It is using the default values for for the format 

## Configuring

These are the options available for configuring license-check-and-add:

### folder
The folder you wish to run the tests against. Can specify an absolute or relative path. Using `.` will run against the directory the process is run from.

### license
The file containing the license text you wish to text against. Can specify an absolute or relative path. Using just a name (e.g. header.txt) will run against a file of that name in the directory the process is run from.

### exact_paths_method
Can be set to INCLUDE or EXCLUDE. INCLUDE only runs against files whose names are specified in the `exact_paths` config element. EXCLUDE will run against all files in the `folder` configured and not against those specified in the `exact_paths` config element.

### exact_paths
The paths of files/folders are explicitly included or excluded. Can store either a folder name or file name. Paths can be absolute or relative but you cannot include a path that is not located with the folder or its subfolders specified in the `folder` config element (e.g. checking against current folder . and reference a path for include of ../include_me.txt).

### file_type_method
Can be set to INCLUDE or EXCLUDE. INCLUDE causes the checker to only check against files that have the an extension listed in the `file_types` config element. EXCLUDE causes it to run against all file types but ignore those listed in the `file_types` config element. 

### file types
List of file types to included or excluded from the search. Extensions require the preceding `.`.

### trailing_whitespace (optional)
Setting value to 'TRIM' results in whitespace at the end of each row of a license being removed. Any other value or not providing it will mean that each line remains untrimmed.

### insert_license (optional - default false)
True causes the checker to insert the license specified in the config into the top of any file it finds which does not contain it. You cannot insert and clear in a single run.

### clear_license (optional - default false)
True causes the checker to remove the license from files it finds containing it. You cannot insert and clear in a single run.

### output (optional)
Path of file for where the list of files which do not contain the license should be output. The output will still be shown in the console.

### exclude_defaults (optional)
True causes the following list of file types to be ignored whether they are in the list of files to be scanned or not. This current list is `.png, .svg, .jpeg, .jpg, .gif, .tif, .ico, .json`. If you do not provide a value this defaults to true.

### default_format (optional)
The format the license should take if a file type is iterated over by the checker that does not appear in the default_license_formats.json file. If this value is not passed then the license is automatically prepended with /* and appended with */. Made up of a single format object. Example
```
{
    "prepend": "####",
    "append": "####"
}
```

### license_formats (optional)
How the license should be formatted for different file types. Should use a format object for each entry. You can share a format object for different file types by seperating the file types with a pipe. Entries in this field will overwrite values in the default_license_formats.json. Example:
```
"ts|js": {
    "eachLine": {
        "prepend": "// "
    }
}
```
The above example will tell the checker to expect the license to be formatted such that each line of the license in a typescript or javascript file starts with `// `. If the license is in insert mode the license will be inserted in that format also. (Note: if specifying a file of no type such as a .editorconfig file do NOT include the starting .)

## Format object
A format object is used in the configuration fields `default_format` and `license_formats`. The object is used to specify how a license should start, how a license should end and how each line should start and end. Alternatively it can specify a specific file that should be used as the license. Using a format object allows you to comment out licenses in files where they may have an impact if left as text and use the same license file for multiple file types.

Specifying a format object to point to a file:
```
{
    "file": "/my/path/to/a/license"
}
```

Specifying a format object to write a line at the start and end of the license:
```
{
    "prepend": "<!--",
    "append": "-->"
}
```

Specifying a format object to write at the start and end of each line of the license:
```
    eachLine: {
        "prepend": "<!-- ",
        "append": " -->"
    }
```

### Default values used:
```
{
    "js|ts|css|scss|less|php|as|c|java|cpp|go|cto|acl": {
        "prepend": "/*",
        "append": "*/"
    },
    "html|xml": {
        "prepend": "<!--",
        "append": "-->" 
    },
    "gitignore|npmignore|eslintignore|dockerignore|sh|py": {
        "eachLine": {
            "prepend": "# "
        }
    },
    "txt": {}
}
```

### Example formatting config
"license-check-and-add-config": {
    "folder": ".",
    "license": "header.txt",
    "default_format": {"file": "second_header.txt"},
    "exact_paths_method": "INCLUDE",
    "exact_paths": ["src"],
    "file_type_method": "EXCLUDE",
    "file_types": [".html", ".txt", ".json"],
    "insert_license": false,
    "license_formats": {
        "js|ts": {
            "prepend": "// "
        }
    }
}

This example will do the same as the top example however if a file type of a file being checked is not any of those specified in the list of defaults (e.g. ts, js, css, gitignore etc) then the license text used for checking that file will be second_header.txt. If the license is in a ts or js file then the license check will check that each line of the license in the file starts with `// ` rather than using the defaults for those file types of having the whole license commented out with a multiline comment using `/*` and `*/`.
