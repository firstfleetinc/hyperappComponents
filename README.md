## Installation

Clone this repo manually or use `brunch new dir -s es6`

## Getting started

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * Brunch plugins and app dependencies: `npm install`
* Run:
    * `npm start` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `npm run build` — builds minified project for production
* Add Components
    * Copy all your component functions into hyperapp.js 
    * run `rollup -c` to generate a new prod bundle.js file.
    * Add your components to the home page demo.
    * copy bundle.js contents into the hyperapp npm project and publish to NPM

# How to Use

## Use Components in another project

Go to releases on the github page, download the latest hyperAppcComponents.js and import components into your project. Don't forget to grab the hyperAppComponents.css as well. 