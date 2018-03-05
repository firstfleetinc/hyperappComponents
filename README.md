# Brunch + Babel/ES6

This is a modern JS skeleton for [Brunch](http://brunch.io).

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
    * Drop your component folders in the components directory. 
    * run rollup -c to generate a new prod hyperAppComponents file.
    * Add your components to the home page demo.

## ES-next

To use proposed JS features not included into ES6, do this:

* `npm install --save-dev babel-preset-stage-0`
* in `brunch-config.js`, add the preset: `presets: ['latest', 'stage-0']`

# How to Use

## Use Components in another project

Clone the repo, drop hy