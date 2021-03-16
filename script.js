var countList = 0;
var countCard = 0;
var listInput;
var cardInput;

/****************** Part 1 : Modify the board title *****************/

var boardTitle = "New table";

// On click on the board title, you can change it
function changeBoardTitle(){
    document.getElementById("board-title").style.display = "none"; 
    document.getElementById("board-title-input").style.display = "block";
    document.getElementById("board-title-input").value = boardTitle;
    document.getElementById("board-title-input").select(); 
}

function addInputBoardTitle(){
    // Store the value of the input
    boardTitle = document.getElementById("board-title-input").value;
}

// When clicking on Enter, the title is changed
var boardTitleInput = document.getElementById("board-title-input");
boardTitleInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter" && boardTitleInput != "") {
        document.getElementById("board-title").style.display = "block"; 
        document.getElementById("board-title-input").style.display = "none";
        document.getElementById("board-title").innerHTML = boardTitle;
    }
});


// If I leave the board title, the changes are saved
var clickOutBoardTitle = document.getElementById("div-board-title");
document.addEventListener('click', function(event) {
    var isClickBoard = clickOutBoardTitle.contains(event.target);
    if (!isClickBoard) {
        document.getElementById("board-title").style.display = "block"; 
        document.getElementById("board-title-input").style.display = "none";
        document.getElementById("board-title").innerHTML = boardTitle;
    }
});

/************ Part 2 : Creating a new list ***************/

var inputTitle = "";

function openList(){
    // Reinitialize input
    listInput = "";

    // Existing text is hidden
    document.getElementById("button-add-list").style.display = "none"; 

    // Input and button are shown
    document.getElementById("add-list-input").style.display = "block";
    document.getElementById("add-list-input").focus();
    document.getElementById("add-list-button").style.display = "block";

    document.getElementById("add-list").style.backgroundColor = "#ebecf0";
    document.getElementById("add-list").style.color = "black";
}

function addInputList(){
    // Store the value of the input
    listInput = document.getElementById("add-list-input").value;
}

// When clicking on Enter, the list is created
var addListInput = document.getElementById("add-list-input");
addListInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addList(countList, listInput);
    }
});

// If I leave the div, it takes back its original appearance
var clickOut = document.getElementById('add-list');
document.addEventListener('click', function(event) {
    var isClickInsideElement = clickOut.contains(event.target);
    if (!isClickInsideElement) {
        document.getElementById("button-add-list").style.display = "block"; 
        document.getElementById("add-list-input").style.display = "none"; 
        document.getElementById("add-list-button").style.display = "none";
        document.getElementById("add-list-input").value = "";
        document.getElementById("add-list").style.backgroundColor = "rgba(100,100,100,0.80)";
        document.getElementById("add-list").style.color = "white";
    }
});

