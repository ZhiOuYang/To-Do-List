//JavaScript
//Define the list item
function ListItem(text, id){
    this.text = text;
    this.isHighlighted = false;
    this.isChecked = false;
    this.uniqueValue = id;
}


//Array for the list items
let itemsArr = [];
let curItemValue = 1;  //incremented after each add and put into the object
const removeSender = "removeSend";

function printListArr(){
    console.log("items arr contents: ");
    itemsArr.forEach(function printStuff(item){
        console.log(item.text);
        console.log("Highlighted Status: " + item.isHighlighted);
    });
}

function checkedToggle(elem){
    //console.log("Entered checked");
    //console.log("Elem: "+elem.value);
    let itemFound;
    let indexOfItem;
    //find the item by the 
    //console.log(itemsArr);
    //console.log(itemsArr.length);
    for (let i = 0; i<itemsArr.length; i++){
        //console.log("Item: " + itemsArr[i] + "(" + i + ")");
        if (itemsArr[i].uniqueValue == elem.value){
            itemFound = itemsArr[i];
            indexOfItem = i;
            //console.log("index: " + i);
            break;
        }
    }

    //Toggle checked
    if (itemFound.isChecked){
        itemFound.isChecked = false;
        console.log("item: " + itemFound + " is not checked");
    }else{
        itemFound.isChecked = true;
        console.log("item: " + itemFound + " is checked");
    }
    //console.log("Item isChecked: " + itemsArr[indexOfItem].isChecked);
    toggleButtonStatus("removeButton");
    toggleButtonStatus("highlightButton");
    toggleButtonStatus("sortButton");

}

function addItem(){
    let text = document.getElementById("inputText").value;
    String(text);
    console.log("Lowered: " + text);
    if (!verifyText(text)) {
        document.getElementById("inputText").value = '';
        return;
    }

    text = uppercaseFirstLetter(text);
    
    
    itemsArr.push(new ListItem(text, curItemValue));
    curItemValue ++;
    document.getElementById("inputText").value = '';
    printListArr();
    renderItems("");
}

function verifyText(text){
    let errorMsg = document.getElementById("errorMessage");

    if (text.length > 0 && text.charAt(0) === ' ' || text.charAt(text.length - 1) === ' '){
        alert("No leading or trailing spaces in text submission please");
        //document.getElementById("inputText").value = '';
        return false;
    }
    
    if (text === ''){
        alert("Cannot enter empty text in form submission");
        return false;
    }

    if (text.includes("<")){
        alert("Cannot contain '<' character");
        return false;
    }

    return true;
}

function uppercaseFirstLetter(text){
    let newStr = '';
    let found = false;
    
   console.log("Ascii: " + text.charCodeAt(0));
    for (let i = 0; i<text.length; i++){
        if (text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90){
            found = true;
        }

        if(found == false && text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122){
            found = true;
            newStr += text.charAt(i).toUpperCase();
        }else{
            newStr += text.charAt(i);
        }
    }
    return newStr;
}

function removeItem(){
    console.log(itemsArr);
    itemsArr = itemsArr.filter(function(item){
        if (item.isChecked == false){
            return item;
        }
    })
    console.log(itemsArr);
    renderItems(removeSender);
    toggleButtonStatus("removeButton");
}

function toggleHighlights(){
    for ( i = 0; i<itemsArr.length; i++){
        if (itemsArr[i].isChecked == true){
            if (itemsArr[i].isHighlighted == true){
                itemsArr[i].isHighlighted = false;
            }else{ 
                itemsArr[i].isHighlighted = true; 
            }
        }  
        //itemsArr[i].isChecked = false;
    }
    
    renderItems("");
    printListArr();
    toggleButtonStatus("highlightButton");
    toggleButtonStatus("removeButton");
}

function sort(){
    itemsArr.sort(function(a,b){
        if (a.text < b.text){
            return -1;
        }
        if (a.text > b.text){
            return 1;
        }
        return 0;
    })
    renderItems();
}

function toggleButtonStatus(buttonStr){
    return;
    let checkedItem = false;
    itemsArr.forEach(function(item){
        if (item.isChecked == true){
            checkedItem = true;
            return;
        }
    });
    if (checkedItem){
        document.getElementById(buttonStr).disabled = false;
    }else{
        document.getElementById(buttonStr).disabled = true;
    }
}

//HTML stuff
function init(){
    document.getElementById("addButton").addEventListener("click", function(event){
        event.preventDefault();
        addItem();
    });
    document.getElementById("removeButton").addEventListener("click", function(event){
        event.preventDefault();
        removeItem();
    });
    //document.getElementById("removeButton").disabled = true;
    
    document.getElementById("highlightButton").addEventListener("click", function(event){
        event.preventDefault();
        toggleHighlights();
    });
    //document.getElementById("highlightButton").disabled = true;
    document.getElementById("sortButton").addEventListener("click", function(event){
        event.preventDefault();
        sort();
    });
    


}


function renderItems(sender){
    let form = document.getElementById("formElement");
    
    while (form.hasChildNodes()){
        form.removeChild(form.firstChild);
    }
    
    //console.log("- Form Inner HTML: " + form.innerHTML);
    
    for (let i = 0; i<itemsArr.length; i++){
        let childNode = document.createElement("div");
        let input
        if (itemsArr[i].isChecked){ 
            input = `<input type="checkbox" class="neonText " id="${itemsArr[i].uniqueValue}" onclick="checkedToggle(this);" value="${itemsArr[i].uniqueValue}" checked>`;
        }else{
            input = `<input type="checkbox" class="neonText " id="${itemsArr[i].uniqueValue}" onclick="checkedToggle(this);" value="${itemsArr[i].uniqueValue}">`;
        }
        let label;
        if (itemsArr[i].isHighlighted == true){
            console.log("item is highlighted");
            label = `<label for="${itemsArr[i].uniqueValue}" class="centerTextTwo HighlightedItem">${itemsArr[i].text}<br></label>`;
        }else{
            console.log("item is not highlighted");
            label = `<label for="${itemsArr[i].uniqueValue}" class="neonText centerTextTwo">${itemsArr[i].text}<br></label>`;
        }
        childNode.innerHTML = input + label;
        if (itemsArr[i].isChecked){
            childNode.checked = true;
        }else{
            childNode.checked = false;
        }
        form.appendChild(childNode);
    }
}


