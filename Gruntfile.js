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
    
    var iconFiles = (function(){
        var dataObj = {};
        codePointString.forEach(function(codeString){
            var iconName = codeString.split(':')[0];
            
            iconName = iconName.replace(/"/g,''); //Remove double quotes
            iconName = iconName.replace(/\[.*?\]/g, ''); //Remove [square brackets with value]
            
            iconSVG = grunt.file.read('icons/' + iconName + '.svg');
            iconSVG = iconSVG.replace(/<!--[\s\S]*?-->/g, ''); //Remove XML comments
            iconSVG = iconSVG.replace(/<\?xml\s[\s\S]*?>/, ''); //remove XML declaration tag
            
            dataObj[iconName] = iconSVG;
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
                    destHtml: 'docs',
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
                    codepoints: iconsList,
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
            'dist': {
                cwd: 'dist/',
                src: ['dist/**'],
                dest: 'docs/assets/downloads/<%= pkg.name %>-<%= pkg.version %>.zip'
            },
            'png': {
                cwd: 'assets/',
                src: ['assets/**.png'],
                dest: 'docs/assets/downloads/<%= pkg.name %>-<%= pkg.version %>-png.zip'
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'dist/fonts/', src: ['**'], dest: 'docs/assets/fonts/' },
                    { expand: true, cwd: 'dist/css/', src: ['**'], dest: 'docs/assets/css/' },
                    { expand: true, cwd: '', src: ['icons.properties'], dest: 'docs/assets/data/' },
                    { expand: true, cwd: '', src: ['package.json'], dest: 'docs/assets/data/' },
                ],
            },
        },
        json_generator: {
            icons: {
                dest: "dist/icons.json",
                options: iconFiles
            }
        },
        "convert-svg-to-png": {
            main: {
                options: {
                    size: {w: "128px", h: "128px"},
                },
                files: [{
                    expand: true,
                    cwd: "icons",
                    src: ["*.svg"],
                    dest: "assets"
                }]
            }
        },
        responsive_images: {
            main: {
                options: {
                    sizes: [{
                        width: 16,
                        suffix: "_16"
                    },{
                        width: 24,
                        suffix: "_24"
                    },{
                        width: 64,
                        suffix: "_64"
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**.png'],
                    cwd: 'assets/',
                    custom_dest: 'docs/assets/downloads/icons/{%= width %}/'
                }]
            }
        }
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-json-generator');
    grunt.loadNpmTasks('grunt-convert-svg-to-png');
    grunt.loadNpmTasks('grunt-responsive-images');

    // Default task(s).
    grunt.registerTask('default', ['webfont','cssmin','zip','copy','json_generator']);
    grunt.registerTask('genimgs', ['convert-svg-to-png','responsive_images']);

};