// When clicking on the button, the list is created
function addList(number, input){

    if (listInput != ""){
        // Create the list ids
        countList += 1;
        var listId = "list" + countList;
        var divTitleId = "div-list-title" + countList;
        var listTitleId = "list-title" + countList;
        var listTitleInputId = "list-title-input" + countList;
        var createId = "create" + countList;
        var newCardId = "cardlink" + countList;
        var cardHolderId = "list-card-holder" + countList;

        var listInputValue = "";

        // Create a new list
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", listId);
        newDiv.setAttribute("class", "list");

        // Create the box containing the title and the title input
        var newDivTitle = document.createElement("div")
        newDivTitle.setAttribute("id", divTitleId);
        newDiv.appendChild(newDivTitle);

        // Create a title based on the content of the input
        var newTitle = document.createElement("h3");
        newTitle.setAttribute("class", "list-title");
        newTitle.setAttribute("id", listTitleId);
        var textTitle = document.createTextNode(listInput);
        newTitle.appendChild(textTitle);
        newDivTitle.appendChild(newTitle);

        var functionTitle = "openListTitle(" + countList + ")";
        newTitle.setAttribute("onclick", functionTitle);

        // Create the input to change the title
        var newTitleInput = document.createElement("input");
        newTitleInput.setAttribute("id", listTitleInputId);
        newTitleInput.style.display = "none";
        newTitleInput.setAttribute("onkeyup", "addInputListTitle(" + countList + ")");
        newDivTitle.appendChild(newTitleInput);

        // When clicking on Enter, the title is changed                    
        document.addEventListener("keyup", function(event) {
            if (event.key === "Enter" && newTitleInput.value != "" && newTitleInput.value != null) {
                document.getElementById(listTitleId).style.display = "block"; 
                document.getElementById(listTitleInputId).style.display = "none";
                document.getElementById(listTitleId).innerHTML = newTitleInput.value;
            }
        });


        // If I leave the list title, the changes are saved
        var clickOutListTitle = newTitle;
        document.addEventListener('click', function(event) {
            var isClickListInput = clickOutListTitle.contains(event.target);
            if (!isClickListInput && document.getElementById(listTitleInputId).value != "") {
                document.getElementById(listTitleId).style.display = "block"; 
                document.getElementById(listTitleInputId).style.display = "none";
                document.getElementById(listTitleId).innerHTML = document.getElementById(listTitleInputId).value;
            }
        });


        // Create the div where the new card will be created (between title and create div)
        var newCardHolder = document.createElement("div");
        newCardHolder.setAttribute("id", cardHolderId);
        newCardHolder.setAttribute("class", "card-holder");
        newCardHolder.setAttribute("ondragover","onDragOver(event)");
        newCardHolder.setAttribute("ondrop","onDrop(event)");
        newDiv.appendChild(newCardHolder);



        // Create a div for creating new card for that list
        var newCreate = document.createElement("div");
        newCreate.setAttribute("id", createId);
        newDiv.appendChild(newCreate);


        // Create a link to add a card in the new list
        var newContent = document.createElement("a");
        newContent.setAttribute("id", newCardId);
        var functionName = "openCard(" + countList + ")";
        newContent.setAttribute("onclick", functionName);
        var text = document.createTextNode("+ Add a card");
        newContent.appendChild(text);
        newContent.style.color = "#5e6c84";
        newCreate.appendChild(newContent);

        // Create hidden div to add a new card
        var newCardInput = document.createElement("input");
        var newCardIdInput = newCardId + "input";
        newCardInput.setAttribute("id", newCardIdInput);
        newCardInput.setAttribute("name", newCardIdInput);
        newCardInput.setAttribute("onkeyup", "addInputCard(" + countList + ")");
        newCardInput.style.display = "none";
        newCreate.appendChild(newCardInput);

        var newCardButton = document.createElement("button");
        var newCardIdButton = newCardId + "button";
        newCardButton.setAttribute("id", newCardIdButton);
        newCardButton.setAttribute("class", "add-button");
        newCardButton.style.display = "none";
        var onclickAddCard = "addCard(" + countList + ", cardInput)";
        newCardButton.setAttribute("onclick", onclickAddCard);

        var textButton = document.createTextNode("Add Card");
        newCardButton.appendChild(textButton);

        newCreate.appendChild(newCardButton);

         // Push the new list on the page
        var currentDiv = document.getElementById('add-list');
        document.getElementById("all-the-lists").insertBefore(newDiv, currentDiv);

        // If click on Enter, create the card
        var intermediateCountlist = countList;
        var addCardInput = document.getElementById(createId);
        addCardInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter" && cardInput != "") {
                addCard(intermediateCountlist, cardInput);
            }
        });

        document.getElementById("add-list-input").value = "";
        document.getElementById("add-list-input").focus();
        document.getElementById("add-list-input").scrollIntoView(true);

        document.getElementById("button-add-list").innerHTML = "+ Add another list";
    }



}

// Change the title of a list on click
function openListTitle(number){
    var titleName = "list-title" + number;
    var titleNameInput = "list-title-input" + number;
    document.getElementById(titleName).style.display = "none"; 
    document.getElementById(titleNameInput).style.display = "block";
    document.getElementById(titleNameInput).value = document.getElementById(titleName).textContent;
    document.getElementById(titleNameInput).select(); 
}

function addInputListTitle(number){
    // Store the value of the input
    var titleName = "list-title-input" + number;
    inputTitle = document.getElementById(titleName).value;
}

/****************** Part 3 : Create a new card ******************/

function openCard(number){
    // Reinitialize input
    cardInput = "";

    // Existing text is hidden
    var newCardId = "cardlink" + number;
    document.getElementById(newCardId).style.display = "none"; 

    // Input and button are shown
    var newCardIdInput = newCardId + "input";
    var newCardIdButton = newCardId + "button";
    document.getElementById(newCardIdInput).style.display = "block"; 
    document.getElementById(newCardIdButton).style.display = "block";
    document.getElementById(newCardIdInput).focus();

    // Reinitialize input and put focus on it
    document.getElementById(newCardId).focus(); 

    // If I leave the div, it takes back its original appearance
    var cardCreateNumber = "create" + number;
    var clickOutCard = document.getElementById(cardCreateNumber);
    document.addEventListener('click', function(event) {
        var isClickInsideElement = clickOutCard.contains(event.target);
        if (!isClickInsideElement) {
            var addCardLinkNumber = "cardlink" + number;
            document.getElementById(addCardLinkNumber).style.display = "block";

            var addCardInputNumber = "cardlink" + number + "input";
            document.getElementById(addCardInputNumber).style.display = "none"; 
            document.getElementById(addCardInputNumber).value = "";

            var addCardButtonNumber = "cardlink" + number + "button";
            document.getElementById(addCardButtonNumber).style.display = "none";
        }
    });


}

