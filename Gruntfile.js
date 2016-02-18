var path = require('path');

module.exports = function(grunt) {
    
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
        webfont: {
            icons: {
                src: 'icons/*.svg',
                dest: 'dist/fonts',
                destCss: 'dist/css',
                options: {
                    font: '<%= pkg.name %>',
                    destHtml: 'dist',
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
              'dist/css/<%= pkg.name %>.min.css': ['dist/css/<%= pkg.name %>.css']
            }
        }
        },
        zip: {
            'using-cwd': {
                cwd: 'dist/',
                src: [
                    'dist/css/<%= pkg.name %>.css',
                    'dist/css/<%= pkg.name %>.min.css',
                    'dist/fonts/<%= pkg.name %>.eot',
                    'dist/fonts/<%= pkg.name %>.svg',
                    'dist/fonts/<%= pkg.name %>.ttf',
                    'dist/fonts/<%= pkg.name %>.woff'
                ],
                dest: 'dist/downloads/<%= pkg.name %>-<%= pkg.version %>.zip'
            }
        },
        json_generator: {
            target: {
                dest: "dist/build.json",
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
                    { expand: true, cwd: 'dist/fonts/', src: ['**'], dest: 'docs/assets/fonts/' },
                    { expand: true, cwd: 'dist/css/', src: ['**'], dest: 'docs/assets/css/' },
                    { expand: true, cwd: 'dist/downloads/', src: ['**'], dest: 'docs/assets/downloads/' },
                    { expand: true, cwd: 'dist/', src: ['build.json'], dest: 'docs/assets/data/' },
                    { expand: true, cwd: '', src: ['icons.properties'], dest: 'docs/assets/data/' }
                ],
            },
        }
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-json-generator');

    // Default task(s).
    grunt.registerTask('default', ['webfont','cssmin','zip','copy','json_generator']);

};