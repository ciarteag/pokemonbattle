//vars that help other functions access data accumulated from fetch promises
var pokemon1Moves = [];
var pokemon2Moves = [];
var pokemon1AttckDefLvlNameHP = [];
var pokemon2AttckDefLvlNameHP = [];
var poke1Turn;
var poke2Turn;

function getPokemons(){
    //randomly get 2 Pokemons
    //the number being multiplied by Math.random is the last pokemon we want, currently excluding Sword and Shield Pokemons
    let firstPokeNum = Math.round(Math.random() * 807)
    let secondPokeNum = Math.round(Math.random() * 807)

    this.poke1Turn = false;
    this.poke2Turn = false;
    this.pokemon1AttckDefLvlNameHP = [];
    this.pokemon2AttckDefLvlNameHP = [];
    getPokemon(firstPokeNum, 1)
    getPokemon(secondPokeNum, 2)

}

function getPokemon(pokedexNum, num) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNum}`)
    .then(function (data) {
        data.json().
        then(function (pokemonData){
            // console.log(pokemonData)
            createPokemon(pokemonData, num)
        })
    })
}

async function createPokemon(pokemon, num){
    //stores the unique moves for each pokemon
    var moveSet = new Set(); 

    //grab the div id's of the HTML Grid blocks
    let item = document.querySelector (`#pokemon-${num}`)
    let stats = document.querySelector(`#pokemonStat-${num}`)
    let battleInfo = document.querySelector(`#pokemonBattleDiv`)

    //update elements in item
    let image = item.getElementsByTagName("img")[0]
    // 1 in 100 chance of being a shiny Pokemon, if so, change to a shiny sprite
    if (!this.shinyProbability())
         image.setAttribute("src", pokemon.sprites.front_default)
    else
        image.setAttribute("src", pokemon.sprites.front_shiny)

    //update elements in stats    
    // grab the item in the HTML for Pokemon Stat rows
    let pNum = stats.getElementsByTagName("p")[0];
    let pName = stats.getElementsByTagName("p")[1];
    let pType1 = stats.getElementsByTagName("p")[2];
    let pType1Image = stats.getElementsByTagName("img")[0];
    let pType2 = stats.getElementsByTagName("p")[3];
    let pType2Image = stats.getElementsByTagName("img")[1];
    let pLevel = stats.getElementsByTagName("p")[4];
    let pHP = stats.getElementsByTagName("p")[5];
    let pMove1 = stats.getElementsByTagName("li")[0];
    let pMove2 = stats.getElementsByTagName("li")[1];
    let pMove3 = stats.getElementsByTagName("li")[2];
    let pMove4 = stats.getElementsByTagName("li")[3];

    //clears the elements in battleInfo
    let attackMessage = battleInfo.getElementsByTagName("p")[0];
    let winnerMessage = battleInfo.getElementsByTagName("p")[1];
    attackMessage.textContent = "";
    winnerMessage.textContent = "";

    //adds the pokemon number, name, type1 image, type1 text
    pNum.textContent = "Pokémon No." + pokemon.id;
    pName.textContent = pokemon.name;
    pType1Image.setAttribute("src", `pokemonTypes/${pokemon.types[0].type.name}.png`);
    pType1.textContent = "Type 1: "+ pokemon.types[0].type.name;

    //checks to see if pokemon has two types, then adds type2 image + type2 text
    if (Object.keys(pokemon.types).length > 1)
    {
        pType2.textContent = "Type 2: "+ pokemon.types[1].type.name;
        pType2Image.setAttribute("src", `pokemonTypes/${pokemon.types[1].type.name}.png`)
    }
    else
    {
        pType2.textContent = "Type 2: n/a";
        pType2Image.setAttribute("src", "pokemonTypes/emptyy.png")
    }

    //adds level and hp to HTML
    let level = this.randomHighLevel();
    pLevel.textContent = "Level: " + level;
    pHP.textContent = "HP: " + pokemon.stats[0].base_stat;
    //resets health color to green if previous was not green
    pHP.style.color = "limegreen";
    
    //populate the moves in the HTML by using an async function that uses a fetch promise for the moves
    let move1Data = await chooseRandomMove(pokemon.moves,moveSet)
    let move2Data =  await chooseRandomMove(pokemon.moves,moveSet)
    let move3Data = await chooseRandomMove(pokemon.moves,moveSet)
    let move4Data = await chooseRandomMove(pokemon.moves,moveSet)
    let allMoves = [move1Data, move2Data, move3Data, move4Data];
    if (num == 1)
        this.pokemon1Moves = allMoves;
    if (num == 2)
        this.pokemon2Moves = allMoves;

    //change the HTML with the new moves
    pMove1.textContent = "Move 1: " + move1Data.name;
    pMove2.textContent = "Move 2: " + move2Data.name; 
    pMove3.textContent = "Move 3: " + move3Data.name; 
    pMove4.textContent = "Move 4: " + move4Data.name; 

    //chooses which array to target based on the number(1 or 2)
    let targetArray = []
    if (num == 1)
        targetArray = pokemon1AttckDefLvlNameHP;
    if (num == 2)
        targetArray = pokemon2AttckDefLvlNameHP;

    //passes data into the proper global array so that battle functions can utilize them
    targetArray.push(pokemon.stats[1].base_stat); //attack is [0]
    targetArray.push(pokemon.stats[2].base_stat); //def is [1]
    targetArray.push(level); //level is [2]
    targetArray.push(pokemon.name); //name is [3]
    targetArray.push(pokemon.stats[0].base_stat); //hp is [4]

}

