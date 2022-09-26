class Api {
    constructor(url) {
        this.url = url
    }

    async getRecipes() {
        const response = await fetch(this.url)
        const data = await response.json()
        const recipesData = data.recipes
        const recipes = recipesData.map((recipe) => new Recipe(recipe))
        return recipes
    }
}
