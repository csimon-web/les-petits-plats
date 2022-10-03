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
        // eslint-disable-next-line no-unused-expressions
        this.recipes
        this.api = new Api('/data/recipes.json')
    }

    async displayHomePage() {
        this.recipes = await this.api.getRecipes()
        const appliancesInDropdownMenu = await this.getAppliancesFromRecipes(
            this.recipes
        )
        const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
            this.recipes
        )
        const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
            this.recipes
        )

        this.displayCards(this.recipes)
        this.displayAppliancesDropdownMenu(appliancesInDropdownMenu)
        this.displayUstensilsDropdownMenu(ustensilsInDropdownMenu)
        this.displayIngredientsDropdownMenu(ingredientsInDropdownMenu)

        this.createEventsOnSearchBar()
        this.createEventsOnAppliancesItems()
        this.createEventsOnUstensilsItems()
        this.createEventsOnIngredientsItems()

        // this.filterByAppliances()
    }

    displayErrorPage() {
        console.log(
            'Aucune page ne correspond malheureusement à cette adresse.'
        )
    }

    async searchWithAnAppliance(appliance) {
        const applianceInLowerCase = appliance.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            recipe.appliance.toLowerCase().includes(applianceInLowerCase)
        )
    }

    async searchWithAnUstensil(ustensil) {
        const ustensilInLowerCase = ustensil.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(ustensilInLowerCase)
            )
        )
    }

    async searchWithAnIngredient(ingredient) {
        const ingredientInLowerCase = ingredient.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            recipe.ingredients.some((recipe) =>
                recipe.ingredient.toLowerCase().includes(ingredientInLowerCase)
            )
        )
    }

    async searchWithAppliancesTags(appliances) {
        const appliancesInLowerCase = appliances.map((appliance) =>
            appliance.toLowerCase()
        )
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            appliancesInLowerCase.every((appliance) =>
                recipe.appliance.toLowerCase().includes(appliance)
            )
        )
    }

    async searchWithUstensilsTags(ustensils) {
        const ustensilsInLowerCase = ustensils.map((ustensil) =>
            ustensil.toLowerCase()
        )
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
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
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            ingredientsInLowerCase.every((ingredient) =>
                recipe.ingredients
                    .map((recipe) => recipe.ingredient.toLowerCase())
                    .includes(ingredient)
            )
        )
    }

    async search(keyword) {
        const lowerCaseKeyword = keyword.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(lowerCaseKeyword) ||
                recipe.description.toLowerCase().includes(lowerCaseKeyword) ||
                recipe.ingredients
                    .map((ingredient) => ingredient.ingredient.toLowerCase())
                    .some((ingredient) => ingredient.includes(lowerCaseKeyword))
        )
    }

    async getAppliancesFromRecipes(recipes) {
        return recipes
            .map((recipe) => recipe.appliance)
            .filter((value, index, self) => self.indexOf(value) === index)
    }

    getUstensilsFromRecipes(recipes) {
        const ustensilsInDropdownMenu = []
        // const ustensils = recipes
        // .map((recipe) => recipe.ustensils)
        for (const recipe of recipes) {
            for (const ustensil of recipe.ustensils) {
                if (ustensilsInDropdownMenu.indexOf(ustensil) === -1) {
                    ustensilsInDropdownMenu.push(ustensil)
                }
            }
        }
        return ustensilsInDropdownMenu
    }

    getIngredientsFromRecipes(recipes) {
        const ingredientsInDropdownMenu = []
        for (const recipe of recipes) {
            for (const ingredient of recipe.ingredients) {
                if (
                    ingredientsInDropdownMenu.indexOf(ingredient.ingredient) ===
                    -1
                ) {
                    ingredientsInDropdownMenu.push(ingredient.ingredient)
                }
            }
        }
        return ingredientsInDropdownMenu
    }

    deleteCards() {
        this.recipesWrapper.innerHTML = ''
    }

    displayCards(recipes) {
        recipes.forEach((recipe) => {
            const recipeCardTemplate = new RecipeCard(recipe)
            this.recipesWrapper.appendChild(
                recipeCardTemplate.createRecipeCard()
            )
        })
    }

    displayAppliancesDropdownMenu(appliancesInDropdownMenu) {
        appliancesInDropdownMenu.forEach((appliance) => {
            const appliancesTemplate = new AppliancesDropdownMenu(appliance)
            this.appliancesWrapper.appendChild(
                appliancesTemplate.createDropdownMenuItem()
            )
        })
    }

    displayUstensilsDropdownMenu(ustensilsInDropdownMenu) {
        ustensilsInDropdownMenu.forEach((ustensil) => {
            const ustensilsTemplate = new UstensilsDropdownMenu(ustensil)
            this.ustensilsWrapper.appendChild(
                ustensilsTemplate.createDropdownMenuItem()
            )
        })
    }

    displayIngredientsDropdownMenu(ingredientsInDropdownMenu) {
        ingredientsInDropdownMenu.forEach((ingredient) => {
            const ingredientsTemplate = new IngredientsDropdownMenu(ingredient)
            this.ingredientsWrapper.appendChild(
                ingredientsTemplate.createDropdownMenuItem()
            )
        })
    }

    createEventsOnSearchBar() {
        const input = document.querySelector('.search .input-group input')
        input.addEventListener('input', async () => {
            this.deleteCards()
            this.recipes = await this.search(input.value)
            this.displayCards(this.recipes)
        })
    }

    createEventsOnAppliancesItems() {
        const appliancesItems = document.querySelectorAll(
            '#appliances_dropdown_menu .dropdown-item'
        )
        const appliancesTagsWrapper = document.getElementById('appliances_tags')
        appliancesItems.forEach((menuItem) => {
            menuItem.addEventListener('click', async () => {
                // const appliancesTags =
                //     document.querySelectorAll('.appliance_tag')
                // console.log(appliancesTags)
                // const appliances = appliancesTags.map(
                //     (element) => element.textContent
                // )
                const tag = document.createElement('span')
                tag.classList.add(
                    'appliance_tag',
                    'btn',
                    'mb-3',
                    'mr-3',
                    'py-2',
                    'second_color'
                )
                tag.innerHTML =
                    `${menuItem.textContent} ` +
                    `<i class="fa-regular fa-circle-xmark"></i>`
                appliancesTagsWrapper.appendChild(tag)
                // this.deleteCards()
                // appliances.push(menuItem.textContent)
                // this.recipes = await this.searchWithAppliancesTags(appliances)
                // this.displayCards(this.recipes)
            })
        })
    }

    createEventsOnUstensilsItems() {
        const ustensilsItems = document.querySelectorAll(
            '#ustensils_dropdown_menu .dropdown-item'
        )
        const ustensilsTagsWrapper = document.getElementById('ustensils_tags')
        ustensilsItems.forEach((menuItem) => {
            menuItem.addEventListener('click', async () => {
                const tag = document.createElement('span')
                tag.classList.add(
                    'ustensil_tag',
                    'btn',
                    'mb-3',
                    'mr-3',
                    'py-2',
                    'third_color'
                )
                tag.innerHTML =
                    `${menuItem.textContent} ` +
                    `<i class="fa-regular fa-circle-xmark"></i>`
                ustensilsTagsWrapper.appendChild(tag)
            })
        })
    }

    createEventsOnIngredientsItems() {
        const ingredientsItems = document.querySelectorAll(
            '#ingredients_dropdown_menu .dropdown-item'
        )
        const ingredientsTagsWrapper =
            document.getElementById('ingredients_tags')
        ingredientsItems.forEach((menuItem) => {
            menuItem.addEventListener('click', async () => {
                const tag = document.createElement('span')
                tag.classList.add(
                    'ingredient_tag',
                    'btn',
                    'mb-3',
                    'mr-3',
                    'py-2',
                    'first_color'
                )
                tag.innerHTML =
                    `${menuItem.textContent} ` +
                    `<i class="fa-regular fa-circle-xmark"></i>`
                ingredientsTagsWrapper.appendChild(tag)
            })
        })
    }

    // filterByAppliances() {
    //     const appliancesTagsWrapper = document.getElementById('appliances_tags')
    //     const appliancesTags = document.querySelectorAll(
    //         '#appliances_tags span'
    //     )
    //     console.log(`wrapper: ${appliancesTagsWrapper}`);
    //     appliancesTagsWrapper.addEventListener('change', () => {
    //         console.log('changé');
    //     })
        // this.searchWithAppliancesTags(appliancesTags)
        // this.deleteCards()
        // this.recipes = this.searchWithAppliancesTags(appliancesTags)
        // this.displayCards(this.recipes)
    // }
}


// const appliancesInDropdownMenu = recipes
// .map((recipe) => recipe.appliance)
// .filter((value, index, self) => self.indexOf(value) === index)

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