function addInputCard(number){
    var cardInputId = "cardlink" + number + "input";
    // Store the value of the input
    cardInput = document.getElementById(cardInputId).value;
}


function addCard(number, input){
    if (cardInput != ""){
        // Create id for div
        countCard += 1;
        var cardId = "card" + countCard;

        // Create div for the card
        var newCard = document.createElement("div");
        newCard.setAttribute("id", cardId);
        newCard.setAttribute("class", "card");
        newCard.setAttribute("onmouseover", "appearPen(" + countCard +")");
        newCard.setAttribute("onmouseout", "disappearPen(" + countCard +")");
        newCard.setAttribute("draggable","true");
        newCard.setAttribute("ondragstart","onDragStart(event)");


        // Add a title to the div
        var newTitle = document.createElement("p");

        var newCardTitle = "card-title" + countCard;
        newTitle.setAttribute("id", newCardTitle);
        newTitle.setAttribute("class", "card-title");
        var text = document.createTextNode(cardInput);
        newTitle.appendChild(text);
        newCard.appendChild(newTitle);


        // Add the little pen
        var newPen = document.createElement("img");
        var newPenId = "pen" + countCard;
        newPen.setAttribute("src", "pen-icon.png");
        newPen.setAttribute("onclick", "openCardTitle(" + countCard +")");
        newPen.setAttribute("id", newPenId);
        newPen.setAttribute("class", "pen");
       newCard.appendChild(newPen);

        // Create the input to change the title
        var newCardInputId = "card-title-input" + countCard;
        var newCardInput = document.createElement("input");
        newCardInput.setAttribute("class", "card-title-input");
        newCardInput.setAttribute("id", newCardInputId);
        newCardInput.style.display = "none";
        newCard.appendChild(newCardInput);


        // Add the new card in the list
        var listCardHolderId = "list-card-holder" + number;
        var listCardHolder = document.getElementById(listCardHolderId);
        listCardHolder.appendChild(newCard);

        // Reinitialize input and put focus on it
        var cardInputId = "cardlink" + number + "input";
        document.getElementById(cardInputId).value = "";
        document.getElementById(cardInputId).focus();

        var createSpec = "cardlink" + number;
        document.getElementById(createSpec).innerHTML = "+ Add another card";


        // When clicking on Enter, the title of the card is changed                    
        document.addEventListener("keyup", function(event) {
            if (event.key === "Enter" && newCardInput.value != "" && newCardInput.value != null) {
                document.getElementById(newCardTitle).style.display = "inline-block"; 
                document.getElementById(newCardInputId).style.display = "none";
                document.getElementById(newCardTitle).innerHTML = newCardInput.value;
            }
        });


        // If I leave the list title, the changes are saved
        var clickOutCardTitle = newCard;
        document.addEventListener('click', function(event) {
            var isClickListInput = clickOutCardTitle.contains(event.target);
            if (!isClickListInput && newCardInput.value != "") {
                document.getElementById(newCardTitle).style.display = "inline-block"; 
                document.getElementById(newCardInputId).style.display = "none";
                document.getElementById(newCardTitle).innerHTML = newCardInput.value;
            }
        });

    }
}

// Mouseover on card show the little pen
function appearPen(number){
    var penId = "pen" + number;
    document.getElementById(penId).style.display = "block";
}

function disappearPen(number){
    var penId = "pen" + number;
    document.getElementById(penId).style.display = "none";
}

// Change the title of a card on click
function openCardTitle(number){
    var titleName = "card-title" + number;
    var titleNameInput = "card-title-input" + number;
    document.getElementById(titleName).style.display = "none"; 
    document.getElementById(titleNameInput).style.display = "block";
    document.getElementById(titleNameInput).value = document.getElementById(titleName).textContent;
    document.getElementById(titleNameInput).select(); 
}


/*********** Part 4 : Drag & Drop **************/

function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);

}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
    const id = event
    .dataTransfer
    .getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    event
        .dataTransfer
        .clearData();
}
            
            