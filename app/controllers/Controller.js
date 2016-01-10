function GameController($scope, $http, $location, GameFactory) {
    $scope.artists = [];
    $scope.albums = [];
    $scope.TotalPoints = 0;

    initGame();

    $scope.submitAnswer = function() {
        if($scope.guessed == null || $scope.guessed == "") return;
        if ($scope.guessed.toLowerCase() == currArtist.toLowerCase()) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
    };

    $scope.startNewGame = function() {
        initGame();
        $location.path("/");
    };

    function initGame() {
        $scope.pic = "http://www.planwallpaper.com/static/images/125146_nature-flowers-1600x1200-wallpaper.jpg";
        $scope.artists = GameFactory.getArtists();
        currRoundPoints = maxRoundPoints;
        roundsCount = 0;
        guessesCount = 0;
        $scope.TotalPoints = 0;
        initRound();
    }

    function handleCorrectAnswer(){
        endOfRound();
    }

    function handleWrongAnswer() {
        guessesCount++;
        currRoundPoints -= pointsToReduceEachTurn;
        if (guessesCount == maxGuesses) {
            endOfRound();
        } else {
            $scope.albums.push(allCurrAlbums[guessesCount]);
        }
    }

    function setCurrArtist(){
        currArtist = $scope.artists[roundsCount];
        $scope.artistName = currArtist;
    }

    function initRound(){
        $scope.albums = [];
        setCurrArtist();
        setCurrAlbums();
        guessesCount = 0;
        $scope.albums.push(allCurrAlbums[guessesCount]);
        currRoundPoints = maxRoundPoints;
    }

    function endOfRound(){
        $scope.TotalPoints += currRoundPoints;
        roundsCount++;
        currArtist = $scope.artists[roundsCount];
        $scope.artistName = currArtist;
        if(roundsCount == numOfRounds){
            EndGame();
        }
        initRound();

    }

    function EndGame() {
        $scope.TotalPoints += currRoundPoints;
        $location.path("/GameOver");
    }

    function setCurrAlbums(){
        $http.get("https://itunes.apple.com/lookup?id=909253&entity=album&limit")
        .success(function (data, status, headers, config)
        {
            //allCurrAlbums.push(data);
            //allCurrAlbums.push(data);
            //allCurrAlbums.push(data);
            //allCurrAlbums.push(data);
            extractAllAlbumNames(data.results);

        });
    };
};

function extractAllAlbumNames(datas){
    for(data in datas) {
        extractAlbumName(datas[data]);
    }
}

function extractAlbumName(data){
    allCurrAlbums.push({name: data.collectionName, art: data.artworkUrl60});
    if(data.wrapperType == "collection") {
        alert(data.collectionName + " " + data.artworkUrl60);
    }
}
guessTheArtist.controller('GameController', GameController);



