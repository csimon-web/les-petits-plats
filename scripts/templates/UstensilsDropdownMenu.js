class UstensilsDropdownMenu {
    constructor(ustensils) {
        this.ustensils = ustensils
    }

    createDropdownMenuItem() {
        const item = `
            <a class="dropdown-item" href="#">Action</a>
        `
        return item
    }
}
