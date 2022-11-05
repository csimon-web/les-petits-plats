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
        this.recipes = []
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
        return this.recipes.filter(
            (recipe) =>
                recipe.name.toLowerCase().includes(this.searchKeyword) ||
                recipe.description.toLowerCase().includes(this.searchKeyword) ||
                recipe.ingredients
                    .map((ingredient) => ingredient.ingredient.toLowerCase())
                    .some((ingredient) =>
                        ingredient.includes(this.searchKeyword)
                    )
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
        if (appliancesInDropdownMenu.length < 10) {
            appliancesInDropdownMenu.forEach((appliance) => {
                const appliancesTemplate = new AppliancesDropdownMenu(appliance)
                this.appliancesWrapper.appendChild(
                    appliancesTemplate.createDropdownMenuItem()
                )
            })
        } else {
            const row = document.createElement('div')
            row.classList.add('row')

            const col1 = document.createElement('div')
            col1.classList.add('col-12', 'col-md-4')
            for (
                let i = 0;
                i <=
                (appliancesInDropdownMenu.length % 3 !== 0
                    ? Math.floor(appliancesInDropdownMenu.length / 3)
                    : Math.floor(appliancesInDropdownMenu.length / 3) - 1);
                i += 1
            ) {
                const appliancesTemplate = new AppliancesDropdownMenu(
                    appliancesInDropdownMenu[i]
                )
                col1.appendChild(appliancesTemplate.createDropdownMenuItem())
            }

            const col2 = document.createElement('div')
            col2.classList.add('col-12', 'col-md-4')
            for (
                let i = Math.ceil(appliancesInDropdownMenu.length / 3);
                i <=
                (appliancesInDropdownMenu.length % 3 !== 0
                    ? Math.floor((2 * appliancesInDropdownMenu.length) / 3)
                    : Math.floor((2 * appliancesInDropdownMenu.length) / 3) -
                      1);
                i += 1
            ) {
                const appliancesTemplate = new AppliancesDropdownMenu(
                    appliancesInDropdownMenu[i]
                )
                col2.appendChild(appliancesTemplate.createDropdownMenuItem())
            }

            const col3 = document.createElement('div')
            col3.classList.add('col-12', 'col-md-4')
            for (
                let i = Math.ceil((2 * appliancesInDropdownMenu.length) / 3);
                i <= Math.floor(appliancesInDropdownMenu.length);
                i += 1
            ) {
                const appliancesTemplate = new AppliancesDropdownMenu(
                    appliancesInDropdownMenu[i]
                )
                col3.appendChild(appliancesTemplate.createDropdownMenuItem())
            }

            row.appendChild(col1)
            row.appendChild(col2)
            row.appendChild(col3)
            this.appliancesWrapper.appendChild(row)
        }
    }

    deleteAppliancesDropdownMenu() {
        this.appliancesWrapper.innerHTML = ''
    }

    addAppliancesSearchInput(searchedKeyword) {
        if (searchedKeyword === ('' || null || undefined)) {
            this.appliancesWrapper.innerHTML +=
                '<input type="text" id="appliances_search" class="dropdown-item" placeholder="Rechercher un appareil">'
        } else {
            this.appliancesWrapper.innerHTML += `<input type="text" id="appliances_search" class="dropdown-item" value="${searchedKeyword}" placeholder="Rechercher un appareil">`
        }
    }

    updateAppliancesDropdownMenu(appliances, searchedKeyword) {
        this.deleteAppliancesDropdownMenu()
        this.addAppliancesSearchInput(searchedKeyword)
        this.displayAppliancesDropdownMenu(appliances)
        this.createEventsOnAppliancesSearchInput()
        this.createEventsOnAppliancesItems()
        const input = document.getElementById('appliances_search')
        const end = input.value.length
        input.setSelectionRange(end, end)
        input.focus()
    }

    displayUstensilsDropdownMenu(ustensilsInDropdownMenu) {
        if (ustensilsInDropdownMenu.length < 10) {
            ustensilsInDropdownMenu.forEach((ustensil) => {
                const ustensilsTemplate = new UstensilsDropdownMenu(ustensil)
                this.ustensilsWrapper.appendChild(
                    ustensilsTemplate.createDropdownMenuItem()
                )
            })
        } else {
            const row = document.createElement('div')
            row.classList.add('row')

            const col1 = document.createElement('div')
            col1.classList.add('col-12', 'col-md-4')
            for (
                let i = 0;
                i <=
                (ustensilsInDropdownMenu.length % 3 !== 0
                    ? Math.floor(ustensilsInDropdownMenu.length / 3)
                    : Math.floor(ustensilsInDropdownMenu.length / 3) - 1);
                i += 1
            ) {
                const ustensilsTemplate = new UstensilsDropdownMenu(
                    ustensilsInDropdownMenu[i]
                )
                col1.appendChild(ustensilsTemplate.createDropdownMenuItem())
            }

            const col2 = document.createElement('div')
            col2.classList.add('col-12', 'col-md-4')
            for (
                let i = Math.ceil(ustensilsInDropdownMenu.length / 3);
                i <=
                (ustensilsInDropdownMenu.length % 3 !== 0
                    ? Math.floor((2 * ustensilsInDropdownMenu.length) / 3)
                    : Math.floor((2 * ustensilsInDropdownMenu.length) / 3) - 1);
                i += 1
            ) {
                const ustensilsTemplate = new UstensilsDropdownMenu(
                    ustensilsInDropdownMenu[i]
                )
                col2.appendChild(ustensilsTemplate.createDropdownMenuItem())
            }

            const col3 = document.createElement('div')
            col3.classList.add('col-12', 'col-md-4')
            for (
                let i = Math.ceil((2 * ustensilsInDropdownMenu.length) / 3);
                i <= Math.floor(ustensilsInDropdownMenu.length);
                i += 1
            ) {
                const ustensilsTemplate = new UstensilsDropdownMenu(
                    ustensilsInDropdownMenu[i]
                )
                col3.appendChild(ustensilsTemplate.createDropdownMenuItem())
            }

            row.appendChild(col1)
            row.appendChild(col2)
            row.appendChild(col3)
            this.ustensilsWrapper.appendChild(row)
        }
    }

    deleteUstensilsDropdownMenu() {
        this.ustensilsWrapper.innerHTML = ''
    }

    addUstensilsSearchInput(searchedKeyword) {
        if (searchedKeyword === ('' || null || undefined)) {
            this.ustensilsWrapper.innerHTML +=
                '<input type="text" id="ustensils_search" class="dropdown-item" placeholder="Rechercher un ustensile">'
        } else {
            this.ustensilsWrapper.innerHTML += `<input type="text" id="ustensils_search" class="dropdown-item" value="${searchedKeyword}" placeholder="Rechercher un ustensile">`
        }
    }

    updateUstensilsDropdownMenu(ustensils, searchedKeyword) {
        this.deleteUstensilsDropdownMenu()
        this.addUstensilsSearchInput(searchedKeyword)
        this.displayUstensilsDropdownMenu(ustensils)
        this.createEventsOnUstensilsSearchInput()
        this.createEventsOnUstensilsItems()
        const input = document.getElementById('ustensils_search')
        const end = input.value.length
        input.setSelectionRange(end, end)
        input.focus()
    }

    displayIngredientsDropdownMenu(ingredientsInDropdownMenu) {
        if (ingredientsInDropdownMenu.length < 10) {
            ingredientsInDropdownMenu.forEach((ingredient) => {
                const ingredientsTemplate = new IngredientsDropdownMenu(
                    ingredient
                )
                this.ingredientsWrapper.appendChild(
                    ingredientsTemplate.createDropdownMenuItem()
                )
            })
        } else {
            const row = document.createElement('div')
            row.classList.add('row')

            const col1 = document.createElement('div')
            col1.classList.add('col-12', 'col-md-4')
            for (
                let i = 0;
                i <=
                (ingredientsInDropdownMenu.length % 3 !== 0
                    ? Math.floor(ingredientsInDropdownMenu.length / 3)
                    : Math.floor(ingredientsInDropdownMenu.length / 3) - 1);
                i += 1
            ) {
                const ingredientsTemplate = new IngredientsDropdownMenu(
                    ingredientsInDropdownMenu[i]
                )
                col1.appendChild(ingredientsTemplate.createDropdownMenuItem())
            }

            const col2 = document.createElement('div')
            col2.classList.add('col-12', 'col-md-4')
            for (
                let i = Math.ceil(ingredientsInDropdownMenu.length / 3);
                i <=
                (ingredientsInDropdownMenu.length % 3 !== 0
                    ? Math.floor((2 * ingredientsInDropdownMenu.length) / 3)
                    : Math.floor((2 * ingredientsInDropdownMenu.length) / 3) -
                      1);
                i += 1
            ) {
                const ingredientsTemplate = new IngredientsDropdownMenu(
                    ingredientsInDropdownMenu[i]
                )
                col2.appendChild(ingredientsTemplate.createDropdownMenuItem())
            }

            const col3 = document.createElement('div')
            col3.classList.add('col-12', 'col-md-4')
            for (
                let i = Math.ceil((2 * ingredientsInDropdownMenu.length) / 3);
                i <= Math.floor(ingredientsInDropdownMenu.length);
                i += 1
            ) {
                const ingredientsTemplate = new IngredientsDropdownMenu(
                    ingredientsInDropdownMenu[i]
                )
                col3.appendChild(ingredientsTemplate.createDropdownMenuItem())
            }

            row.appendChild(col1)
            row.appendChild(col2)
            row.appendChild(col3)
            this.ingredientsWrapper.appendChild(row)
        }
    }

    deleteIngredientsDropdownMenu() {
        this.ingredientsWrapper.innerHTML = ''
    }

    addIngredientsSearchInput(searchedKeyword) {
        if (searchedKeyword === ('' || null || undefined)) {
            this.ingredientsWrapper.innerHTML +=
                '<input type="text" id="ingredients_search" class="dropdown-item" placeholder="Rechercher un ingrédient">'
        } else {
            this.ingredientsWrapper.innerHTML += `<input type="text" id="ingredients_search" class="dropdown-item" value="${searchedKeyword}" placeholder="Rechercher un ingrédient">`
        }
    }

    updateIngredientsDropdownMenu(ingredients, searchedKeyword) {
        this.deleteIngredientsDropdownMenu()
        this.addIngredientsSearchInput(searchedKeyword)
        this.displayIngredientsDropdownMenu(ingredients)
        this.createEventsOnIngredientsSearchInput()
        this.createEventsOnIngredientsItems()
        const input = document.getElementById('ingredients_search')
        const end = input.value.length
        input.setSelectionRange(end, end)
        input.focus()
    }

    createEventsOnSearchBar() {
        const input = document.querySelector('.search .input-group input')
        input.addEventListener('input', async (event) => {
            const searchKeyword = event.target.value
            if (searchKeyword.length >= 3) {
                this.searchKeyword = searchKeyword
                this.recipes = await this.search(this.searchKeyword)
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                    this.recipes
                )
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                    this.recipes
                )
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(this.recipes)
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
            } else {
                this.recipes = await this.api.getRecipes()
                this.updateCards(this.recipes)

                const appliancesInDropdownMenu = this.getAppliancesFromRecipes(
                    this.recipes
                )
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu = this.getUstensilsFromRecipes(
                    this.recipes
                )
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(this.recipes)
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
                    const appliancesTags = Array.from(
                        document.querySelectorAll('.appliance_tag')
                    )
                    const applianceTagToDelete = appliancesTags.find(
                        (applianceTag) =>
                            applianceTag.textContent ===
                            `${menuItem.textContent} `
                    )
                    applianceTagToDelete.remove()

                    this.appliancesTags = this.appliancesTags.filter(
                        (appliance) => appliance !== menuItem.textContent
                    )
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
                        `<i class="fa-regular fa-circle-xmark ${this.toKebabCase(
                            menuItem.textContent
                        )}"></i>`
                    appliancesTagsWrapper.appendChild(tag)

                    const closeButton = document.querySelector(
                        `.fa-regular.${this.toKebabCase(menuItem.textContent)}`
                    )
                    closeButton.addEventListener('click', () => {
                        const applianceTagToDelete = closeButton.parentElement
                        applianceTagToDelete.remove()
                        this.appliancesTags = this.appliancesTags.filter(
                            (appliance) => appliance !== menuItem.textContent
                        )
                        const filteredRecipes = this.filterByTags(
                            this.appliancesTags,
                            this.ustensilsTags,
                            this.ingredientsTags
                        )
                        this.updateCards(filteredRecipes)
                        const appliancesInDropdownMenu =
                            this.getAppliancesFromRecipes(filteredRecipes)
                        this.updateAppliancesDropdownMenu(
                            appliancesInDropdownMenu
                        )
                        const ustensilsInDropdownMenu =
                            this.getUstensilsFromRecipes(filteredRecipes)
                        this.updateUstensilsDropdownMenu(
                            ustensilsInDropdownMenu
                        )
                        const ingredientsInDropdownMenu =
                            this.getIngredientsFromRecipes(filteredRecipes)
                        this.updateIngredientsDropdownMenu(
                            ingredientsInDropdownMenu
                        )
                    })

                    this.appliancesTags.push(menuItem.textContent)
                    console.log(this.appliancesTags)
                }
                this.recipes = await this.search(this.searchKeyword)
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                console.log(filteredRecipes)
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu =
                    this.getAppliancesFromRecipes(filteredRecipes)
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu =
                    this.getUstensilsFromRecipes(filteredRecipes)
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(filteredRecipes)
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
                    const ustensilsTags = Array.from(
                        document.querySelectorAll('.ustensil_tag')
                    )
                    const ustensilTagToDelete = ustensilsTags.find(
                        (ustensilTag) =>
                            ustensilTag.textContent ===
                            `${menuItem.textContent} `
                    )
                    ustensilTagToDelete.remove()

                    this.ustensilsTags = this.ustensilsTags.filter(
                        (ustensil) => ustensil !== menuItem.textContent
                    )
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
                        `<i class="fa-regular fa-circle-xmark ${this.toKebabCase(
                            menuItem.textContent
                        )}"></i>`
                    ustensilsTagsWrapper.appendChild(tag)

                    const closeButton = document.querySelector(
                        `.fa-regular.${this.toKebabCase(menuItem.textContent)}`
                    )
                    closeButton.addEventListener('click', () => {
                        const ustensilTagToDelete = closeButton.parentElement
                        ustensilTagToDelete.remove()
                        this.ustensilsTags = this.ustensilsTags.filter(
                            (ustensil) => ustensil !== menuItem.textContent
                        )
                        const filteredRecipes = this.filterByTags(
                            this.appliancesTags,
                            this.ustensilsTags,
                            this.ingredientsTags
                        )
                        this.updateCards(filteredRecipes)
                        const appliancesInDropdownMenu =
                            this.getAppliancesFromRecipes(filteredRecipes)
                        this.updateAppliancesDropdownMenu(
                            appliancesInDropdownMenu
                        )
                        const ustensilsInDropdownMenu =
                            this.getUstensilsFromRecipes(filteredRecipes)
                        this.updateUstensilsDropdownMenu(
                            ustensilsInDropdownMenu
                        )
                        const ingredientsInDropdownMenu =
                            this.getIngredientsFromRecipes(filteredRecipes)
                        this.updateIngredientsDropdownMenu(
                            ingredientsInDropdownMenu
                        )
                    })

                    this.ustensilsTags.push(menuItem.textContent)
                    console.log(this.ustensilsTags)
                }
                this.recipes = await this.search(this.searchKeyword)
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                console.log(filteredRecipes)
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu =
                    this.getAppliancesFromRecipes(filteredRecipes)
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu =
                    this.getUstensilsFromRecipes(filteredRecipes)
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(filteredRecipes)
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
                    const ingredientsTags = Array.from(
                        document.querySelectorAll('.ingredient_tag')
                    )
                    const ingredientTagToDelete = ingredientsTags.find(
                        (ingredientTag) =>
                            ingredientTag.textContent ===
                            `${menuItem.textContent} `
                    )
                    ingredientTagToDelete.remove()

                    this.ingredientsTags = this.ingredientsTags.filter(
                        (ingredient) => ingredient !== menuItem.textContent
                    )
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
                        `<i class="fa-regular fa-circle-xmark ${this.toKebabCase(
                            menuItem.textContent
                        )}"></i>`
                    ingredientsTagsWrapper.appendChild(tag)

                    const closeButton = document.querySelector(
                        `.fa-regular.${this.toKebabCase(menuItem.textContent)}`
                    )
                    closeButton.addEventListener('click', () => {
                        const ingredientTagToDelete = closeButton.parentElement
                        ingredientTagToDelete.remove()
                        this.ingredientsTags = this.ingredientsTags.filter(
                            (ingredient) => ingredient !== menuItem.textContent
                        )
                        const filteredRecipes = this.filterByTags(
                            this.appliancesTags,
                            this.ustensilsTags,
                            this.ingredientsTags
                        )
                        this.updateCards(filteredRecipes)
                        const appliancesInDropdownMenu =
                            this.getAppliancesFromRecipes(filteredRecipes)
                        this.updateAppliancesDropdownMenu(
                            appliancesInDropdownMenu
                        )
                        const ustensilsInDropdownMenu =
                            this.getUstensilsFromRecipes(filteredRecipes)
                        this.updateUstensilsDropdownMenu(
                            ustensilsInDropdownMenu
                        )
                        const ingredientsInDropdownMenu =
                            this.getIngredientsFromRecipes(filteredRecipes)
                        this.updateIngredientsDropdownMenu(
                            ingredientsInDropdownMenu
                        )
                    })

                    this.ingredientsTags.push(menuItem.textContent)
                    console.log(this.ingredientsTags)
                }
                this.recipes = await this.search(this.searchKeyword)
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                console.log(filteredRecipes)
                this.updateCards(filteredRecipes)

                const appliancesInDropdownMenu =
                    this.getAppliancesFromRecipes(filteredRecipes)
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)

                const ustensilsInDropdownMenu =
                    this.getUstensilsFromRecipes(filteredRecipes)
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)

                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(filteredRecipes)
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
            })
        })
    }

    createEventsOnAppliancesSearchInput() {
        const input = document.querySelector('#appliances_dropdown_menu input')
        input.addEventListener('input', () => {
            const searchedAppliances = input.value
            if (searchedAppliances !== '') {
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                const appliancesInDropdownMenu =
                    this.getAppliancesFromRecipes(filteredRecipes)
                const filteredAppliances = appliancesInDropdownMenu.filter(
                    (appliance) => appliance.includes(searchedAppliances)
                )
                this.updateAppliancesDropdownMenu(
                    filteredAppliances,
                    searchedAppliances
                )
            } else {
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                this.updateCards(filteredRecipes)
                const appliancesInDropdownMenu =
                    this.getAppliancesFromRecipes(filteredRecipes)
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)
                const ustensilsInDropdownMenu =
                    this.getUstensilsFromRecipes(filteredRecipes)
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)
                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(filteredRecipes)
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
            }
        })
    }

    createEventsOnUstensilsSearchInput() {
        const input = document.querySelector('#ustensils_dropdown_menu input')
        input.addEventListener('input', () => {
            const searchedUstensils = input.value
            if (searchedUstensils !== '') {
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                const ustensilsInDropdownMenu =
                    this.getUstensilsFromRecipes(filteredRecipes)
                const filteredUstensils = ustensilsInDropdownMenu.filter(
                    (ustensil) => ustensil.includes(searchedUstensils)
                )
                this.updateUstensilsDropdownMenu(
                    filteredUstensils,
                    searchedUstensils
                )
            } else {
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                this.updateCards(filteredRecipes)
                const appliancesInDropdownMenu =
                    this.getAppliancesFromRecipes(filteredRecipes)
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)
                const ustensilsInDropdownMenu =
                    this.getUstensilsFromRecipes(filteredRecipes)
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)
                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(filteredRecipes)
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
            }
        })
    }

    createEventsOnIngredientsSearchInput() {
        const input = document.querySelector('#ingredients_dropdown_menu input')
        input.addEventListener('input', () => {
            const searchedIngredients = input.value
            if (searchedIngredients !== '') {
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(filteredRecipes)
                const filteredIngredients = ingredientsInDropdownMenu.filter(
                    (ingredient) => ingredient.includes(searchedIngredients)
                )
                this.updateIngredientsDropdownMenu(
                    filteredIngredients,
                    searchedIngredients
                )
            } else {
                const filteredRecipes = this.filterByTags(
                    this.appliancesTags,
                    this.ustensilsTags,
                    this.ingredientsTags
                )
                this.updateCards(filteredRecipes)
                const appliancesInDropdownMenu =
                    this.getAppliancesFromRecipes(filteredRecipes)
                this.updateAppliancesDropdownMenu(appliancesInDropdownMenu)
                const ustensilsInDropdownMenu =
                    this.getUstensilsFromRecipes(filteredRecipes)
                this.updateUstensilsDropdownMenu(ustensilsInDropdownMenu)
                const ingredientsInDropdownMenu =
                    this.getIngredientsFromRecipes(filteredRecipes)
                this.updateIngredientsDropdownMenu(ingredientsInDropdownMenu)
            }
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
            .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .join('-')
            .toLowerCase()
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
