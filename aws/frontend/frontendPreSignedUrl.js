document.getElementById('presignedUrlBtn').addEventListener('click', () => {
    const presignedUrl_fileInput = document.getElementById('presignedUrl');
    const file = presignedUrl_fileInput.files[0];
    const fileName = file.name;

    const url = CONFIG.API_URL_BASE + "getSignedUrl";

    axios
        .post(url, { fileName: fileName })
        .then((r) => {
            console.log(r);
            const url = r.data.preSignedUrl;
            axios.put(url, file).then((r) => console.log(r)).catch((err) => console.error(err));
        })
        .catch((err) => {
            console.error(err);
        });
});