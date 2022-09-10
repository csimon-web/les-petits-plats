class App {
    constructor() {
        // this.$photographersWrapper = document.querySelector('.photographers_section');
        // this.$specificPhotographerWrapper = document.querySelector('.photographer_data');
        this.api = new Api('/data/recipes.json')
    }

    async displayHomePage() {
        const recipesData = await this.api.getRecipesData()
        recipesData.map((recipe) => new Recipe(recipe))
        const recipes = recipesData.filter(
            (element) => element instanceof Recipe
        )
        console.log(recipes)
    }
}

const app = new App()
app.displayHomePage()
