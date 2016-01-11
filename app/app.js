var guessTheArtist = angular.module('guessTheArtist', ['ngRoute']);

var ArtistDataUrlBase = "https://itunes.apple.com/";
var maxRoundPoints = 5;
var numOfRounds = 5;
var maxGuesses = 3;
var pointsToReduceEachTurn = 2;
var TotalPoints = 0

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

function addAlbumToList(data){
    if(data.wrapperType == "collection") {
        allCurrAlbums.push({name: data.collectionName, art: data.artworkUrl100});
    }
}

function randomAlbum() {
    var randomIndex = Math.floor(Math.random() * allCurrAlbums.length);
    var album = allCurrAlbums[randomIndex];
    allCurrAlbums.splice(randomIndex, randomIndex + 1);
    return album;
}

