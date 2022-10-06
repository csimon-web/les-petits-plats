class UstensilsDropdownMenu {
    constructor(ustensil) {
        this.ustensil = ustensil
    }

    createDropdownMenuItem() {
        const item = document.createElement('span')
        item.classList.add('dropdown-item')
        item.textContent = this.ustensil
        return item
    }
}
