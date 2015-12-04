var path = require('path');

module.exports = function(grunt) {
    
    var classPrefix = 'fw',
        codepoints = grunt.file.read('icons.properties');
    
    function removeEscapeCharactersJsonObject(obj){
        var str = JSON.stringify(obj);
        str = str.replace(/(?:\\[rn"\"]|[\r\n]+)+/g, ''); //Remove characters "\r\n"
        str = JSON.parse(str);
        return str;
    }
    
    var iconsList = (function(){
        var codePointString = codepoints.split(',');
        var dataObj = {};
        codePointString.forEach(function(codeString){
            var cssClass = codeString.split(':')[0];
            cssClass = cssClass.replace(/\[.*?\]/g, ''); //Remove [square brackets with value]          
            dataObj[cssClass] = parseInt(codeString.split(':')[1],16);
        });
        
        return removeEscapeCharactersJsonObject(dataObj);

    })();
    
    var subClassesExtract = (function() {
        var codePointString = codepoints.split(',');
        var dataObj = {};
        codePointString.forEach(function(codeString){
            var cssClass = codeString.split(':')[0];
            var subCssClasses = cssClass.match(/[^[\]]+(?=])/g); //Extract values in [square brackets]          
            cssClass = cssClass.replace(/\[.*?\]/g, ''); //Remove [square brackets with value]
            if(subCssClasses !== null){
                subCssClasses = subCssClasses.toString();
                var subCssClassesArray = subCssClasses.split('||');
                var css = '';
                for(var i = 0; i < subCssClassesArray.length; i++){
                    css += ', .'+classPrefix+'-'+subCssClassesArray[i]+':before';
                }
                dataObj[cssClass] = css;
            }
            else{
                dataObj[cssClass] = '';
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
                    types: ['woff','ttf','eot','svg'],
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
                    'build/fonts/<%= pkg.name %>.woff'
                ],
                dest: 'build/downloads/<%= pkg.name %>-<%= pkg.version %>.zip'
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'build/fonts/', src: ['**'], dest: 'gh-pages/assets/fonts/' },
                    { expand: true, cwd: 'build/css/', src: ['**'], dest: 'gh-pages/assets/css/' }
                ],
            },
        }
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['webfont','cssmin','zip','copy']);

};