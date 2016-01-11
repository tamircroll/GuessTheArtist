function GameController($scope, $http, $location, GameFactory) {
    $scope.artists = [];
    $scope.albums = [];
    $scope.loading = true;
    $scope.showPic = false;
    $scope.picSrc = "";

    initGame();

    $scope.submitAnswer = function () {
        if ($scope.guessed == null || $scope.guessed == "") return;
        if ($scope.guessed.toLowerCase() == currArtist.toLowerCase()) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
    };

    $scope.startNewGame = function () {
        initGame();
        $location.path("/");
    };

    function initGame() {
        $scope.pic = "http://www.planwallpaper.com/static/images/125146_nature-flowers-1600x1200-wallpaper.jpg";
        $scope.artists = GameFactory.getArtists();
        currRoundPoints = maxRoundPoints;
        roundsCount = 0;
        guessesCount = 0;
        TotalPoints = 0;
        initRound();
    }

    function handleCorrectAnswer() {
        endOfRound();
    }

    function handleWrongAnswer() {
        guessesCount++;
        currRoundPoints -= pointsToReduceEachTurn;
        if (guessesCount == maxGuesses) {
            endOfRound();
        } else {
            setNextAlbum();
            if(guessesCount == maxGuesses - 1)
                $scope.showPic = true;
        }
    }

    function setCurrArtist() {
        currArtist = $scope.artists[roundsCount];
        $scope.artistName = currArtist;
    }

    function initRound() {
        $scope.showPic = false;
        $scope.albums = [];
        setCurrArtist();
        setCurrAlbums();
        guessesCount = 0;
        currRoundPoints = maxRoundPoints;
    }

    function setCurrAlbums() {
        allCurrAlbums = [];
        GameFactory.getArtistId(currArtist)
            .then(function (id) {
                setAlbumsById(id.data.results[0].artistId)
            });
    }

    function endOfRound() {
        $scope.loading = true;
        TotalPoints += currRoundPoints;
        roundsCount++;
        currArtist = $scope.artists[roundsCount];
        $scope.artistName = currArtist;
        if (roundsCount == numOfRounds) {
            EndGame();
        }
        initRound();
    }

    function EndGame() {
        TotalPoints += currRoundPoints;
        $location.path("/GameOver");
        $scope.TotalPoints = TotalPoints;
    }

    function setAlbumsById(id) {
        return $http.get("https://itunes.apple.com/lookup?id=" + id + "&entity=album")
            .success(function (data, status, headers, config) {
                addAllAlbumsToList(data.results);
            });
    };

    function doneInitAllAlbubmsArray() {
        $scope.loading = false;
        setNextAlbum();
        }

    function setNextAlbum(){
        rndAlbum = randomAlbum();
        $scope.picSrc = rndAlbum.art;
        $scope.albums.push(rndAlbum);

    }

    function addAllAlbumsToList(datas) {
        for (data in datas) {
            addAlbumToList(datas[data]);
            if (data == datas.length - 1) {
                doneInitAllAlbubmsArray();
            }
        }
    }
};
guessTheArtist.controller('GameController', GameController);



