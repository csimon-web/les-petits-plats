class AppliancesDropdownMenu {
    constructor(appliance) {
        this.appliance = appliance
    }

    createDropdownMenuItem() {
        const item = document.createElement('span')
        item.classList.add('dropdown-item')
        item.textContent = this.appliance
        return item
    }
}
