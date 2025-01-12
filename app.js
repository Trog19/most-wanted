/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            displayPerson(person[0])
            break;
            
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            findPersonFamily(person[0], people)
            break;

        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            findPersonDescendants(people);
            break;

        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;

        case "quit":
            // Stop application execution
            return;

        case "test":
            console.log(searchByTraits(person[0], people))
            break;

        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    let personInfo ="";
    for(let property in person) { person = id 
    if (property ==="parents" || property === "currentSpouse"){
        contine 
    }
    personInfo += person[property] + "\n";

}
    alert(people.map(function (person) {
            return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(foundPerson) {
    let personInfo = `First Name: ${foundPerson.firstName}\n`;
    personInfo += `Last Name: ${foundPerson.lastName}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    
    personInfo += `Gender: ${foundPerson.gender}\n`;
    personInfo += `Date of Birth: ${foundPerson.dob}\n`;
    personInfo += `Height: ${foundPerson.height}\n`;
    personInfo += `Weight: ${foundPerson.weight}\n`;
    personInfo += `Eye Color: ${foundPerson.eyeColor}\n`;
    personInfo += `Occupation: ${foundPerson.occupation}\n`;
    personInfo += `Parents: ${foundPerson.parents}\n`;
    personInfo += `Current Spouse: ${foundPerson.currentSpouse}\n`;
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// @param {string}
// @returns {string}
// function traits(input){
//     return input.toLowerCase() === "gender" || input.toLowerCase() === "dob" || input.toLowerCase() === "height" || input.toLowerCase === "weight" || input.toLowerCase === "eyecolor" || input,toLowerCase === "occupation";
// }

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

// @params {Array} people
// @return Array


//This works for sorting people based on multiple traits but I am not sure if it meets the userStory criteria of "at once"
function searchByTraits(people){
    let userInput = promptFor("Please enter what specific traits you would like to search by:\ngender\ndob\nheight\nweight\neyecolor\noccupation", chars);
    let userInput2 = promptFor(`Please input relevant data to ${userInput}`, chars)
    let newArray = people.filter(
        function(person){
            if(person[userInput] === userInput2)
                return person
                
            }
        );
        let userInput3 = promptFor("Please enter another trait you wna to search for:\ngender\ndob\nheight\nweight\neyecolor\noccupation", chars)
        let userInput4 = promptFor(`Please input relevant data to ${userInput3}`, chars)
        let subArray= people.filter(  
            function(person){
            if(person[userInput3] === userInput4)
                return person

            }

        );
    let userInput5 = promptFor("Please enter another trait you wna to search for:\ngender\ndob\nheight\nweight\neyecolor\noccupation", chars)
    let userInput6 = promptFor(`Please input relevant data to ${userInput5}`, chars)
        let subArray1= people.filter(  
            function(person){
            if(person[userInput3] === userInput6)
                return person

            }

        );
    let userInput7 = promptFor("Please enter another trait you wna to search for:\ngender\ndob\nheight\nweight\neyecolor\noccupation", chars)
    let userInput8 = promptFor(`Please input relevant data to ${userInput7}`, chars)
        let subArray2= people.filter(  
            function(person){
            if(person[userInput8] === userInput4)
                return person

            }

        );
    let userInput9 = promptFor("Please enter another trait you wna to search for:\ngender\ndob\nheight\nweight\neyecolor\noccupation", chars)
    let userInput10 = promptFor(`Please input relevant data to ${userInput9}`, chars)
        let subArray3= people.filter(  
            function(person){
            if(person[userInput3] === userInput10)
                return person

            }

        );
    alert (JSON.stringify([subArray3]))
    }
    



function findPersonFamily(foundPerson, people){
    let newArray; //newArrayBucket
    let spouseArray = findSpouse(foundPerson, people)
    let parentArray = findParents(foundPerson, people)
    let siblingArray = findSib(foundPerson, people)
    
        return newArray
}
alert(JSON.stringify([results]))

function findSpouse(foundPerson, people){
    let results = people.filter(
        function(el){
            if(foundPerson.currentSpouse===el.id) return true
        }
    );



    return results

}
alert(JSON.stringify([results]))

function findParents(foundPerson, people){
    let results = people.filter(
        function(el){
            if(foundPerson.parents[0] === el.id || foundPerson.parents[1] === el.id) return true
        }
    );

    
    return results


}
alert (JSON.stringify([results]))

function findSib(foundPerson, people){
    let results = people.filter(
        function(el){
            if(foundPerson !== el.id)
                if(foundPerson.parents[0] === el.parents[0] || foundPerson.parents[1] === el.parents[1]) return true
        }
    );

    
    return results


}
alert (JSON.stringify([results]))

function findDescendants(foundPerson, people){
    let childrenFound = []
    let results = people.filter(
        function(el){
            if(foundPerson.id === el.parents[0] || foundPerson.id === el.parents[1])return true
        }
    );
        childrenFound = results
        for (let i=0; results, i < childrenFound.length; i++) {
            childrenFound = childrenFound.concat(findDescendants(childrenFound[i], people))
    
        }
    return childrenFound
    }
alert (JSON.stringify([childrenFound]))
//single trait search 
function searchBYTrait(people){
    let userInput = promptFor("Please enter another trait you wna to search for:\ngender\ndob\nheight\nweight\neyecolor\occupation", chars)
    let userInput1 = promptFor(`Please input relevant data to ${userInput9}`, chars)
    let newArray = people.filter(
        function(person){
            if(person[userInput] === userInput1)
                return person

            }
        
        );
        alert (JSON.stringify([newArray]))
    }



    //This is how i think it should be solved just cant figure out how to compare responseArray to person parameters and get userinput included for both the type of trait and the specific search term.

function MultiSearch(responseArray, people){
    let responseArray = promptFor["gender", "dob", "height", "weight", "eyecolor", "occupation"]
    let newArray = people.filter(
        function(person){
            for(let i=0; results, i < responseArray.length; i++){

            }
        }
    )

}