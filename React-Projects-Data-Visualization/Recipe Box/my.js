//[X] TODO: DELETE BUTTON -> killMe
//[x] TODO: EDIT BUTTON -> editMe
  // [x] PARSE BACK TO NORMAL.
  // [x] [HIDE/SHOW EDIT BOX]
//[x] TODO: CREATE BUTTON -> createNew
  // [x] [HIDE/SHOW CREATE BOX]
  // [x] PARSE BACK TO NORMAL.


function displayMe(id){
 var class_changer = document.getElementById(id + "X");
  console.log(class_changer.classList.value);
  if(class_changer.classList.value == 'hide'){
    class_changer.classList.value = 'show';
  }else{
    class_changer.classList.value = 'hide';
  } 
}

function displayMeCreate(){
 var class_changer = document.getElementById("CREATE");
  //var converted = Array.prototype.slice.apply(class_changer);
  //console.log(class_changer.classList.value);
  if(class_changer.classList.value == 'jumbotron hide'){
    class_changer.classList.value = 'jumbotron show';
  }else{
    class_changer.classList.value = 'jumbotron hide';
  } 
}

function displayMeEdit(id){
 var class_changer = document.getElementById(id + "EDIT");
  //var converted = Array.prototype.slice.apply(class_changer);
  //console.log(class_changer.classList.value);
  if(class_changer.classList.value == 'jumbotron hide'){
    class_changer.classList.value = 'jumbotron show';
  }else{
    class_changer.classList.value = 'jumbotron hide';
  } 
}


// testing
function killMe(id){
  // Access the stupid object, then update it.
  for(var key in the_parsed_info){
    if(the_parsed_info[key].name == id){
      delete the_parsed_info[key];
    }
  }
  //localStorage.removeItem("_kashire_FCC_recipes_0");
  // update.
  console.log("del");
  localStorage.setItem('_kashire_FCC_recipes_0', JSON.stringify(the_parsed_info));
  console.log("Deleted.");
}

function editMe(id, name, ingreds){
  ingreds = ingreds.split(",");
  the_parsed_info[key] = {
    ingrediant: ingreds,
    name: name
  };
  //localStorage.removeItem("_kashire_FCC_recipes_0");
  localStorage.setItem('_kashire_FCC_recipes_0', JSON.stringify(the_parsed_info));
  console.log("update complete.")
}

function createNew(new_val, RECIPNAME, RECIPINGRED){
  console.log("OK");
  RECIPINGRED = RECIPINGRED.split(",");
  console.log(RECIPINGRED);
  console.log("NO");
  
  the_parsed_info[new_val] = {
    ingrediant: RECIPINGRED,
    name: RECIPNAME
  }
  console.log(the_parsed_info);
  //localStorage.removeItem("_kashire_FCC_recipes_0");
  localStorage.setItem('_kashire_FCC_recipes_0', JSON.stringify(the_parsed_info));
  console.log("YAY!"); 
}



  if(localStorage.getItem('_kashire_FCC_recipes_0')){
    var recipe = localStorage.getItem('_kashire_FCC_recipes_0');
    console.log("detected");
  }else{
    console.log("DOES NOT EXIST");
    var recipe = {
      0 : { name: 'Pumpkin Pie', ingrediant : ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust']},
      1 : { name: 'Spaghetti', ingrediant : ['Noodles', 'Tomato Sauce', 'Fresh Basil', 'Meatballs']}
    };

    // Takes above and pushes it into the log.
    localStorage.setItem('_kashire_FCC_recipes_0', JSON.stringify(recipe));
  }
  // wat
  var the_parsed_info = JSON.parse(recipe);
  // Build the html
  var html = ''
  var names = [];
  // test
  var parsed_len = Object.keys(the_parsed_info).length;

  function updateForm(id){
    console.log("Updating...");
    var RECIPNAME = document.getElementById(the_parsed_info[id].name+'RECIPNAME').value;
    var RECIPINGRED = document.getElementById(the_parsed_info[id].name+'INGRED').value;
    editMe(id, RECIPNAME, RECIPINGRED);
  }

  function updateNew(){
    var new_val = parsed_len+1;
    var RECIPNAME = document.getElementById('recipeName').value;
    var RECIPINGRED = document.getElementById('ingredientsList').value;
    createNew(new_val, RECIPNAME, RECIPINGRED);
  }

for(var key in the_parsed_info){
  console.log(the_parsed_info[key]);
    /* the edit button */
    html += '<div id="'+the_parsed_info[key].name+'EDIT" class="jumbotron hide">';
    html += '<form id="update">';
    html += 'Recipe: <input type="text" name="recipeName" id="'+the_parsed_info[key].name+'RECIPNAME" value="'+the_parsed_info[key].name+'"style="width: 100%;" /><br />';
    html += 'Ingredients: <input type="text" id="'+the_parsed_info[key].name+'INGRED" name="ingredientsList" style="width: 100%;" value="'+the_parsed_info[key].ingrediant+'" /><br /><br />';
    html += '<input type="button" class="btn btn-danger" onClick="updateForm('+key+')" value="update" />&nbsp;';
    html += '&nbsp;<button class="btn btn-info" id="' + the_parsed_info[key].name + '" OnClick="displayMeEdit(this.id)">CANCEL</button>';
    html += '</form></div>';
    /* kk done with edit button. */
    /* The Create Buttons */
  
    html += '<div id="CREATE" class="jumbotron hide">';
    html += '<form id="update">';
    html += 'Recipe: <input type="text" id="recipeName" name="recipeName" value="Recipe Name" style="width: 100%;" /><br />';
    html += 'Ingredients: <input type="text" id="ingredientsList" name="ingredientsList" style="width: 100%;" value="Enter Ingredients,Separated,By Commas" /><br /><br />';
    html += '<input type="button" class="btn btn-success" onClick="updateNew()" value="update" />&nbsp;';
    html += '&nbsp;<button class="btn btn-info" OnClick="displayMeCreate(this.id)">CANCEL</button>';
    html += '</form></div>';
    /* Done with Create Button */
  
    html += '<button class="btn btn-success random_name" id="'+ the_parsed_info[key].name+'" onClick="displayMe(this.id)">';
    html += the_parsed_info[key].name+'</button><br /><br />';
    html += '<div id="' + the_parsed_info[key].name + 'X" class="hide"><ul>';
    // iterate through this.
    for(var keyX in the_parsed_info[key].ingrediant){
      html += '<li>'+the_parsed_info[key].ingrediant[keyX]+ '</li>'
    }
    html += '</ul>';
    // creates buttons to DELETE & EDIT the entries.
    html += '<button class="btn btn-danger" id="' + the_parsed_info[key].name + '" onClick="killMe(this.id)">DELETE</button>';
    html += '&nbsp;<button class="btn btn-warning" id="' + the_parsed_info[key].name + '" onClick="displayMeEdit(this.id)">EDIT</button>';
    // end
    html += '</div><br />';
  }

  html += '<hr><button class="btn btn-info" onClick="displayMeCreate()">Add Recipe</button>';

class Box extends React.Component{

  render(){
    
    return(
      <section id="main">
        <form id="add"></form>
        <hr/>
        <h1>Recipe Box</h1>
        <hr/>
        <table dangerouslySetInnerHTML={{__html: html}} />
      </section>
    )
  }
}

class Main extends React.Component{
  render(){
    return(
      <Box />
    )
  }
}

ReactDOM.render(<Main />, document.body);
