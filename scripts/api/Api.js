class Api {
    constructor(url) {
        this.url = url;
    }

    async getRecipesData() {
        const response = await fetch(this.url);
        const data = await response.json();
        return data.recipes;
    }
}
