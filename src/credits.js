var creditsState = {

  create: function () {

    game.add.text(
      512,
      288,
      'Art and code\n' +
      'Zoltan Kosina\n\n' +
      'Ingame music\n' +
      'Happy Happy Game Show - Kevin MacLeod (incompetech.com)\n' +
      'Licensed under Creative Commons: By Attribution 3.0\n' +
      'http: //creativecommons.org/licenses/by/3.0/\n\n' +
      'Title and menu music\n' +
      'Strollin Thru The Fifties - Rasputin1963 (looperman.com)'
    );

    /**
     * Set the Start Game button
     */
    var backButton = game.add.text(512, 520, 'Back', game.style);
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function () {
      game.state.start('menu');
    }, this);

  },


  update: function () {

  }

};