# SmoothJS
  SmoothJS is a very light ES6 Vanilla JavaScript + SCSS written Responsive Carousel

## Features

# Installation
  Clone this repo with the following command in Git Bash or a CLI of your choosing:

  ``` git clone https://github.com/william-abboud/Smooth.git ```

## Prerequisites
  You must have `Node.js 5.4` or later installed.

  If you don't have `NodeJS` installed on your machine head over to:
  https://nodejs.org/en/download/ and download the latest version.

  You also need to have `Gulp` installed globally. To do that you need to have `Node`
  installed already and install `Gulp` via `NPM` in a CLI of your choosing:

  ``` npm install -g Gulp ```

  If you have installed the prerequisites run the following command in a CLI of your choosing:

  ```npm install```

# Usage

To startup navigate inside the Smooth folder with your CLI and run the command:

```gulp serve```

This will fire up a server with an example from index.html
##Markup

Create an HTML block element and give it an id of "slider". Any classes you add are custom and will not affect the smooth slider.
Specify options as `data-` attributes. More examples of usage in `index.html`. Smooth slider accepts a lot of combination of markup and it will
attempt to slide anything such as plain images, images in content with more content, plain HTML elements with content in them etc.
```html
<div id="slider" class="your-class another-custom-class" data-timeout="5000" data-nav-controls="true">
</div>
```

###Options
As of now options are passed in as data attributes. On the slider element.

```
data-nav-controls="true"  // This option makes the slider look for nav-controls-wrapper element in it to create nav controls
```

```
data-timeout="" // This options specifies timeout for automatic sliding
```

Example:
```html
<div class="nav-controls-wrapper">
 <span class="nav-control--left"> < </span>
 <span class="nav-control--right"> > </span>
</div>
```

### Slider Content

```html
<img src="imgs/brooklyn.jpeg" alt="Brooklyn">
  <img src="imgs/skyscrapers.jpeg" alt=""> // plain Images
  <div> // HTML elements
    <p>Hello World</p>
  </div>
  <div> // HTML elements with content and images in it
    <h2>Hello again</h2>
    <img src="imgs/yosemite.jpeg" alt="">
</div>
```

## JavaScript
```javascript
import smooth from './smooth';
smooth('#slider') // Pass in slider id
```



# Development

`JavaScript`

Depending on the moment of time you are viewing the source code ES6 may or may not
be fully supported by all major browsers. As of this writing the project uses Babel and Gulp to compile the code
from ES6 to ES5.

If you are already using Babel or another ES6 compiler in your workflow grab the development (ES6) version.
