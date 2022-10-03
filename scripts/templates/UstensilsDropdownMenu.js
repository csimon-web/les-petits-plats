class UstensilsDropdownMenu {
    constructor(ustensil) {
        this.ustensil = ustensil
    }

    createDropdownMenuItem() {
        const item = document.createElement('a')
        item.classList.add('dropdown-item')
        item.setAttribute('href', '#')
        item.textContent = this.ustensil
        return item
    }
}
