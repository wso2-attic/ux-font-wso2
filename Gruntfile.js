var path = require('path');

module.exports = function(grunt) {
    
    //require('load-grunt-tasks')(grunt);
    
    var classPrefix = 'fw',
        codepoints = grunt.file.read('icons.properties'),
        codePointString = codepoints.split('\n');
    
    function removeEscapeCharactersJsonObject(obj){
        var str = JSON.stringify(obj);
        str = str.replace(/(?:\\[rn"\"]|[\r\n]+)+/g, ''); //Remove characters "\r\n"
        str = JSON.parse(str);
        return str;
    }
    
    var iconsList = (function(){
        var dataObj = {};
        codePointString.forEach(function(codeString){
            var cssClass = codeString.split(':')[0]; 
            cssClass = cssClass.replace(/\[.*?\]/g, ''); //Remove [square brackets with value] 
            cssClass = cssClass.replace(/"/g,''); //Remove double quotes
            var className = cssClass.split('@');
            dataObj[className[0]] = parseInt(codeString.split(':')[1],16);
        });
        
        return removeEscapeCharactersJsonObject(dataObj);
    })();
    
    var subClassesExtract = (function() {
        var dataObj = {};
        codePointString.forEach(function(codeString){
            var cssClass = codeString.split(':')[0];
            var subCssClasses = cssClass.match(/[^[\]]+(?=])/g); //Extract values in [square brackets]          
            cssClass = cssClass.replace(/\[.*?\]/g, ''); //Remove [square brackets with value]
            cssClass = cssClass.replace(/"/g,''); //Remove double quotes
            var className = cssClass.split('@');
            if(subCssClasses !== null){
                subCssClasses = subCssClasses.toString();
                var subCssClassesArray = subCssClasses.split('||');
                var css = '';
                for(var i = 0; i < subCssClassesArray.length; i++){
                    var subClassName = subCssClassesArray[i].split('@');
                    css += ', .'+classPrefix+'-'+subClassName[0]+':before';
                }
                dataObj[className[0]] = css;
            }
            else{
                dataObj[className[0]] = '';
            }
        });
        
        return removeEscapeCharactersJsonObject(dataObj);     
    })();

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build'],
            release: ['dist']
        },
        webfont: {
            icons: {
                src: 'icons/*.svg',
                dest: 'build/fonts',
                destCss: 'build/css',
                options: {
                    font: '<%= pkg.name %>',
                    destHtml: 'build',
                    htmlDemoTemplate: 'templates/tmpl.html',
                    htmlDemoFilename: 'demo',
                    fontFilename: '<%= pkg.name %>',
                    template: 'templates/tmpl.css',
                    templateOptions: {
                        baseClass: classPrefix,
                        classPrefix: classPrefix+'-',
                        mixinPrefix: classPrefix+'-icon-',
                        subClasses: subClassesExtract
                    },
                    engine: 'fontforge',
                    normalize: true,
                    types: ['woff','woff2','ttf','eot','svg'],
                    fontHeight: 512,
                    startCodepoint: 0xe600,
                    codepoints: iconsList, //eval('({'+codepoints+'})')
                    callback: function(filename, types, glyphs, hash) {
                        grunt.log.write("\n" + hash + "\n");
                    }
                }
            }
        },
        cssmin: {
            css:{ 
                files: {
                    'build/css/<%= pkg.name %>.min.css': ['build/css/<%= pkg.name %>.css']
                }
            }
        },
        zip: {
            'using-cwd': {
                cwd: 'build/',
                src: [
                    'build/css/<%= pkg.name %>.css',
                    'build/css/<%= pkg.name %>.min.css',
                    'build/fonts/<%= pkg.name %>.eot',
                    'build/fonts/<%= pkg.name %>.svg',
                    'build/fonts/<%= pkg.name %>.ttf',
                    'build/fonts/<%= pkg.name %>.woff',
                    'build/fonts/<%= pkg.name %>.woff2'
                ],
                dest: 'build/downloads/<%= pkg.name %>-<%= pkg.version %>.zip'
            }
        },
        json_generator: {
            target: {
                dest: "build/build.json",
                options: {
                    "name": "<%= pkg.name %>",
                    "version": "<%= pkg.version %>",
                    "url": "<%= pkg.url %>",
                    "git": "<%= pkg.git %>",
                    "designer": "<%= pkg.designer %>",
                    "designerURL": "<%= pkg.designerURL %>",
                    "license": "<%= pkg.license %>",
                    "licenseURL": "<%= pkg.licenseURL %>"
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'build/fonts/', src: ['**'], dest: 'docs/assets/fonts/' },
                    { expand: true, cwd: 'build/fonts/', src: ['**'], dest: 'dist/fonts/' },
                    { expand: true, cwd: 'build/css/', src: ['**'], dest: 'docs/assets/css/' },
                    { expand: true, cwd: 'build/css/', src: ['**'], dest: 'dist/css/' },
                    { expand: true, cwd: 'build/downloads/', src: ['**'], dest: 'docs/assets/downloads/' },
                    { expand: true, cwd: 'build/', src: ['build.json'], dest: 'docs/assets/data/' },
                    { expand: true, cwd: '', src: ['icons.properties'], dest: 'docs/assets/data/' },
                    { expand: true, cwd: 'build', src: ['demo.html'], dest: 'docs/' }
                ],
            },
        }
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-json-generator');

    // Default task(s).
    grunt.registerTask('default', ['clean:build','webfont','cssmin','zip','json_generator','copy','clean:build']);

};