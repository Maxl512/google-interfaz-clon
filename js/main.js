let search = document.querySelector("#searcher");
let searchContainer = document.querySelector("#searcher-container");
let modalContainer = document.querySelector("#modal-add-container");
let modal = document.querySelector("#modal-add");
let shortcutContainer = document.querySelector("#shortcutContainer");
let shortcutName = document.querySelector("#name-shortcut");
let shortcutUrl = document.querySelector("#url-shortcut");
let shortcutSubmit = document.querySelector("#add-form-submit");
let shortcutCancel = document.querySelector("#cancel-form-button");
let shortCuts = [];
let littleMenu = document.querySelector(".little-menu");
searchContainer.addEventListener("mouseover", ()=>{
    searchContainer.style.borderRadius ="10px";
});
searchContainer.addEventListener("mouseout", ()=>{
    searchContainer.style.borderRadius="50px";
});
search.addEventListener("keyup", (event)=>{
    if(event.which == 13){
        window.open(`https://www.google.com/search?q=${search.value}&oq=${search.value}&aqs=chrome..69i57.718j0j15&sourceid=chrome&ie=UTF-8`);
    };
});
function showModal(){
    shortcutName.value = "";
    shortcutUrl.value = "";
    modalContainer.style.display="block";
};
function removeDisabled (){
   if(shortcutName.value.length > 0 && shortcutUrl.value.length > 0){
        shortcutSubmit.removeAttribute("disabled");
        shortcutSubmit.setAttribute("class", "submit-shortcut-button");
    } else{
        shortcutSubmit.setAttribute("disabled", "");
        shortcutSubmit.removeAttribute("class");
   };
};
shortcutUrl.addEventListener("keypress", removeDisabled);
shortcutName.addEventListener("keypress", removeDisabled);
shortcutCancel.addEventListener("click", (e)=>{
    e.preventDefault();
    modalContainer.style.display="none";
});
function addShortcut(e){
    e.preventDefault();
    let error = [];
    let shortcut = {
        name: shortcutName.value, 
        url: shortcutUrl.value
    };
    if (shortCuts.length == 0){
        shortCuts.push(shortcut);
    } else {
        for(one in shortCuts){
            if(shortCuts[one].name == shortcutName.value){
                error[0] = true;
                error[1] = "Ese nombre ya esta aqui";
                return error;
            }else if (shortCuts[one].url == shortcutUrl.value){
                error[0] = true;
                error[1] = "Esa url ya esta aqui";
                return error;
            } 
        }; 
        shortCuts.push(shortcut);
    };   
    let fragment = document.createDocumentFragment();
    let div = document.createElement("DIV");
    div.setAttribute("class", "last-searches");
    let span = document.createElement("SPAN");
    span.setAttribute("class", "menu-open");
    span.appendChild(document.createTextNode("Editar"));
    let nav = document.createElement("NAV");
    nav.setAttribute("class", "little-menu");
    let buttonOne = document.createElement("BUTTON");
    buttonOne.appendChild(document.createTextNode("Eliminar"));
    buttonOne.setAttribute("onclick", "deleteShortcut(this);");
    let buttonTwo = document.createElement("BUTTON");
    buttonTwo.appendChild(document.createTextNode("Modificar"));
    buttonTwo.setAttribute("onclick", "modifyShortcut(this);");
    nav.appendChild(buttonOne);
    nav.appendChild(buttonTwo);
    span.appendChild(nav);
    let img = document.createElement("img");
    img.setAttribute("href", shortcutUrl.value);
    let p = document.createElement("P");
    p.appendChild(document.createTextNode(shortcutName.value));
    div.appendChild(span);
    div.appendChild(img);
    div.appendChild(p);
    fragment.appendChild(div);
    shortcutContainer.appendChild(fragment);
    if(shortcutContainer.children.length > 10){
        modalContainer.style.display="none";
        document.querySelector("#add").style.display ="none";
    };
    modalContainer.style.display = "none";
    error[0]=false;
    error[1]="Acceso directo agregado correctamente";
    return error;
};
function changeShortcut(e){
    e.preventDefault();
    let error = [];
    let img = document.querySelector(".menu-open").nextElementSibling;
    let url = img.getAttribute("href");
    let p = img.nextElementSibling;
    let name = p.textContent;
    if(shortcutName.value == name){
        error[0] = true;
        error[1] = "No has cambiado en nada el nombre";
        return error;
    } else if (shortcutUrl.value == url){
        error[0] = true;
        error[1] = "No has cambiado en nada la url";
        return error;
    };  
    for(one in shortCuts){
        if(name == shortCuts[one].name){     
            shortCuts[one].name = shortcutName.value;
            shortCuts[one].url = shortcutUrl.value;
            img.removeAttribute("href");
            img.setAttribute("href", shortcutUrl.value);
            p.innerHTML = shortcutName.value;
        };
    };  
    modalContainer.style.display = "none";
    error[0]=false;
    error[1]="Acceso directo modificado correctamente";
    return error;
};
function getError(e){
    let type = shortcutSubmit.getAttribute("id");
    if(type == "add-form-submit"){
        type = 1;
    } else if(type == "modify-form-submit"){
        type = 2;
    };
    if(type == 1){
        let error = addShortcut(e);
        if(error[0]){
            alert(error[1]);
        }else{
            alert(error[1]);   
            shortcutName.value = "";
            shortcutUrl.value = "";
            shortcutSubmit.setAttribute("disabled", "");
            shortcutSubmit.removeAttribute("class");
        };
    }else{
        let error = changeShortcut(e);;
        if(error[0]){
            alert(error[1]);
        } else{
            alert(error[1]);   
            shortcutName.value = "";
            shortcutUrl.value = "";
            shortcutSubmit.setAttribute("disabled", "");
            shortcutSubmit.removeAttribute("class");
            shortcutSubmit.removeAttribute("id");
            shortcutSubmit.setAttribute("id", "add-form-submit");
        };
    }
};
shortcutSubmit.addEventListener("click", getError);
function modifyShortcut(element){
    let nav = element.parentElement;
    let span = nav.parentElement;
    let div = span.parentElement;
    let p = div.lastChild;
    let img = p.previousSibling; 
    p = p.textContent;
    img = img.getAttribute("href");
    shortcutName.value = p;
    shortcutUrl.value = img;   
    modalContainer.style.display="block";

    shortcutSubmit.removeAttribute("id");
    shortcutSubmit.setAttribute("id", "modify-form-submit");

    let shortcutModify = document.querySelector("#modify-form-submit");

    shortcutModify.addEventListener("click", getError);
};
function deleteShortcut(element){
    let nav = element.parentElement;
    let span = nav.parentElement;
    let div = span.parentElement;
    let p = div.lastChild;
    p = p.textContent;
    for(one in shortCuts){
        if(p == shortCuts[one].name){
            one = parseInt(one);
            let another = shortCuts.slice((one + 1), shortCuts.length);
            shortCuts.splice(one);
            for(littleOne in another){
                shortCuts.push(another[littleOne]);  
            };
        };
    };
    div.style.display="none";
};