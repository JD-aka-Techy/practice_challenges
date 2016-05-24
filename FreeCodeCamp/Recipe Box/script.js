// uses React
// uses ReactDOM
// uses babel

const { Component } = React;
// TODO: Refactor code to constituent components and move updates etc to lifecycle methods

class RecipeBook extends Component {

  constructor() {
    super();
    this.state = {
      recipes: this._getRecipes()
    }
  }

  _getRecipes() {
    let recipes;
    if(localStorage['_Techy_recipes']){
      recipes = JSON.parse(localStorage['_Techy_recipes']);
    } else {
      localStorage['_Techy_recipes'] = JSON.stringify([
        { name: 'Example Recipe',
          ingredients: 'Example ingredient',
          active: false, edit: false }
      ]);
      recipes = JSON.parse(localStorage['_Techy_recipes']);
    }
    return recipes;
  }

  _updateSave() {
    localStorage['_Techy_recipes'] = JSON.stringify(this.state.recipes);
    console.log('boop')
  }

  _toggleCollapse( id ) {
    // this needs making immutable
    let newRecipes = this.state.recipes;
    newRecipes[id].active = newRecipes[id].active ? false : true;
    this.setState({
      recipes: newRecipes
    });
  }

  _updateRecipe(id, field, event) {
    let newRecipes = this.state.recipes;
    newRecipes[id][field] = event.target.value;
    this.setState({
      recipes: newRecipes
    });
  }

  _toggleEdit(id, e) {
    let newRecipes = this.state.recipes;
    newRecipes[id].edit = newRecipes[id].edit ? false : true;
    this.setState({
      recipes: newRecipes
    });
     this._updateSave()
  }

  _addNew() {
    let newRecipes = this.state.recipes;
    newRecipes.push({name: '', ingredients: '', active: true, edit: true });
    this.setState({
      recipes: newRecipes
    });
  }

  _deleteRecipe(id, e) {
    let newRecipes = this.state.recipes;
    newRecipes.splice(id, 1);
    this.setState({
      recipes: newRecipes
    });
  }

  render() {
      return (
          <div className="recipeBook">
            <div className="cardHead">
              <h1>FreeCodeCamp Recipe Book</h1>
              <button onClick={ this._addNew.bind(this) }>+</button>
            </div>
            <ul>
              { // loop recipes TODO: re-add key generation for each li
              this.state.recipes.map( (recipe, index) => (

                <li key={index}>
                  <h2 className="recipeName" onClick={ this._toggleCollapse.bind(this, index) }>
                    { recipe.active ? <span>&#9650;</span> : <span>&#9660;</span> } { recipe.name }
                    <span onClick={ this._deleteRecipe.bind(this, index) } >delete</span>
                  </h2>
                  <div className={ recipe.active ? "" : "collapse" }>
                    {
                      !recipe.edit
                      ? (<div className="recipeDetails">
                           <p>{ recipe.ingredients }</p>
                           <span onClick={ this._toggleEdit.bind(this, index) } >edit</span>
                         </div>)
                      : (<div className="recipeDetails">
                           <span> Recipe name</span>
                           <textarea value={ recipe.name } onChange={ this._updateRecipe.bind(this, index, "name") }></textarea>
                           <span>Ingredients</span>
                           <textarea value={ recipe.ingredients } onChange={ this._updateRecipe.bind(this, index, "ingredients") }></textarea>
                          <span onClick={ this._toggleEdit.bind(this, index) } >done</span>
                         </div>)
                    }
                  </div>
                </li>
              ))
              }
            </ul>
          </div>
      )
  }
}


// uncomment to reset local memory
//delete localStorage['_Techy_recipes']
ReactDOM.render(<RecipeBook/>, document.getElementById('appContainer'));
