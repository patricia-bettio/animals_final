"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
//store all animals marked as winners by the user:
let winners = [];
const settings = {
    filter: null,
    sortBy: null,
    sortDir: "asc"
}

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0,
    // TODO: Add winner-info
    winner: false

};

function start( ) {
    console.log("ready");
    
    loadJSON();
    
    // TODO: Add event-listeners to filter and sort buttons
}


async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );

    buildList();
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}

function buildList() {
    const currentList =  allAnimals; // TODO: Add filter and sort on this list, before displaying
    displayList( currentList );
}

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    //console.log(animal.winner)
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=winner").dataset.winner = animal.winner;
    // TODO: Show star ⭐ or ☆
    if (animal.winner === true) {
        clone.querySelector("[data-field=winner]").textContent = "⭐";
    } else {
        clone.querySelector("[data-field=winner]").textContent = "☆";
    }

    // TODO: Add event listener to click on star
    clone.querySelector("[data-field=winner]").addEventListener("click", function(){
        maxTwo(animal);
        differentType(animal);
    })

    // TODO: Display winner

    // TODO: Display star

    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // TODO: Add event listeners for star and winner
    

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}

function maxTwo(animal){
      
    //WINNER LENTGH SELECTION
    console.log(winners.length)
    if (winners.length>1){
        console.log("more than 2 selected")
        document.querySelector("#onlytwowinners").classList.add("show");
        console.log(winners)
        document.querySelector("#onlytwowinners .animal1").textContent = `${winners[0].name}, the ${winners[0].type}`;
        document.querySelector("#onlytwowinners .animal2").textContent = `${winners[1].name}, the ${winners[1].type}`;
        document.querySelector("#onlytwowinners [data-action=remove1]").addEventListener("click", function() {
            console.log(winners[0])
            //sets to false the animal to be removed:
            winners[0].winner = false;
            //selects the animal user is clicking now:
            animal.winner= true;
            displayList(allAnimals)
            document.querySelector("#onlytwowinners").classList.remove("show")
        }) 
        document.querySelector("#onlytwowinners [data-action=remove2]").addEventListener("click", function() {
            console.log(winners[1])
            //sets to false the animal to be removed:
            winners[1].winner = false;
            //selects the animal user is clicking now:
            animal.winner= true;
            displayList(allAnimals)
            document.querySelector("#onlytwowinners").classList.remove("show")
        }) 
    }

}

function differentType(animal){
    //WINNER TYPE SELECTION
    if (animal.winner){
    //console.log("this animal is NOT A WINNER")
    animal.winner = false;
    //console.log(animal)
    } else {
    //console.log("this animal is a WINNER")
        function checkType(x){
            return x.type === animal.type;
        }
    //
    if (winners.some(checkType) == false) {
    //console.log("animal type not there");
    animal.winner = true;
    } else {
    console.log("animal type IS there");
    document.querySelector("#onlyonekind").classList.add("show")
    //find the one that has the same type
    //console.log(winners[0].winner)
    document.querySelector("#onlyonekind .animal1").textContent = `${winners[0].name}, the ${winners[0].type}`;
    
    document.querySelector("#onlyonekind [data-action=remove1]").addEventListener("click", function() {
    console.log(winners[0])
    //give the value False to the duplicate that has to be removed:
    winners[0].winner = false
    animal.winner = true;
    //exclude the repeated animal:
    //console.log(winners.splice(winners[0].winner))
    displayList(allAnimals);
    document.querySelector("#onlyonekind").classList.remove("show")  
    })

    document.querySelector("#onlyonekind .closebutton").addEventListener("click", function () {
    console.log("closing test")
    document.querySelector("#onlyonekind").classList.remove("show")
    })            
    
    displayList(allAnimals);
    }
             
    winners = allAnimals.filter(animals=> animals.winner == true);
       
    }
  
    buildList()
}

