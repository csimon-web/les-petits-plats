class App {
    constructor() {
        this.appliancesWrapper = document.getElementById(
            'appliances_dropdown_menu'
        )
        this.ustensilsWrapper = document.getElementById(
            'ustensils_dropdown_menu'
        )
        this.ingredientsWrapper = document.getElementById(
            'ingredients_dropdown_menu'
        )
        this.recipesWrapper = document.querySelector('.recipes > .row')
        this.api = new Api('/data/recipes.json')
    }

    async displayHomePage() {
        const recipes = await this.api.getRecipes()

        const appliancesInDropdownMenu = recipes
            .map((recipe) => recipe.appliance)
            .filter((value, index, self) => self.indexOf(value) === index)
        let ustensilsInDropdownMenu = []
        const ustensils = []
        // const ustensils = recipes
        // .map((recipe) => recipe.ustensils)
        for (const recipe of recipes) {
            for (const ustensil of recipe.ustensils) {
                ustensils.push(ustensil)
            }
        }
        ustensilsInDropdownMenu = ustensils.filter(
            (value, index, self) => self.indexOf(value) === index
        )
        let ingredientsInDropdownMenu = []
        const ingredients = []
        for (const recipe of recipes) {
            for (const ingredient of recipe.ingredients) {
                ingredients.push(ingredient.ingredient)
            }
        }
        ingredientsInDropdownMenu = ingredients.filter(
            (value, index, self) => self.indexOf(value) === index
        )

        console.log(appliancesInDropdownMenu)
        console.log(ustensilsInDropdownMenu)
        console.log(ingredientsInDropdownMenu)

        // appliancesInDropdownMenu.forEach((appliances) => {
        //     // console.log(appliances)
        //     const appliancesTemplate = new AppliancesDropdownMenu(appliances)
        //     this.appliancesWrapper.appendChild(
        //         appliancesTemplate.createDropdownMenuItem()
        //     )
        // })

        recipes.forEach((recipe) => {
            const recipeCardTemplate = new RecipeCard(recipe)
            this.recipesWrapper.appendChild(
                recipeCardTemplate.createRecipeCard()
            )
        })

        // console.log(await this.searchWithAnAppliance(''))
    }

    async displayErrorPage() {
        console.log(
            'Aucune page ne correspond malheureusement à cette adresse.'
        )
    }

    async searchWithAnAppliance(appliance) {
        const applianceInLowerCase = appliance.toLowerCase()
        const recipes = await this.api.getRecipes()
        return recipes.filter((recipe) =>
            recipe.appliance.toLowerCase().includes(applianceInLowerCase)
        )
    }

    async searchWithAnUstensil(ustensil) {
        const ustensilInLowerCase = ustensil.toLowerCase()
        const recipes = await this.api.getRecipes()
        return recipes.filter((recipe) =>
            recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(ustensilInLowerCase)
            )
        )
    }

    async searchWithAnIngredient(ingredient) {
        const ingredientInLowerCase = ingredient.toLowerCase()
        const recipes = await this.api.getRecipes()
        return recipes.filter((recipe) =>
            recipe.ingredients.some((recipe) =>
                recipe.ingredient.toLowerCase().includes(ingredientInLowerCase)
            )
        )
    }

    async searchWithAppliancesTags(appliances) {
        const appliancesInLowerCase = appliances.map((appliance) =>
            appliance.toLowerCase()
        )
        const recipes = await this.api.getRecipes()
        return recipes.filter((recipe) =>
            appliancesInLowerCase.every((appliance) =>
                recipe.appliance.toLowerCase().includes(appliance)
            )
        )
    }

    async searchWithUstensilsTags(ustensils) {
        const ustensilsInLowerCase = ustensils.map((ustensil) =>
            ustensil.toLowerCase()
        )
        const recipes = await this.api.getRecipes()
        return recipes.filter((recipe) =>
            ustensilsInLowerCase.every((ustensil) =>
                recipe.ustensils
                    .map((ustensil) => ustensil.toLowerCase())
                    .includes(ustensil)
            )
        )
    }

    async searchWithIngredientsTags(ingredients) {
        const ingredientsInLowerCase = ingredients.map((ingredient) =>
            ingredient.toLowerCase()
        )
        const recipes = await this.api.getRecipes()
        return recipes.filter((recipe) =>
            ingredientsInLowerCase.every((ingredient) =>
                recipe.ingredients
                    .map((recipe) => recipe.ingredient.toLowerCase())
                    .includes(ingredient)
            )
        )
    }

    async search(keyword) {
        const lowerCaseKeyword = keyword.toLowerCase()
        const recipes = await this.api.getRecipes()
        return recipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(lowerCaseKeyword) ||
                recipe.description.toLowerCase().includes(lowerCaseKeyword) ||
                recipe.ingredients
                    .map((ingredient) => ingredient.ingredient.toLowerCase())
                    .some((ingredient) => ingredient.includes(lowerCaseKeyword))
        )
    }

    // async search(keyword) {
    //     await app.searchWithSearchEngine(keyword)
    // }
}

// const app = new App();

// const filteredResults = app.searchWithSearchEngine('coco')
// console.log(filteredResults)

// app.searchWithAnAppliance('sALA')
// app.searchWithAnUstensil('écon')
// app.searchWithAnIngredient('CoCo')

// app.searchWithAppliancesTags(['Four'])
// app.searchWithAppliancesTags(['Four', 'Saladier'])
// app.searchWithUstensilsTags(['CouTEAu', 'râpe à FROMAGE'])
// app.searchWithIngredientsTags(['Lait De CoCo', 'ToMaTe'])

// (async () => {
//     const results = await app.searchWithSearchEngine('coc')
//     console.log(results);})();

const currentPage = document.location.pathname
const app = new App()
switch (currentPage) {
    case '/':
    case '/index.html':
        app.displayHomePage()
        break
    default:
        app.displayErrorPage()
}
