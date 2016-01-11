function GameController($scope, $http, $location, GameFactory) {
    $scope.artists = [];
    $scope.albums = [];
    $scope.loading = true;
    $scope.showPic = false;
    $scope.picSrc = "";
    $scope.TotalPoints = TotalPoints;
    $scope.Round = roundsCount;
    $scope.gesture = "";
    $scope.showingAnswer = false;
    $scope.ButtonText = "Send";

    initGame();

    $scope.startNewGame = function () {
        initGame();
        $location.path("/");
    };

    $scope.submitAnswer = function () {
        if($scope.showingAnswer) endOfRound();
        if ($scope.guessed == null || $scope.guessed == "") return;
        if ($scope.guessed.toLowerCase() == currArtist.toLowerCase()) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
    };

    function initGame() {
        $scope.artists = GameFactory.getArtists();
        currRoundPoints = maxRoundPoints;
        roundsCount = 0;
        TotalPoints = 0;

        initRound();
    }

    function handleCorrectAnswer() {
        endOfRound();
    }

    function handleWrongAnswer() {
        guessesCount++;
        if (guessesCount == maxGuesses) {
            currRoundPoints = 0;
            $scope.gesture = "Wrong answer, The Artist is: " + currArtist;
            $scope.ButtonText = "Continue";
            $scope.showingAnswer = true;
        } else {
            $scope.gesture = "Wrong answer, Try Again.";
            currRoundPoints -= pointsToReduceEachTurn;
            setNextAlbum();
            if (guessesCount == maxGuesses - 1)
                $scope.showPic = true;
        }
    }

    function setCurrArtist() {
        currArtist = $scope.artists[roundsCount];
        $scope.artistName = currArtist;
    }

    function initRound() {
        $scope.index = 1;
        $scope.showPic = false;
        $scope.guessed = "";
        $scope.albums = [];
        $scope.Round = roundsCount + 1;
        $scope.wrong = false;
        $scope.correct = false;
        $scope.showingAnswer = false;
        $scope.ButtonText = "Send";
        $scope.gesture = "";
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
        $scope.TotalPoints = TotalPoints;
        roundsCount++;
        currArtist = $scope.artists[roundsCount];
        $scope.artistName = currArtist;
        if (roundsCount == numOfRounds) {
            EndGame();
        }
        initRound();
    }

    function EndGame() {
        console.log(TotalPoints);
        console.log(currRoundPoints);
        $location.path("/GameOver");
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

    function setNextAlbum() {
        rndAlbum = randomAlbum();
        rndAlbum.idx = guessesCount + 1;
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
}

guessTheArtist.controller('GameController', GameController);



