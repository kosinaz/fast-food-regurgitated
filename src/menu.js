var menuState = {

    create: function () {

        /**
         * Set the Start New Game button
         */
        this.startNewGameButton = game.add.text(512, 288, 'Start New Game', {
            font: 'bold 30pt Arial',
            fill: '#fff'
        });
        this.startNewGameButton.inputEnabled = true;
        this.startNewGameButton.events.onInputUp.add(this.start, this);
        this.startNewGameButton.anchor.set(0.5, 0.5);
    },
    
    start: function () {

        /**
         * Start the level.
         */
        game.state.start('play');
    },

    update: function () {

    }

};