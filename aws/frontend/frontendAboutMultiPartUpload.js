document.getElementById('abortUploadBtn').addEventListener('click', () => {
    const multipartInput_fileInput = document.getElementById('multipartInput');
    const file = multipartInput_fileInput.files[0];
    const fileName = file.name;
    const uploadId = sessionStorage.getItem('uploadId');
    const url = CONFIG.API_URL;
    console.log({ fileName: fileName, uploadId: uploadId });
    axios
        .post(`${url}/abortUpload`, { fileName: fileName, uploadId: uploadId })
        .then((r) => console.log(r))
        .catch((err) => console.error(err));
    clearInterval();
});