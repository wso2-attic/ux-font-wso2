# Font WSO2 v1.0.0

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Font WSO2 gives you scalable vector icons that can instantly customized and use on any website with the power of CSS.
http://wso2-dev-ux.github.io/font-wso2/

Font generation is base on [sapegin/grunt-webfont](https://github.com/sapegin/grunt-webfont/)

## Build

Download and run `grunt` command
```
grunt
```

## Prerequisite

To run the build, this requires [grunt](http://gruntjs.com/getting-started) > 0.4, node, fontforge & ttfautohint.

Note that `ttfautohint` is optional, 
but your generated font will not be properly hinted if it’s not installed. And make sure you don’t use `ttfautohint` 0.97 because that version won’t work.

#### OS X

```
brew install ttfautohint fontforge --with-python
```

*You may need to use `sudo` for `brew`, depending on your setup.*

*`fontforge` isn’t required for `node` engine (see [below](#available-engines)).*

#### Linux

```
sudo apt-get install fontforge ttfautohint
```

*`fontforge` isn’t required for the `node` engine (see [below](#available-engines)).*

#### Windows

[install `ttfautohint`](http://www.freetype.org/ttfautohint/#download) (optional).

Then install `fontforge`.
* Download and install [fontforge](http://fontforge.github.io/en-US/downloads/windows/).
* Add `C:\Program Files (x86)\FontForgeBuilds\bin` to your `PATH` environment variable.

## How to Contribute

#### Add Icons

* Add SVG icons to the icons folder - Please read the icon [design guides](#)
* Open "icons.properties" and add the name of the icon file with codepoint value

ex:- `"service":0xe66d`

Optional if want to add sub class names follow the example. You can add them within [] brackets and use || for separate multiple names. See the example below

ex:- `"service[[cogwheels||gears]]":0xe66d`

## Available Engines

There are two font rendering engines available. See also `engine` option below.

| Engine   | Pros   | Cons   |
| ------ | ----------- | ----------- |
| fontforge | All features supported, The best results | You have to install `fontforge`, Really weird bugs sometimes |
| node | No external dependencies (except optional `ttfautohint`), Works on all platforms. | Doesn’t work [with some SVG files](https://github.com/fontello/svg2ttf/issues/25), Ligatures aren’t supported.|

## License

The MIT License, see the included [LICENSE](LICENSE) file.
