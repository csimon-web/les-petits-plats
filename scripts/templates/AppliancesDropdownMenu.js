class AppliancesDropdownMenu {
    constructor(appliances) {
        this.appliances = appliances
    }

    createDropdownMenuItem() {
        const item = `
            <a class="dropdown-item" href="#">Action</a>
        `
        return item
    }
}
