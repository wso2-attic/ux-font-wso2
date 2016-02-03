# Looking to contribute new icons?

### Here’s how you can help…

Font WSO2 relies on icons that are submitted as SVG files. There are many vector image authoring tools that can be used to design your icon and most of those will support SVG export.

## System Icon Design Guide

System or UI Icons are used to symbolize common actions and commands. They are also used to represent real world objects and concepts. Font WSO2 icons are inspired and derived by many standard icons taking its essence to ensure readability and clarity in any size or medium. Please make sure to follow these guidelines to keep the icon stack that way.


Lets look at what needs to be in place to qualify your icon design as a valid font WSO2 icon.

**Icon Size**: 
14px by 14px

**Design Principles**

1. Use Bold and geometric shapes
2. Use 100% scale for pixel-accuracy
3. Use readily understood and widely acceptable symbols

**Icon Positioning on Content Area**

**Icon Anatomy**

1. Stroke Terminal : 90 Deg [Squared]
2. Stroke : 1.2px
3. Corner radius: None

**Best Practices**

+ Use consistent 1.2px stroke weight and squared stroke terminals
+ All icons should be front facing and 2 dimensional
+ Simplify Icons for readability and clarity
+ Position icons to snap to pixel grid

**Color**

Base color : **#000000**

_Please note that we support only one color which is the base color and icon color will be a part of its presentation._

##Requesting new icons

If you feel the need of a new icon which is not in our [icon base](http://wso2-dev-ux.github.io/font-wso2/icons.html), you can request a new!

1. Search to see if your icon request already exists. If a request is found, please +1 that one.
2. Make requests for single icons, unless you are requesting a couple of strictly related icons (e.g., sort-up/sort-down).
3. Use below format to submit your icon request:

    + Title your new issue  Icon Request: fw- (e.g., Icon Request: fw-car)
    + Include a few use cases for your requested icon. How do you plan on using it?
    + Attach a single color image or two that represent the idea you're going for
    
    Git Repository: [https://github.com/wso2-dev-ux/font-wso2](https://github.com/wso2-dev-ux/font-wso2)
    
4. Request concrete objects: it's harder to make an icon to represent happiness, it's easier to make a smiley face.


##Preparing your authoring tool

1. Set your canvas size to 14px by 14px and make sure the aspect ratio is 1:1
2. Use only one Layer / Group per design, exported SVG path should be a single path
3. Name of the Layer / Group will be the icon’s uniquely identifiable name in the library
4. Make sure to make a compound path before exporting / saving to a valid SVG file
5. When exporting, use the same name which you gave to name the Layer / Group

##Making sure the SVG format is valid

1. Open the exported / saved SVG file in an editor
2. Make sure the XML markup contains only one <path>, <polygon> or any other basic shape element
3. Make sure <svg … id=””> attribute is the exact same as the SVG file name

##Final steps

1. Copy the newly created icon (in .svg format) into the cloned project path

    _Eg: /font-wso2/icons/newicon.svg_

2. Open "/font-wso2/icons.properties" and add the name of the icon file with codepoint value

    _Eg: "service":0xe66d_

> Thank you