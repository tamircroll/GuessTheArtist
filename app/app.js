var guessTheArtist = angular.module('guessTheArtist', ['ngRoute']);

var ArtistDataUrlBase = "https://itunes.apple.com/search";
var maxRoundPoints = 5;
var numOfRounds = 5;
var maxGuesses = 3;
var pointsToReduceEachTurn = 2;

var allCurrAlbums = [];
var currRoundPoints = maxRoundPoints;
var roundsCount = 0;
var guessesCount = 0;

var currArtist = "";

guessTheArtist.config(config);

function config($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'GameController',
            templateUrl: 'Views/GameView.html'
        })
        .when('/GameOver',
        {
            controller: 'GameController',
            templateUrl: 'Views/GameOver.html'
        })
        .otherwise({redirectTo: '/'});
}


