const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition || window.SpeechRecognitionAlternative;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
	const msg = e.results[0][0].transcript;

	writeMessage(msg);
	checkNumber(msg);
}

function writeMessage(message) {
	msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${message}</span>

  `;
}

function checkNumber() {
	const num = +msg;

	if (Number.isNaN(num)) {
		msgEl.innerHTML = `<div>That is not valid number</div>`;
		return;
	}

	if (num > 100 || num < 1) {
		msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
		return;
	}

	if (num === randomNum) {
		document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br /> <br />
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
      `;
	} else if (num > randomNum) {
		msgEl.innerHTML += '<div>GO LOWER</div>';
	} else {
		msgEl.innerHTML += '<div>GO HIGHER</div>';
	}
}

function getRandomNumber() {
	return Math.floor(Math.random() * 100);
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
	if (e.target.id === 'play-again') {
		window.location.reload();
	}
});
