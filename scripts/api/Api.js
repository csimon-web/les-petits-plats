class Api {
    constructor(url) {
        this.url = url
    }

    async getRecipesArray() {
        const response = await fetch(this.url)
        const data = await response.json()
        const recipesData = data.recipes
        const recipesArray = recipesData.map((recipe) => new Recipe(recipe))
        return recipesArray
    }
}
