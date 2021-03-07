var Web = {
    async Get(url){
        return fetch(url)
        .then(response => response.text())
        .then(data => data);
    }
}