#! /usr/bin/env node
var shell = require('shelljs');
shell.rm('-rf', 'dist');
shell.mkdir('dist');

