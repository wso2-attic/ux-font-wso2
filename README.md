# Font WSO2 v1.0

#### WSO2 Products User Interface Icons Set
http://wso2-dev-ux.github.io/font-wso2/

## Build

Download annd run grunt command
```
grunt
```
## Build

* Add SVG icons to the icons folder - Please read the icon design guides
* Open "icons.properties" and add the name of the icon file with codepoint value

ex:- `"wso2":0xe6a8`

*Optional if want to add sub class names follow the example. You can add them within [] brackets and use || for separate multiple names. See the example below

ex:- `"service[[cogwheels||gears]]":0xe66d`

## Prerequisite

To run the build, this requires Grunt 0.4 and Node Package Manager. And `fontforge`.

Note that `ttfautohint` is optional, 
but your generated font will not be properly hinted if it’s not installed. And make sure you don’t use `ttfautohint` 0.97 because that version won’t work.

### OS X

```
brew install ttfautohint fontforge --with-python
```

*You may need to use `sudo` for `brew`, depending on your setup.*

*`fontforge` isn’t required for `node` engine (see below).*

### Linux

```
sudo apt-get install fontforge ttfautohint
```

*`fontforge` isn’t required for the `node` engine (see [below](#available-engines)).*

### Windows

[install `ttfautohint`](http://www.freetype.org/ttfautohint/#download) (optional).

Then install `fontforge`.
* Download and install [fontforge](http://fontforge.github.io/en-US/downloads/windows/).
* Add `C:\Program Files (x86)\FontForgeBuilds\bin` to your `PATH` environment variable.

*`fontforge` isn’t required for the `node` engine (see [below](#available-engines)).*

## License

The MIT License, see the included [License.md](License.md) file.