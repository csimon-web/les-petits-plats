class IngredientsDropdownMenu {
    constructor(ingredient) {
        this.ingredient = ingredient
    }

    createDropdownMenuItem() {
        const item = document.createElement('span')
        item.classList.add('dropdown-item')
        item.textContent = this.ingredient
        return item
    }
}
