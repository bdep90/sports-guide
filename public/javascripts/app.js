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
    $('.soccer-link').on('click', sportsGuide.showSport);
    $('button#history').on('click', sportsGuide.showSoccerHistory);
    $('button#rules').on('click', sportsGuide.showSoccerRules);
    $('button#facts').on('click', sportsGuide.showSoccerFacts);
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

  showSport: (event) => {
    event.preventDefault();

    sportsGuide.resetView();
    $('.sport-show').show();
    $('.soccer-history').show();
  },

  showSoccerHistory: (event) => {
    event.preventDefault();

    sportsGuide.resetSportView();
    $('.soccer-history').show();
  },

  showSoccerRules: (event) => {
    event.preventDefault();

    sportsGuide.resetSportView();
    $('.soccer-rules').show();
  },

  showSoccerFacts: (event) => {
    event.preventDefault();

    sportsGuide.resetSportView();
    $('.soccer-facts').show();
  },

  resetView: () => {
    $('.signup').hide();
    $('.login').hide();
    $('.user-show').hide();
    $('.about').hide();
    $('.contact').hide();
    $('.sport-show').hide();
    $('.sport-index').hide();
  },

  resetSportView: () => {
    $('.soccer-history').hide();
    $('.soccer-rules').hide();
    $('.soccer-facts').hide();
  }

}

$(() => {
  console.log('Load....');
  sportsGuide.init();
})
