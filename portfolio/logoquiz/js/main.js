// ARRAY OF OBJECTS, STORING LOGOS AND ANSWERS
var logos = [
{
	image : 'img/sharks.png',
	name  : 'SAN JOSE SHARKS'
},
{
	image : 'img/raptors.png',
	name  : 'TORONTO RAPTORS'
},
{
	image : 'img/grizzlies.png',
	name  : 'MEMPHIS GRIZZLIES'
},
{
	image : 'img/bruins.png',
	name  : 'BOSTON BRUINS'
},
{
	image : 'img/white-caps.png',
	name  : 'VANCOUVER WHITE CAPS'
},
{
	image : 'img/falcons.png',
	name  : 'ATLANTA FALCONS'
},
{
	image : 'img/timbers.png',
	name  : 'PORTLAND TIMBERS'
},
{
	image : 'img/marlins.png',
	name  : 'MIAMI MARLINS'
},
{
	image : 'img/saints.png',
	name  : 'NEW ORLEANS SAINTS'
},
{
	image : 'img/orioles.png',
	name  : 'BALTIMORE ORIOLES'
}];

//LOOP THROUGH ARRAY AND DISPLAY LOGOS
for(var i = 0; i < logos.length; i++){
	var question = logos[i].image;
	var el = document.getElementById('question' + [i]);

	console.log(question,el);

	var badge = document.createElement('img');
	badge.src = question;
	el.appendChild(badge);

	badge.className = 'logos';
}

// FUNCTION TO GET TEST RESULTS
function testResults(){

	var correct = 0;
	var incorrect = 0;

	for (var i = 0; i < logos.length; i++){
		var answer = logos[i].name;

		// STORE USER ENTRY
		var guess = document.getElementById('answer' + [i]).value.toUpperCase();
		// ELEMENT TO ADD CLASS TO WHEN CORRECT OR INCORRECT
		var guessStatus = document.getElementById('bucket' + [i]);

		// IF CORRECT, ADD CORRECT CLASS AND ONE TO CORRECT VARIABLE
		if(guess == answer){
			guessStatus.className = 'correct';
			correct++;
		} else {
			// OTHERWISE, ADD INCORRECT CLASS AND ONE TO INCORRECT VARIABLE
			guessStatus.className = 'incorrect';
			incorrect++;
		};
	};

	//RESULTS
	console.log('You missed :' + incorrect);
	console.log('You got :' + correct);


	if(correct >= 7){
		var winner = document.getElementById('resultContainer');
		var congrats = document.createElement('h1');
		var gameTime = document.createElement('h4');
		var wScore = document.createElement('h2');

		congrats.textContent = 'Nice job! You won!';
		gameTime.textContent = 'Since you know your sports so well, take these tickets to the game!';
		wScore.textContent = correct + ' ' + '/' + ' ' +' 10';
		wScore.className = 'wScore';
		winner.className = 'winner text-center';
		winner.appendChild(wScore);
		winner.appendChild(congrats);
		winner.appendChild(gameTime);
	} else {
		var loser = document.getElementById('resultContainer');
		var yikes = document.createElement('h1');
		var couch = document.createElement('h4');
		var lScore = document.createElement('h2');

		yikes.textContent = 'Yikes! So you\'re a bandwagoner, huh?';
		couch.textContent = 'Hope you like the view from the couch.';
		lScore.textContent = correct + ' ' + '/' + ' ' +' 10';
		lScore.className = 'lScore';
		loser.className = 'loser text-center';
		loser.appendChild(lScore);
		loser.appendChild(yikes);
		loser.appendChild(couch);
	};
};

