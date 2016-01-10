guessTheArtist.factory('GameFactory', function($http){
    var allArtists = [
        "The Beatles",
        "The Doors",
        "Led Zeppelin",
        "Deep purple",
        "Arctic Monkeys",
        "The Beach Boys",
        "Beck",
        "Cream",
        "The Cure",
        "David Bowie",
        "Eric Clapton",
        "Jeff Beck",
        "Jimi Hendrix",
        "Love",
        "Madness",
        "Muse",
        "Neil Young",
        "Nirvana",
        "No Doubt",
        "Queen"
    ];

    var factory = {};

    factory.getArtists = function(){
        return getRandomArtists();
    };

    return factory;

    function getRandomArtists() {
        var tempList = allArtists.slice();
        var arraySize = 5;
        toReturn = [];

        for (i = 0; i < numOfRounds; i++) {
            var randomIndex = Math.floor(Math.random() * arraySize);
            toReturn.push(tempList[randomIndex]);
            tempList.splice(randomIndex, randomIndex + 1);
            arraySize--;
        }

        return toReturn;
    }
});