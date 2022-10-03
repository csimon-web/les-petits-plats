class IngredientsDropdownMenu {
    constructor(ingredient) {
        this.ingredient = ingredient
    }

    createDropdownMenuItem() {
        const item = document.createElement('a')
        item.classList.add('dropdown-item')
        item.setAttribute('href', '#')
        item.textContent = this.ingredient
        return item
    }
}
