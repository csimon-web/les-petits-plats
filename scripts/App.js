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
        this.recipes
        this.searchKeyword = ''
        this.appliancesTags = []
        this.ustensilsTags = []
        this.ingredientsTags = []
        this.api = new Api('/data/recipes.json')
    }

    async filterWithAnAppliance(appliance) {
        const applianceInLowerCase = appliance.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            recipe.appliance.toLowerCase().includes(applianceInLowerCase)
        )
    }

    async filterWithAnUstensil(ustensil) {
        const ustensilInLowerCase = ustensil.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(ustensilInLowerCase)
            )
        )
    }

    async filterWithAnIngredient(ingredient) {
        const ingredientInLowerCase = ingredient.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
            recipe.ingredients.some((recipe) =>
                recipe.ingredient.toLowerCase().includes(ingredientInLowerCase)
            )
        )
    }

    async filterWithAppliancesTags(appliances) {
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

    async filterWithUstensilsTags(ustensils) {
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

    async filterWithIngredientsTags(ingredients) {
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
        this.searchKeyword = keyword.toLowerCase()
        this.recipes = await this.api.getRecipes()
        return this.recipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(this.searchKeyword) ||
                recipe.description.toLowerCase().includes(this.searchKeyword) ||
                recipe.ingredients
                    .map((ingredient) => ingredient.ingredient.toLowerCase())
                    .some((ingredient) => ingredient.includes(this.searchKeyword))
        )
    }

    getAppliancesFromRecipes(recipes) {
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

    displayCards(recipes) {
        if (recipes.length === 0) {
            const messageIfEmpty = document.createElement('p')
            messageIfEmpty.classList.add('col-12')
            messageIfEmpty.textContent = `Il n'y a aucun résultat à votre recherche. Essayez une autre recherche moins précise pour avoir plus de résultats.`
            this.recipesWrapper.appendChild(messageIfEmpty)
        } else {
            recipes.forEach((recipe) => {
                const recipeCardTemplate = new RecipeCard(recipe)
                this.recipesWrapper.appendChild(
                    recipeCardTemplate.createRecipeCard()
                )
            })
        }
    }

    deleteCards() {
        this.recipesWrapper.innerHTML = ''
    }

    updateCards(recipes) {
        this.deleteCards()
        this.displayCards(recipes)
    }

    displayAppliancesDropdownMenu(appliancesInDropdownMenu) {
        appliancesInDropdownMenu.forEach((appliance) => {
            const appliancesTemplate = new AppliancesDropdownMenu(appliance)
            this.appliancesWrapper.appendChild(
                appliancesTemplate.createDropdownMenuItem()
            )
        })
    }

    deleteAppliancesDropdownMenu() {
        this.appliancesWrapper.innerHTML = ''
    }

    updateAppliancesDropdownMenu(appliances) {
        this.deleteAppliancesDropdownMenu()
        this.displayAppliancesDropdownMenu(appliances)
        this.createEventsOnAppliancesItems()
    }

    displayUstensilsDropdownMenu(ustensilsInDropdownMenu) {
        ustensilsInDropdownMenu.forEach((ustensil) => {
            const ustensilsTemplate = new UstensilsDropdownMenu(ustensil)
            this.ustensilsWrapper.appendChild(
                ustensilsTemplate.createDropdownMenuItem()
            )
        })
    }

    deleteUstensilsDropdownMenu() {
        this.ustensilsWrapper.innerHTML = ''
    }

    updateUstensilsDropdownMenu(ustensils) {
        this.deleteUstensilsDropdownMenu()
        this.displayUstensilsDropdownMenu(ustensils)
        this.createEventsOnUstensilsItems()
    }

    displayIngredientsDropdownMenu(ingredientsInDropdownMenu) {
        ingredientsInDropdownMenu.forEach((ingredient) => {
            const ingredientsTemplate = new IngredientsDropdownMenu(ingredient)
            this.ingredientsWrapper.appendChild(
                ingredientsTemplate.createDropdownMenuItem()
            )
        })
    }

    deleteIngredientsDropdownMenu() {
        this.ingredientsWrapper.innerHTML = ''
    }

    updateIngredientsDropdownMenu(ingredients) {
        this.deleteIngredientsDropdownMenu()
        this.displayIngredientsDropdownMenu(ingredients)
        this.createEventsOnIngredientsItems()
    }

    createEventsOnSearchBar() {
        const input = document.querySelector('.search .input-group input')
        input.addEventListener('input', async () => {
            if (input.textLength >= 3) {
                this.searchKeyword = input.value
                this.deleteCards()
                this.recipes = await this.search(this.searchKeyword)

                const filteredRecipes = this.filterByTags(this.appliancesTags, this.ustensilsTags, this.ingredientsTags)
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                    this.recipes
                )
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                    this.recipes
                )
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
                    this.recipes
                )
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
            }
        })
    }

    createEventsOnAppliancesItems() {
        const appliancesItems = document.querySelectorAll(
            '#appliances_dropdown_menu .dropdown-item'
        )
        const appliancesTagsWrapper = document.getElementById('appliances_tags')
        appliancesItems.forEach((menuItem) => {
            menuItem.addEventListener('click', async () => {
                if (this.appliancesTags.includes(menuItem.textContent)) {
                    const appliancesTags = Array.from(document.querySelectorAll('.appliance_tag'))
                    const applianceTagToDelete = appliancesTags.find(applianceTag => applianceTag.textContent === menuItem.textContent + ' ')
                    applianceTagToDelete.remove()

                    this.appliancesTags = this.appliancesTags.filter(appliance => appliance !== menuItem.textContent)
                } else {
                    const tag = document.createElement('span')
                    tag.classList.add(
                        'appliance_tag',
                        'btn',
                        'mb-3',
                        'me-3',
                        'py-2',
                        'second_color'
                    )
                    tag.innerHTML =
                        `${menuItem.textContent} ` +
                        `<i class="fa-regular fa-circle-xmark ${this.toKebabCase(menuItem.textContent)}"></i>`
                    appliancesTagsWrapper.appendChild(tag)

                    const closeButton = document.querySelector(`.fa-regular.${this.toKebabCase(menuItem.textContent)}`)
                    closeButton.addEventListener('click', () => {
                        const applianceTagToDelete = closeButton.parentElement
                        applianceTagToDelete.remove()
                        this.appliancesTags = this.appliancesTags.filter(appliance => appliance !== menuItem.textContent)
                        const filteredRecipes = this.filterByTags(this.appliancesTags, this.ustensilsTags, this.ingredientsTags)
                        this.updateCards(filteredRecipes)
                        const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                            filteredRecipes
                        )
                        this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)
                        const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                            filteredRecipes
                        )
                        this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)
                        const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
                            filteredRecipes
                        )
                        this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
                    })
    
                    this.appliancesTags.push(menuItem.textContent)
                    console.log(this.appliancesTags)
                }
                this.recipes = await this.search(this.searchKeyword)
                const filteredRecipes = this.filterByTags(this.appliancesTags, this.ustensilsTags, this.ingredientsTags)
                console.log(filteredRecipes)
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                    filteredRecipes
                )
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                    filteredRecipes
                )
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
                    filteredRecipes
                )
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
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
                if (this.ustensilsTags.includes(menuItem.textContent)) {
                    const ustensilsTags = Array.from(document.querySelectorAll('.ustensil_tag'))
                    const ustensilTagToDelete = ustensilsTags.find(ustensilTag => ustensilTag.textContent === menuItem.textContent + ' ')
                    ustensilTagToDelete.remove()

                    this.ustensilsTags = this.ustensilsTags.filter(ustensil => ustensil !== menuItem.textContent)
                    console.log(this.ustensilsTags)
                } else {
                    const tag = document.createElement('span')
                    tag.classList.add(
                        'ustensil_tag',
                        'btn',
                        'mb-3',
                        'me-3',
                        'py-2',
                        'third_color'
                    )
                    tag.innerHTML =
                        `${menuItem.textContent} ` +
                        `<i class="fa-regular fa-circle-xmark ${this.toKebabCase(menuItem.textContent)}"></i>`
                    ustensilsTagsWrapper.appendChild(tag)

                    const closeButton = document.querySelector(`.fa-regular.${this.toKebabCase(menuItem.textContent)}`)
                    closeButton.addEventListener('click', () => {
                        const ustensilTagToDelete = closeButton.parentElement
                        ustensilTagToDelete.remove()
                        this.ustensilsTags = this.ustensilsTags.filter(ustensil => ustensil !== menuItem.textContent)
                        const filteredRecipes = this.filterByTags(this.appliancesTags, this.ustensilsTags, this.ingredientsTags)
                        this.updateCards(filteredRecipes)
                        const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                            filteredRecipes
                        )
                        this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)
                        const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                            filteredRecipes
                        )
                        this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)
                        const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
                            filteredRecipes
                        )
                        this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
                    })

                    this.ustensilsTags.push(menuItem.textContent)
                    console.log(this.ustensilsTags)
                }
                this.recipes = await this.search(this.searchKeyword)
                const filteredRecipes = this.filterByTags(this.appliancesTags, this.ustensilsTags, this.ingredientsTags)
                console.log(filteredRecipes)
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                    filteredRecipes
                )
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                    filteredRecipes
                )
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
                    filteredRecipes
                )
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
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
                if (this.ingredientsTags.includes(menuItem.textContent)) {
                    const ingredientsTags = Array.from(document.querySelectorAll('.ingredient_tag'))
                    const ingredientTagToDelete = ingredientsTags.find(ingredientTag => ingredientTag.textContent === menuItem.textContent + ' ')
                    ingredientTagToDelete.remove()

                    this.ingredientsTags = this.ingredientsTags.filter(ingredient => ingredient !== menuItem.textContent)
                    console.log(this.ingredientsTags)
                } else {
                    const tag = document.createElement('span')
                    tag.classList.add(
                        'ingredient_tag',
                        'btn',
                        'mb-3',
                        'me-3',
                        'py-2',
                        'first_color'
                    )
                    tag.innerHTML =
                        `${menuItem.textContent} ` +
                        `<i class="fa-regular fa-circle-xmark ${this.toKebabCase(menuItem.textContent)}"></i>`
                    ingredientsTagsWrapper.appendChild(tag)

                    const closeButton = document.querySelector(`.fa-regular.${this.toKebabCase(menuItem.textContent)}`)
                    closeButton.addEventListener('click', () => {
                        const ingredientTagToDelete = closeButton.parentElement
                        ingredientTagToDelete.remove()
                        this.ingredientsTags = this.ingredientsTags.filter(ingredient => ingredient !== menuItem.textContent)
                        const filteredRecipes = this.filterByTags(this.appliancesTags, this.ustensilsTags, this.ingredientsTags)
                        this.updateCards(filteredRecipes)
                        const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                            filteredRecipes
                        )
                        this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)
                        const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                            filteredRecipes
                        )
                        this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)
                        const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
                            filteredRecipes
                        )
                        this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
                    })

                    this.ingredientsTags.push(menuItem.textContent)
                    console.log(this.ingredientsTags)
                }
                this.recipes = await this.search(this.searchKeyword)
                const filteredRecipes = this.filterByTags(this.appliancesTags, this.ustensilsTags, this.ingredientsTags)
                console.log(filteredRecipes)
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                    filteredRecipes
                )
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                    filteredRecipes
                )
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
                    filteredRecipes
                )
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
            })
        })
    }

    filterByTags(appliances, ustensils, ingredients) {
        return this.recipes
            .filter((recipe) =>
                appliances.every((appliance) =>
                    recipe.appliance.includes(appliance)
                )
            )
            .filter((recipe) =>
                ustensils.every((ustensil) =>
                    recipe.ustensils.includes(ustensil)
                )
            )
            .filter((recipe) =>
                ingredients.every((ingredient) =>
                    recipe.ingredients
                        .map((recipe) => recipe.ingredient)
                        .includes(ingredient)
                )
            )
    }

    toKebabCase(str) {
        return str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .join('-')
            .toLowerCase();
    }

    async displayHomePage() {
        this.recipes = await this.api.getRecipes()
    
        this.displayCards(this.recipes)
        
        const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
            this.recipes
        )
        this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)
    
        const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
            this.recipes
        )
        this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)
    
        const ingredientsInDropdownMenu = this.getIngredientsFromRecipes(
            this.recipes
        )
        this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
    
        this.createEventsOnSearchBar()
    }
    
    displayErrorPage() {
        console.log(
            'Aucune page ne correspond malheureusement à cette adresse.'
        )
    }
}


// const appliancesInDropdownMenu = recipes
// .map((recipe) => recipe.appliance)
// .filter((value, index, self) => self.indexOf(value) === index)

// const app = new App();

// const filteredResults = app.searchWithSearchEngine('coco')
// console.log(filteredResults)

// app.filterWithAnAppliance('sALA')
// app.filterWithAnUstensil('écon')
// app.filterWithAnIngredient('CoCo')

// app.filterWithAppliancesTags(['Four'])
// app.filterWithAppliancesTags(['Four', 'Saladier'])
// app.filterWithUstensilsTags(['CouTEAu', 'râpe à FROMAGE'])
// app.filterWithIngredientsTags(['Lait De CoCo', 'ToMaTe'])

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
