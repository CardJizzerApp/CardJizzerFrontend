<div align="center">
    <img src="./resources/logo.svg">
    <h1>CardJizzers' Frontend</h1>
    <h3>The frontend of CardJizzer.</h3>
</div>

<div align="center">
    
[![Build Status](https://travis-ci.com/CardJizzerApp/CardJizzerFrontend.svg?branch=master)](https://travis-ci.com/CardJizzerApp/CardJizzerFrontend)

</div>

<div align="center">

[What is this](#what-is-this?) | 
[Motivation](#motivation) | 
[Running locally](#running-locally) | 
[Contributing](#contributing)

</div>
<hr/>

## What is this? :question:
### What Is Cards Against Humanity?
The [game][cards-against-humanity], with its [game rules][game-rules] was invented by a Kickstarter campaign in the year 2011.
It is a turn based card game for the most parts played in real life.

Every player receives a specific amount of white cards that are used to fill placeholders provided in the black card.

At the end of the round, when all players played a card, the card czar (in our case the `CardJizzer`) picks the most hilarious card.

On the start of a new round every player gets the amount of whitecards he laid in the last round.

Although there are already clones out there we want to build a open source forgery for the App- and PlayStore. 

We decided to bring fresh air in this game and created this hybrid app which allows anybody to play
this beautiful game anywhere and anytime.

### What is this repo about?
This repository is the frontend part of the app. It will be deployed to our servers after your push.

Please follow [this][backend] link for the backend part of this project.

## Motivation :100:
Why are we doing this? We want the future of games to be more transparent and modifiable for any developer.

## Running locally
You need ionic-cli installed and all other packages.
```
$ npm i -g ionic
$ npm i
$ ionic serve
```
## Contributing
Please refer to each project's style and [contribution guidelines](CONTRIBUTING.md) for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.
 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!


[cards-against-humanity]: https://cardsagainsthumanity.com/
[game-rules]: http://s3.amazonaws.com/cah/CAH_Rules.pdf
[backend]: https://github.com/CardJizzerApp/CardJizzerBackend