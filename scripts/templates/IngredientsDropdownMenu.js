class IngredientsDropdownMenu {
    constructor(ingredients) {
        this.ingredients = ingredients
    }

    createDropdownMenuItem() {
        const item = `
            <a class="dropdown-item" href="#">Action</a>
        `
        return item
    }
}
