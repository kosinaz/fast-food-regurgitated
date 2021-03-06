var creditsState = {

  create: function () {

    game.add.text(
      512,
      288,
      'Art and code\n' +
      ' Zoltan Kosina\n\n' +
      'Ingame music\n' +
      ' Happy Happy Game Show - Kevin MacLeod (incompetech.com)\n' +
      ' Licensed under Creative Commons: By Attribution 3.0\n' +
      ' http: //creativecommons.org/licenses/by/3.0/\n\n' +
      'Title and menu music\n' +
      ' Strollin Thru The Fifties - Rasputin1963 (www.looperman.com)\n\n' +
      'Sound effects\n' +
      ' Zapsplat (www.zapsplat.com)\n\n' + 
      'Vectors\n' +
      ' Old Newspaper - Vecteezy (www.vecteezy.com)',
      game.textStyle
    ).fontSize = 14;

    /**
     * Set the Start Game button
     */
    var backButton = game.add.text(512, 520, 'Back', game.style);
    backButton.inputEnabled = true;
    backButton.events.onInputUp.add(function () {
      game.state.start('menu');
    }, this);
    backButton.setShadow(2, 2, '#dfa8ba', 0);

  },


  update: function () {

  }

};