async function chooseRandomMove(pokemonMoves, moveSet) {
	let totalMoves = Object.keys(pokemonMoves).length;
	let randomMove = Math.round(Math.random() * totalMoves);
	//moveSet will contain the move number that a pokemon has learned
    while (moveSet.has(randomMove))
    {
        randomMove = Math.round(Math.random() * totalMoves);
    }
    //we do not want duplicate moves so add to a set
    moveSet.add(randomMove);

    //get the move number from the URL element of the pokemonMove
    let moveURL = pokemonMoves[randomMove].move.url;
    let URLSplitArray = moveURL.split("/");
    let moveNumber = URLSplitArray[URLSplitArray.length-2];
    //fetch the promise for the move number
    let power = await getMovePromise(moveNumber);

    return power;
}


function getMovePromise(moveNum) {
	return $.getJSON(`https://pokeapi.co/api/v2/move/${moveNum}`, function(
		data
	) {
		// console.log("data from JSON: ", data);
        if (data.power === null) 
            data.power = 0;
		// console.log('power from JSON: ' + data.power);

		return data.power;
	});
}


function shinyProbability(){
    let random = Math.round(Math.random() * 1000)
    // console.log(random)
    if (random <= 10)
        return true;
    return false;
}
function randomHighLevel(){
    let random = Math.round(Math.random() * 10)
    return 50 + random;
}

