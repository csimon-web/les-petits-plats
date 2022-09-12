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

    async searchWithSearchEngine(parameter) {
        const recipesData = await this.api.getRecipesData()
        const recipesArray = recipesData
            .map((recipe) => new Recipe(recipe))
            .filter((element) => element instanceof Recipe)

        const resultsArray = []
        recipesArray.forEach((recipe) => {
            if (recipe.name.includes(parameter)) {
                resultsArray.push(recipe)
            }
            if (recipe.description.includes(parameter)) {
                resultsArray.push(recipe)
            }
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient.ingredient.includes(parameter)) {
                    resultsArray.push(recipe)
                }
            })
        })
        console.log(resultsArray)
        const filteredResultsArray = resultsArray.filter(
            (ele, pos) => resultsArray.indexOf(ele) === pos
        )
        console.log(filteredResultsArray)
        // return filteredResultsArray;
    }

    async searchWithAnAppliance(parameter) {
        const recipesData = await this.api.getRecipesData()
        const recipesArray = recipesData
            .map((recipe) => new Recipe(recipe))
            .filter((element) => element instanceof Recipe)

        const filteredArray = recipesArray.filter(
            (el) => el.appliance.includes(parameter)
        )

        console.log(filteredArray)

    }

    async searchWithAnUstensil(parameter) {
        const recipesData = await this.api.getRecipesData()
        const recipesArray = recipesData
            .map((recipe) => new Recipe(recipe))
            .filter((element) => element instanceof Recipe)

        const filteredArray = recipesArray.filter(
            (el) => el.ustensils.some(ustensil => ustensil.includes(parameter))
        )

        console.log(filteredArray)
    }

    async searchWithAnIngredient(parameter) {
        const recipesData = await this.api.getRecipesData()
        const recipesArray = recipesData
            .map((recipe) => new Recipe(recipe))
            .filter((element) => element instanceof Recipe)

        const filteredArray = recipesArray.filter(
            (el) => el.ingredients.some(ingredient => ingredient.ingredient.includes(parameter))
        )

        console.log(filteredArray)

        // const resultsArray = []

        // recipesArray.forEach((recipe) => {
        //     recipe.ingredients.forEach((ingredient) => {
        //         if (ingredient.ingredient.includes(parameter)) {
        //             resultsArray.push(recipe)
        //         }
        //     })
        // })
        
        // const filteredResultsArray = resultsArray.filter(
        //     (ele, pos) => resultsArray.indexOf(ele) === pos
        // )
        // console.log(filteredResultsArray)
        // return filteredResultsArray;
    }

    async searchWithAppliancesTags(parameters) {
        const recipesData = await this.api.getRecipesData()
        const recipesArray = recipesData
            .map((recipe) => new Recipe(recipe))
            .filter((element) => element instanceof Recipe)

        parameters.forEach((parameter) => console.log(parameter))
        
        // const filteredArray = recipesArray.filter(
        //     (el) => el.appliance.includes(parameter)
        // )

        // console.log(filteredArray)

    }

    async searchWithIngredientsTags(parameters) {
        const recipesData = await this.api.getRecipesData()
        const recipesArray = recipesData
            .map((recipe) => new Recipe(recipe))
            .filter((element) => element instanceof Recipe)

        parameters.forEach((parameter) => console.log(parameter))

        // const resultsArray = recipesArray
        //     .filter((element) => element.ingredients.ingredient === parameter)

        // console.log(resultsArray)
    }
}

const app = new App()
// const filteredResults = app.searchWithSearchEngine('coco')
// console.log(filteredResults)

// app.searchWithSearchEngine('coc')
// app.searchWithAnAppliance('ala')
// app.searchWithAnUstensil('cout')
// app.searchWithAnIngredient('coc')
// app.searchWithAppliancesTags(['Four'])
app.searchWithAppliancesTags(['Four', 'Saladier'])
