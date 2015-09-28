#!/usr/bin/env node

var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
    name: 'fis',
    processTitle: 'fis',
    moduleName: 'fis',
    configName: 'fis-conf',

    // only js supported!
    extensions: {
        '.js': null
    }
});

cli.launch({
    cwd: argv.r || argv.root,
    configPath: argv.f || argv.file
}, function(env) {
    var fis;
    if (!env.modulePath) {
        fis = require('../');
    } else {
        fis = require(env.modulePath);
    }
    fis.set('system.localNPMFolder', path.join(env.cwd, 'node_modules/fis3'));
    fis.set('system.globalNPMFolder', path.dirname(__dirname));
    fis.cli.name = this.name;
    fis.cli.info = fis.util.readJSON(path.join(__dirname, '../package.json'));
    fis.set('project.ignore', ['node_modules/**', '.idea/**', '.gitignore', '**/_*.scss', '.docs/**',
        'publish/**', '.dist/**', '.git/**', '.svn/**', 'gruntfile.js', 'gulpfile.js', 'fis-conf.js'])
        .set("project.fileType.text", "hbs,tpl");
    fis.cli.run(argv, env);
});
