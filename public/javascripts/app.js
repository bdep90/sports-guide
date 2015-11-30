'use strict';

let sportsGuide = {
  init: () => {
    sportsGuide.addEventListeners();
  },

  addEventListeners: () => {
    $('.signup-link').on('click', sportsGuide.showSignup);
    $('.login-link').on('click', sportsGuide.showLogin);
    $('.about-link').on('click', sportsGuide.showAbout);
    $('.contact-link').on('click', sportsGuide.showContact);
    $('.news-link').on('click', sportsGuide.showTweets);
    $('.edit-link').on('click', sportsGuide.showEdit);
    $('button.btn.btn-primary.form-control').on('click', sportsGuide.showSoccer);
    $('button#history').on('click', sportsGuide.showSoccerHistory);
    $('button#rules').on('click', sportsGuide.showSoccerRules);
    $('button#facts').on('click', sportsGuide.showSoccerFacts);
    // $('button#teams').on('click', sportsGuide.showSoccerTeams);
    // $('button#teams').on('click', sportsGuide.showSoccerCrest);
    // $('button#teams').on('click', sportsGuide.showSoccerVal);
    $('button#teams').on('click', sportsGuide.showSoccerTeamInfo);
    $('button#teams').on('click', sportsGuide.showSoccerPlayerInfo);
    /////// NOV 29th //////////
    $('.soccer-teams').on('click', 'button.playerButton', sportsGuide.showSoccerPlayerInfo);
    },

  showSignup: (event) => {
    event.preventDefault();
    console.log($('sign up'));
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

  showTweets: (events) => {
    event.preventDefault();
    sportsGuide.resetView();
    $('.news').show();
    $.ajax({
      url: "/tweets"
    })
    .done((data) => {
      $('.tweets').empty();
      for(var j = data.length -1; j > -1; j--) {
        for (var i = 0; i < data[j].statuses.length; i++) {
          let p = $('<p class="ind-tweets">' + '<strong>' + '@'+ data[j].statuses[i].user.screen_name + '</strong>' + ": " + data[j].statuses[i].text + '<br>' + data[j].statuses[i].created_at + '</p>');
          p.appendTo('.tweets');
        };
      };
    });
  },


  showEdit: (event) => {
    event.preventDefault();
    sportsGuide.resetSportView();
    $('.btn-group').hide();
    $('.edit').show();
  },

  showSoccer: (event) => {
    event.preventDefault();
    sportsGuide.resetView();
    $('.btn-group').show();
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

  //////ADDED AFTER BRIDGETTE PULL ///////
  showSoccerTeamInfo: (event) => {
    event.preventDefault();
    // console.log('clicked showSoccer');
    sportsGuide.resetSportView();

    $.ajax({
        url: "/sports/api2"
      })
      .done(function(res){

        $.each(res, (index, team) => {

          let $teamNameDiv = $("<div></div>");
          $teamNameDiv.addClass('col-md-4 text-center');
          let $teamName = $('<p></p>');
          $teamName.text(team['name']);
          $teamNameDiv.append($teamName);


          let $teamCrestDiv = $("<div class='col-md-2'></div>");
          let $teamCrest= $("<img class='img-responsive'>");
          $teamCrest.attr('src', team['crestUrl']);
          $teamCrestDiv.append($teamCrest);

          let $teamMarketValueDiv = $("<div class='col-md-4'></div>");
          let $teamMarketValue = $("<p></p>");
          // console.log(team['squadMarketValue']);
          $teamMarketValue.text(team['squadMarketValue']);
          $teamMarketValueDiv.append($teamMarketValue);

          let $showPlayerBtn = $("<div class='col-md-2'><button class='playerButton btn btn-primary'>Show players</button></div>");

          let $teamRowDiv = $("<div class='row team-row'></div>");
          // $teamRowDiv.data('url', team['player_href']);
          $teamRowDiv.data('url', team['player_href']);

          $teamRowDiv.append($teamNameDiv);
          $teamRowDiv.append($teamCrestDiv);
          $teamRowDiv.append($teamMarketValueDiv);
          $teamRowDiv.append($showPlayerBtn);

          let $playerListDiv = $("<div class='row col-md-12 player-list'></div>");

          $('.soccer-teams').append($teamRowDiv)
          $($teamRowDiv).append($playerListDiv)
        });

        $('.soccer-teams').show();
      });
  },

///////////DO NOT PASS/////////////////////////////////////

showSoccerPlayerInfo: (event) => {
  event.preventDefault();
  // console.log('clicked showSoccer');

  // console.log('show palyer clicked');
  // sportsGuide.resetSportView();

  // console.log($(event.target).closest('.team-row'));
  let $teamRowDiv = $(event.target).closest('.team-row');
  let href = $teamRowDiv.data('url');


  let $playerListDiv = $teamRowDiv.find('.player-list');

  var isVisible = false;
  if(($playerListDiv).is(':visible')){
    var isVisible = true;
  }


  $playerListDiv.show();

  console.log($playerListDiv);

  $.ajax({
      url: "/sports/api3?href=" + href
    })
    .done(function(res){
      $playerListDiv.empty();

      // render header for the player list
      let $playerNameDiv = $("<div></div>");
      $playerNameDiv.addClass('col-md-4 text-center');
      let $playerName = $('<p>Name</p>');
      $playerNameDiv.append($playerName);

      let $playerPositionDiv = $("<div></div>");
      $playerPositionDiv.addClass('col-md-4 text-center');
      let $playerPosition = $('<p>Position</p>');
      $playerPositionDiv.append($playerPosition)

      let $playerNationalityDiv = $("<div></div>");
      $playerNationalityDiv.addClass('col-md-4 text-center');
      let $playerNationality = $('<p>Nationality</p>');
      $playerNationalityDiv.append($playerNationality);


      $playerListDiv.append($playerNameDiv);
      $playerListDiv.append($playerPositionDiv);
      $playerListDiv.append($playerNationalityDiv);


      $.each(res, (index, player) => {
        console.log(index);
        let $playerNameDiv = $("<div></div>");
        $playerNameDiv.addClass('col-md-4 text-center');
        let $playerName = $('<p></p>');
        $playerName.text(player['name']);
        $playerNameDiv.append($playerName);

        let $playerPositionDiv = $("<div></div>");
        $playerPositionDiv.addClass('col-md-4 text-center');
        let $playerPosition = $('<p></p>');
        $playerPosition.text(player['position']);
        $playerPositionDiv.append($playerPosition)

        let $playerNationalityDiv = $("<div></div>");
        $playerNationalityDiv.addClass('col-md-4 text-center');
        let $playerNationality = $('<p></p>');
        $playerNationality.text(player['nationality']);
        $playerNationalityDiv.append($playerNationality);


        $playerListDiv.append($playerNameDiv);
        $playerListDiv.append($playerPositionDiv);
        $playerListDiv.append($playerNationalityDiv);


      });

      if(isVisible){
        $playerListDiv.fadeOut();
      }
      else {
        $playerListDiv.fadeIn();
      }

    });

  },



////COMMENTED OUT BELOW PREVIOUS CODE////////



  // showSoccerTeams: (event) =>{
  //   // console.log('showTeam run...');
  //   event.preventDefault();
  //   sportsGuide.resetSportView();
  //   $('.soccer-teams').show();
  //   $.ajax({
  //     url: "/sports/api"
  //   })
  //   .done(function(res){
  //     jQuery.each(res, (index, value) => {
  //       // console.log(index);
  //       let p = $('<p>" ' + value + ' "</p>');
  //       p.appendTo('.teams');
  //     })
  //   });
  // },
  //
  // showSoccerVal: (event) => {
  //   // console.log('showSoccer val run');
  //   event.preventDefault();
  //   sportsGuide.resetSportView();
  //   $('.soccer-teams').show();
  //   $.ajax({
  //     url: "/sports/teamval"
  //   })
  //   .done(function(res){
  //     jQuery.each(res, (index, value) => {
  //       console.log(index);
  //       let p = $('<p>" ' + value + ' "</p>');
  //       p.appendTo('.market');
  //     })
  //   });
  // },
  //
  // showSoccerCrest: (event) => {
  //   console.log('showSoccer Crest...');
  //   event.preventDefault();
  //   sportsGuide.resetSportView();
  //   $('.soccer-teams').show();
  //   $.ajax({
  //     url: "/sports/teamcrest"
  //   })
  //   .done(function(res) {
  //     jQuery.each(res, (index, value) => {
  //       console.log(index);
  //       let img = $('<img src=" ' + value + '"></img>');
  //       img.appendTo('.logo');
  //     })
  //   });
  // },





  resetView: () => {
    $('.signup').hide();
    $('.login').hide();
    $('.user-show').hide();
    $('.about').hide();
    $('.contact').hide();
    $('.news').hide();
    $('.sport-show').hide();
    $('.sport-index').hide();
  },

  resetSportView: () => {
    $('.soccer-history').hide();
    $('.soccer-rules').hide();
    $('.soccer-facts').hide();
    $('.soccer-teams').hide();
    $('.edit').hide();
  }

}

$(() => {
  console.log('Load....');
  sportsGuide.init();
})
