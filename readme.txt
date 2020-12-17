--Readme document for *Carlos Arteaga*, *ciarteag@uci.edu*, *88339224*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

Total
30/30
- 20/20 Added requirements
- 5/5 Validity and Responsive Design
- 5/5 Documentation

Requirements
20/20
- 3/3 Formatting the Layout
- 4/4 Fetching Pokemon Data including moves and Pokémon
- 3/3 Pokemon Images
- 3/3 Randomization of Pokemon
- 2/2 Pokemon Type Images
- 4/4 Battle Mechanic

2. How long, in hours, did it take you to complete this assignment?

This project took me roughly around 30 hours, I ran into some issues with fetching promises and scoping which slowed me down. 

3. What online resources did you consult when completing this assignment? (list specific URLs)

https://pokeapi.co/
https://bulbapedia.bulbagarden.net/wiki/Damage
https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a
https://www.w3schools.com/jsref/prop_style_color.asp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
https://stackoverflow.com/questions/5969114/how-do-i-make-an-image-smaller-with-css
https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files
https://stackoverflow.com/questions/10003683/extract-a-number-from-a-string-javascript


Many of the online resources where reading up on promises, async functions, HTML/CSS/JS syntax that refreshed my memory. I had to do a good amount of research on Pokemons and I used way too many sites for that. 


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

I consulted the professor, TA Cass, and an anonymous student from Discord who helped me discover that async functions might be helpful since I was stuck and waiting for professor/TA help. 


5. Is there anything special we need to know in order to run your code?

There is currently a 1 in 30 chance that a Pokemon may not have moves, if this is this case, simply refresh and have different Pokemon battle. I do not know why certain Pokemons do not have move sets. 

The Pokemons from the newest game, Sword and Shield, lack or have inaccurate data. I have omitted them from this to encounter less Pokemons with no moves that can be learned.
Some Pokemons cannot learn moves at all, why it states no moves found.

6. How to run the project?
Simple, load the page and there should be 2 Pokemon loaded up, hit the battle button until a Pokemon faints (loses all its HP). After a battle, load a new set of Pokemons. 

7. Any additional features added?
I added the Pokemon level which is a random number from 50 to 60 to level the playing field of some Pokemons and to provide more context on the battle. 
I ensure that two of the same moves cannot be learned to match the Pokemon game more realistically.
I added a message for each move to give the users more context on what is occurring.
I also added a constraint where moves cannot keep occurring if a Pokemon has zero HP.
I added the randomness of either Pokemon 1 or 2 going first instead of it always being player1 since that would be advantageous. 