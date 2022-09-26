class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe
    }

    createRecipeCard() {
        const recipeCard = document.createElement('div')
        recipeCard.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3')
        const content = `
            <div class="card mb-4">
            <div class="image">
            </div>
            <div class="description">
                <div class="description__header">
                    <h2 class="description__header__title">
                        ${this.recipe.name}
                    </h2>
                    <p class="description__header__required_time">
                        <span class="fa-regular fa-clock"></span> ${this.recipe.time} min
                    </p>
                </div>
                <div class="description__content">
                    <p class="description__content__ingredients">
                    </p>
                    <p class="description__content__preparation">
                        ${this.recipe.description}
                    </p>
                </div>
            </div>
        </div>
        `
        recipeCard.innerHTML = content
        return recipeCard
    }
}