function battleButton(){
    //grab the div id's of the HTML Grid blocks
    let stats1 = document.querySelector(`#pokemonStat-1`)
    let stats2 = document.querySelector(`#pokemonStat-2`)
    let battleInfo = document.querySelector(`#pokemonBattleDiv`)

    let poke1HP = stats1.getElementsByTagName("p")[5];
    let poke2HP = stats2.getElementsByTagName("p")[5];
    let attackMessage = battleInfo.getElementsByTagName("p")[0];
    let winnerMessage = battleInfo.getElementsByTagName("p")[1];

    //randomly have a pokemon go first
    if (poke1Turn == false && poke2Turn == false)
    {
        let poke1TurnFirst = Math.random();
        if (poke1TurnFirst >= 0.5)
            poke1Turn = true;
        else    
            poke2Turn = true;
    }    
    //decide which random move is chosen
    let randomMove = Math.round(Math.random() * 3)
    //the two strings that will populate the HTML at the end of the function if no pokemon is at zero HP
    let topMessage = "";
    let winner = "";
    //check to see if a pokemon is at zero HP, don't want to allow changes to HTML or allow attack if a pokemon is at zero.
    if (poke2HP.textContent.replace( /^\D+/g, '') != 0 && poke1HP.textContent.replace( /^\D+/g, '')!= 0)
    {
        //decide which random move is chosen
        let randomMove = Math.round(Math.random() * 3)

        if (poke1Turn == true && poke2Turn == false)
        {
            //stats and info on Pokemon1
            let attck = pokemon1AttckDefLvlNameHP[0];
            let def   = pokemon1AttckDefLvlNameHP[1];
            let lvl   = pokemon1AttckDefLvlNameHP[2];
            let name  = pokemon1AttckDefLvlNameHP[3];
            let power = pokemon1Moves[randomMove].power;
            let moveName = pokemon1Moves[randomMove].name;

            //baseHP and currHP of Pokemon2
            let baseHP= pokemon2AttckDefLvlNameHP[4];
            let currentPoke2Hp = poke2HP.textContent.replace( /^\D+/g, '');
    
            let dmg = calculateMoveDamage(attck, def, power, lvl);
            topMessage = name + " used " + moveName + " for " + dmg+ " damage!";
            if (currentPoke2Hp - dmg < 0)
            {
                currentPoke2Hp = 0;
                winner = name + " wins!"
            }
            else
                currentPoke2Hp = currentPoke2Hp - dmg;
    
            poke2HP.textContent = "HP: " + currentPoke2Hp;
            //change health color based on the ratio
            determineHealthColor(currentPoke2Hp, baseHP, poke2HP)
    
            //make it pokemon2's turn
            poke2Turn = true;
            poke1Turn = false;
        }
        else //(poke2Turn == true && poke1Turn == false)
        {
            //stats and info on Pokemon2
            let attck = pokemon2AttckDefLvlNameHP[0];
            let def   = pokemon2AttckDefLvlNameHP[1];
            let lvl   = pokemon2AttckDefLvlNameHP[2];
            let name  = pokemon2AttckDefLvlNameHP[3];
            let power = pokemon2Moves[randomMove].power;
            let moveName = pokemon2Moves[randomMove].name;
    
            //baseHP and currHP of Pokemon1
            let baseHP= pokemon1AttckDefLvlNameHP[4];
            let currentPoke1Hp = poke1HP.textContent.replace( /^\D+/g, '');
        
            let dmg = calculateMoveDamage(attck, def, power, lvl);
            topMessage = name + " used " + moveName + " for " + dmg+ " damage!";    
            if (currentPoke1Hp - dmg < 0)
            {
                currentPoke1Hp = 0;
                winner = name + " wins!"
            }
            else
                currentPoke1Hp = currentPoke1Hp - dmg;
    
            poke1HP.textContent = "HP: " + currentPoke1Hp;
            //change health color based on the ratio
            determineHealthColor(currentPoke1Hp, baseHP, poke1HP)

            poke1Turn = true;
            poke2Turn = false;
        }
        attackMessage.textContent = topMessage;
        winnerMessage.textContent = winner;
    }

}

//damage forumula: https://bulbapedia.bulbagarden.net/wiki/Damage
//no multiplier is used
function calculateMoveDamage(attack, defense, power, level)
{
    if (power == 0)
        return 0
    let levelAdjustments = ((2.0*level)/5) + 2;
    let AdivD = attack/defense;
    let topFraction = levelAdjustments * power * AdivD;
    let totalDmg = Math.round((topFraction/50) + 2);
    return totalDmg;
}

//chnage the health bars base on percentage of current health and base total health before the battle
function determineHealthColor(currentHP, baseHP, elementRef)
{
    let ratio = (currentHP * 1.0) / baseHP;
    if (ratio > 0.5 || (currentHP == baseHP))
        elementRef.style.color = "limegreen";
    else if (ratio > .2 && ratio <= 0.5 )
        elementRef.style.color = "orange";
    else
        elementRef.style.color = "red";
}

//Wait for the DOM to load
$(document).ready(function() {
    // put your page initialization code here
    getPokemons();
});
