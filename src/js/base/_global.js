/* eslint-disable no-unused-vars */
// Packages Imports
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import jQuery from 'jquery';
import Bootstrap from 'bootstrap';

//Passive Scroll
import Passive from './_passive';

// Modules Import
import Nav from './modules/_nav';
import ContentAnimations from './modules/_content-animation';
import Env from './_env';

// Window Globally definations
// eslint-disable-next-line no-multi-assign
window.$ = window.jQuery = jQuery;

export default class Global {
  constructor() {
    new Passive
    new Env();
    new Nav();
    new ContentAnimations(null,true);
  }
}
