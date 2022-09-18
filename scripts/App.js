class App {
    constructor() {
        // this.$photographersWrapper = document.querySelector('.photographers_section');
        // this.$specificPhotographerWrapper = document.querySelector('.photographer_data');
        this.api = new Api('/data/recipes.json')
    }

    // async displayHomePage() {
    //     const recipesData = await this.api.getRecipesData()
    //     // console.log(recipesData)
    //     const recipes = recipesData
    //         .map((recipe) => new Recipe(recipe))
    //         .filter((element) => element instanceof Recipe)
    //     console.log(recipes)
    // }



    async searchWithAnAppliance(app) {
        const lowerCaseAppliance = app.toLowerCase()
        const recipesArray = await this.api.getRecipesArray()
        const filteredArray = recipesArray.filter((el) =>
            el.appliance.toLowerCase().includes(lowerCaseAppliance)
        )
        console.log(filteredArray)
    }

    async searchWithAnUstensil(ust) {
        const lowerCaseUstensil = ust.toLowerCase()
        const recipesArray = await this.api.getRecipesArray()
        const filteredArray = recipesArray.filter((el) =>
            el.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(lowerCaseUstensil)
            )
        )
        console.log(filteredArray)
    }

    async searchWithAnIngredient(ing) {
        const lowerCaseIngredient = ing.toLowerCase()
        const recipesArray = await this.api.getRecipesArray()
        const filteredArray = recipesArray.filter((el) =>
            el.ingredients.some((recipe) =>
                recipe.ingredient.toLowerCase().includes(lowerCaseIngredient)
            )
        )
        console.log(filteredArray)
    }

    async searchWithAppliancesTags(appliances) {
        const lowerCaseAppliances = appliances.map(el => el.toLowerCase())
        const recipesArray = await this.api.getRecipesArray()
        const filteredArray = recipesArray.filter((el) =>
            lowerCaseAppliances.every((item) =>
                el.appliance.toLowerCase().includes(item)
            )
        )
        console.log(filteredArray)
    }

    async searchWithUstensilsTags(ustensils) {
        const lowerCaseUstensils = ustensils.map(el => el.toLowerCase())
        const recipesArray = await this.api.getRecipesArray()
        const filteredArray = recipesArray.filter((el) =>
            lowerCaseUstensils.every((item) =>
                el.ustensils.map((el) => el.toLowerCase()).includes(item)
            )
        )
        console.log(filteredArray)
    }

    async searchWithIngredientsTags(ingredients) {
        const lowerCaseIngredients = ingredients.map(el => el.toLowerCase())
        const recipesArray = await this.api.getRecipesArray()
        const filteredArray = recipesArray.filter((el) =>
            lowerCaseIngredients.every((item) =>
                el.ingredients
                    .map((el) => el.ingredient.toLowerCase())
                    .includes(item)
            )
        )
        console.log(filteredArray)
    }

    async searchWithSearchEngine(keyword) {
        const lowerCaseKeyword = keyword.toLowerCase()
        console.log(lowerCaseKeyword)
        const recipesArray = await this.api.getRecipesArray()
        const filteredArray = recipesArray.filter((el) =>
                el.name.toLowerCase().includes(lowerCaseKeyword) ||
                el.description.toLowerCase().includes(lowerCaseKeyword) ||
                el.ingredients
                    .map((el) => el.ingredient.toLowerCase())
                    .some((item) => item.includes(lowerCaseKeyword))
        )
        console.log(filteredArray)
    }
}

const app = new App()
// const filteredResults = app.searchWithSearchEngine('coco')
// console.log(filteredResults)

// app.searchWithAnAppliance('sALA')
// app.searchWithAnUstensil('écon')
// app.searchWithAnIngredient('CoCo')

// app.searchWithAppliancesTags(['Four'])
// app.searchWithAppliancesTags(['Four', 'Saladier'])
// app.searchWithUstensilsTags(['CouTEAu', 'râpe à FROMAGE'])
// app.searchWithIngredientsTags(['Lait De CoCo', 'ToMaTe'])

app.searchWithSearchEngine('CoC')
