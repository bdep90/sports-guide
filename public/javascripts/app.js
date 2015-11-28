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
    $('button#teams').on('click', sportsGuide.showSoccerTeams); //
    $('button#teams').on('click', sportsGuide.showSoccerCrest);
    $('button#teams').on('click', sportsGuide.showSoccerVal);
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


  //////////////////////////////////
  //----November 28th---Below----//
  ////////////////////////////////
  showSoccerTeams: (event) =>{
    console.log('showTeam run...');
    event.preventDefault();
    sportsGuide.resetSportView();
    $('.soccer-teams').show();
    $.ajax({
      url: "/sports/api"
    })
    .done(function(res){
      jQuery.each(res, (index, value) => {
        // console.log(index);
        let p = $('<p>" ' + value + ' "</p>');
        p.appendTo('.teams');
      })
    });
  },
  ///////////////////////////////////
  //--November 28th above --------//
  /////////////////////////////////



  //////////////////////////////////
  //----November 28th---Below----//
  ////////////////////////////////

  showSoccerVal: (event) => {
    console.log('showSoccer val run');
    event.preventDefault();

    sportsGuide.resetSportView();
    $('.soccer-teams').show();
    $.ajax({
      url: "/sports/teamval"
    })
    .done(function(res){
      jQuery.each(res, (index, value) => {
        console.log(index);
        let p = $('<p>" ' + value + ' "</p>');
        p.appendTo('.market');
      })
    });
  },
  ///////////////////////////////////
  //--November 28th above --------//
  /////////////////////////////////



  showSoccerCrest: (event) => {
    console.log('showSoccer Crest...');
    event.preventDefault();

    sportsGuide.resetSportView();
    $('.soccer-teams').show();
    $.ajax({
      url: "/sports/teamcrest"
    })
    .done(function(res) {
      jQuery.each(res, (index, value) => {
        console.log(index);
        let img = $('<img src=" ' + value + '"></img>');
        img.appendTo('.logo');
        // $('.team-crest').
      })


      // $('img').attr('src', res).appendTo('.soccer-teams');
    });
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
    $('.soccer-teams').hide(); //
  }

}

$(() => {
  console.log('Load....');
  sportsGuide.init();
})
