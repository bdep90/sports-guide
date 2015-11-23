'use strict';

let sportsGuide = {
  init: () => {
    sportsGuide.addEventListeners();
  },

  addEventListeners: () => {
    // let self = this;
    $('.signup-link').on('click', sportsGuide.showSignup);
    $('.login-link').on('click', sportsGuide.showLogin);
    $('.about-link').on('click', sportsGuide.showAbout);
    $('.contact-link').on('click', sportsGuide.showContact);
  },

  showSignup: (event) => {
    event.preventDefault();

    console.log($('.signup'));
    sportsGuide.resetView();
    $('.signup').show();
  },

  showLogin: (event) => {
    event.preventDefault();

    sportsGuide.resetView();
    $('.login').show();
  },

  showAbout: (event) => {
    event.preventDefault();

    sportsGuide.resetView();
    $('.about').show();
  },

  showContact: (event) => {
    event.preventDefault();

    sportsGuide.resetView();
    $('.contact').show();
  },

  resetView: () => {
    $('.signup').hide();
    $('.login').hide();
    $('.show').hide();
    $('.about').hide();
    $('.contact').hide();
  }
}

$(() => {
  console.log('Load....');
  sportsGuide.init();
})
