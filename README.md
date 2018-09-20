# Hurdle Game

<p>Infinite side scroller game with obstacles to jump over</p>
<p>Made with HTML, CSS, and Javascript</p>

## How to play

1. To start the game press the Spacebar
2. Spacebar allows the character to jump in the air
3. Jump over objects as they come towards the character
4. Every object jumped over gives 1 point
2. Don't hit the objects or the game is over!

### Features

- Random spaced obstacles
- Random height and width obstacles
- Multiple playable characters
- Highscore tracking
- Day/night cycle every 10 points
- Speed of obstacles increases

## How to run the game on your local machine
To download the game go to the top of this page and click on download button. Then click on Download ZIP and save the zip file to your local machine. After unzipping the file go to hurdle_game folder and open the index.html file in you browser.

Usually double-clicking the file name opens the file in your default web browser. If that doesn't work, copy the location of the index.html file and paste it into your browser's address bar and press enter. You should be good to go! ENJOY!


## Development Problems
1. Moving mulitple of the same objects at once
 - I initially used classes to move the objects but when mulitple objects were on the page at the same time they would all appear in the same position
2. Removing objects
 - Initially used .hide() to make objects disappear but when a lot of time had passed there were lots of divs in the html which slowed down the page. Ended up using .remove() and .splice() to completely remove the div from the page
 


## Autors
<p>Tom Beckett</p>

## Acknowledgements
Inspired by Google Chrome Dinosaur Game

