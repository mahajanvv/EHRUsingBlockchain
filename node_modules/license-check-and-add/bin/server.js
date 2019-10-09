#! /usr/bin/env node
var pkgConf = require('pkg-conf'),
	license = require('../index');

var getConfigFromMainPackageJson = function () {
	return pkgConf.sync('license-check-and-add-config', process.cwd());
};

var start = function () {
	var config = getConfigFromMainPackageJson();
	license.run(config);
};

start();
