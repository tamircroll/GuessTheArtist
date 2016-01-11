guessTheArtist.factory('GameFactory', function($http) {
    var allArtists = [
        "The Beatles",
        "The Doors",
        "Led Zeppelin",
        "deep purple",
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

    factory.getArtists = function () {
        return getRandomArtists();
    };

    factory.getArtistId = function (artist) {
        return artistId(artist);
    };

    factory.getAlbums = function (id) {
        return getAllAlbums(id);
    };

    return factory;

    function getRandomArtists() {
        var tempList = allArtists.slice();
        var arraySize = numOfRounds;
        toReturn = [];

        for (i = 0; i < numOfRounds; i++) {
            var randomIndex = Math.floor(Math.random() * arraySize);
            toReturn.push(tempList[randomIndex]);
            tempList.splice(randomIndex, randomIndex + 1);
            arraySize--;
        }

        return toReturn;
    }

    function getAllAlbums(id) {
        var url = ArtistDataUrlBase + "lookup?id=" + id + "&entity=album";
        return $http.get(url)
            .success(function (data, status, headers, config) {
                return data.results;
            });
    }

    function artistId(artistName) {
        var url = ArtistDataUrlBase + "search?term=" + artistName + "&limit=1";
        return $http({method: "GET", url: url})
            .success(function (data, status, headers, config) {
            return data.results[0].artistId;
        })
    }
});