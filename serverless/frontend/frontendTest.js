document.getElementById('getHelloBtn').addEventListener('click', () => {
    const url = CONFIG.API_URL_BASE + 'helloHandler';

    axios
        .get(url)
        .then((response) => {
            console.log(response.data);
            alert(response.data.message);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});
