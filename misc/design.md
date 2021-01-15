# Design

1. LoadScene: load all assets

   1. LoadingBar

1. StartScene: first interaction, starts the music

   1. PlayButton: HomeScene

1. HomeScene: offers not ingame-related options

   1. PlayButton: SelectScene

   1. ScoreButton: ScoreScene

   1. TrophyButton: TrophyScene

   1. InfoButton: InfoScene

   1. SettingsButton: SettingScene

1. SelectScene: starts the selected level, shows progress

   1. LevelButton: LevelScene, 15 levels, 3 stars each

   1. HomeButton: HomeScene

   1. UpgradeButton: UpgradeScene

1. ScoreScene: shows total calories of all players

   1. HomeButton: HomeScene

1. TrophyScene: shows countable achievements, 4 levels each

   1. 

Foods:

1. **donut**: single meal reward calories

   1. **burger**: main, straight flight

      **cheeseburger**: protection, sticky lips, protects from one pickle

   1. **cola**: drink, diagonally upward flight due to the bubbles

      **energy drink**: speed, caffeine time, bullet time effect on foods but not on the lips

   1. **salad**: side, bunny hop flight like the lips

      **carrot bag**: calories, clones the next food

1. **ice cream cone**: double meal reward calories

   1. **hot dog**: main, straight flight, but shoots the sausage ahead

      **corn dog**: calories, adds a deep fried cornmeal coating to the next two main for increased calories

   1. **lemonade**: drink, straight flight but shoots a slower lemon to the upper lane

      **strawberry lemonade**: protection, every piece shoots down a pickle with a juice beam

   1. **fries**: side, straight flight, but randomly changes lanes halfway by separating then reuniting with the box

      **curly fries**: speed, confuses and turns back the next food if missed to give a second chance

1. **ice cream bar**: quadruple meal reward calories

   1. **pizza**: main, straight flight, but splits into four pieces

      **quattro formaggi**: calories, every slice pulls in the next food with a cheese lasso

   1. **hot chocolate**: drink, diagonally downward flight due to the steam, leaving three drops of cream in the original lane

      **milkshake**: speed, freezes the next food to make it easier to catch

   1. **chicken nuggets**: side, wavy flight of a line of four nuggets between two lanes

      **chicken selects**: protection, every piece gives a second of bouncy ground due to feather falling



Levels:

On every level the lips has to eat the specified amount from the one or more foods. Each target amount is a product of four. Eating each of the specified amounts rewards one star and unlocks the next level. Eating half of the specified amount more rewards two, and another quarter of the amount rewards three stars.

These foods can be a la carte, reward, or special.

A la carte foods are generated by default.

Rewards are generated after completing meals.

Specials are generated after eating 4-6-7 from the same food without eating anything else, or as the first food if used as a level bonus.

Every level has maximum 5 foods and only matching bonuses can be used.

To unlock the next set of five levels ten stars need to be collected on the previous five levels.

Upgrades: bought from stars, 3 levels (2-3-4 stars, 45 total)

* protection: each level protects from one pickle
* speed: each level decreases the speed of the foods
* bacon: extra calories for mains
* candied cherry: extra calories for drinks
* gravy: extra calories for sides