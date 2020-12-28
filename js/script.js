"use strict";

class Guess {
	// Constructor Main
	constructor() {
		this.input = document.getElementById("game-input");
		this.checkButton = document.getElementById("btn");
		this.chancesRemainingElement = document.getElementById("chances-remaining");
		this.message = document.getElementById("message");

		this.historyContainer = document.querySelector(".history-container");
		this.historyRecord = document.querySelector(".history__record");
		this.statusIcon = document.querySelector(".status-icon");
		this.gameOverlay = document.querySelector(".win-lose__overlay");

		this.history = [];
		this.maxChances = 10;

		this.randomNumber = Math.floor(Math.random() * 100) + 1;

		this.newGame();
		this.checkButton.addEventListener("click", this.checkInput);
	}

	// New Game Function.
	newGame = () => {
		this.input.focus();
		this.randomNumber = Math.floor(Math.random() * 100) + 1;

		this.history = [];
		this.historyRecord.innerHTML = this.history;

		this.maxChances = 10;
		this.chancesRemainingElement.innerHTML = this.maxChances;

		this.historyContainer.classList.remove("not-hidden");
	};

	// Check Input function for Button Click
	checkInput = () => {
		const numberValue = +this.input.value;
		if (this.input.value === "" || numberValue <= 0 || numberValue > 100) {
			this.statusIcon.classList.add("not-hidden");
			setTimeout(() => {
				this.statusIcon.classList.remove("not-hidden");
			}, 1200);
		} else {
			if (numberValue < this.randomNumber) {
				this.message.innerHTML = "Too Low!";
				this.message.style.transform = "translateX(-50%) translateY(0)";

				this.maxChances--;
				this.chancesRemainingElement.innerHTML = this.addAZeroFunction(
					this.maxChances,
				);

				this.checkForGameOver(this.maxChances);

				this.updateHistory(numberValue);
			} else if (numberValue > this.randomNumber) {
				this.message.innerHTML = "Too High!";
				this.message.style.transform = "translateX(-50%) translateY(0)";

				this.maxChances--;
				this.chancesRemainingElement.innerHTML = this.addAZeroFunction(
					this.maxChances,
				);

				this.checkForGameOver(this.maxChances);
				this.updateHistory(numberValue);
			} else if (numberValue === this.randomNumber) {
				this.winningNumber();
			}
			setTimeout(() => {
				this.message.style.transform = "translateX(-50%) translateY(-100%)";
			}, 900);
		}

		this.input.value = "";
	};

	// Adds a zero preceding a single digit number, better UI/UX.
	addAZeroFunction = (num) => {
		if (num < 10) {
			return `0${num}`;
		} else return num;
	};

	// Check for a Win!
	winningNumber = () => {
		this.gameOverlay.classList.add("not-hidden");
		this.gameOverlay.innerHTML = `
      <h1>You guessed the right number!</h1>
      <button class="new-game">Play Again</button>
    `;
		let self = this;
		document.querySelector(".new-game").addEventListener("click", function () {
			self.newGame();
			self.gameOverlay.classList.remove("not-hidden");
			self.gameOverlay.innerHTML = "";
		});
	};

	// Check for 0 chances remaining:
	checkForGameOver = (point) => {
		if (point === 0) {
			this.gameOverlay.classList.add("not-hidden");
			this.gameOverlay.innerHTML = `
        <h1>Game Over!</h1>
        <button class="new-game">Play Again</button>
      `;
			let self = this;
			document
				.querySelector(".new-game")
				.addEventListener("click", function () {
					self.newGame();
					self.gameOverlay.classList.remove("not-hidden");
					self.gameOverlay.innerHTML = "";
				});
		}
	};

	updateHistory = (number) => {
		this.historyContainer.classList.add("not-hidden");
		this.history.push(number);
		this.historyRecord.innerHTML = this.history;
	};
}

const guess = new Guess();

const gameBeginContainer = document.querySelector(".game-beginner");

function beginnerLoader() {
	setTimeout(function () {
		gameBeginContainer.style.opacity = "0";
		gameBeginContainer.style.visibility = "hidden";
		sessionStorage.setItem("introDisplayed", JSON.stringify(true));
	}, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
	const isLoaded = sessionStorage.getItem("introDisplayed");
	if (JSON.parse(isLoaded)) {
		gameBeginContainer.remove();
	} else {
		beginnerLoader();
	}
});
