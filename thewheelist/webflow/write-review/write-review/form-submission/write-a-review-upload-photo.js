{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" referrerpolicy="no-referrer"></script>
<label for="myfile">Select a file:</label>
<input type="file" id="imageFile"> */}


(function () {
    const fileInput = document.getElementById('imageFile')
    fileInput.addEventListener('change', function (event) {
        let file = fileInput.files[0];
        let fileName = file.name;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        axios.get('https://pitwall.thewheelist.com/session/token')
            .then(function (response) {
                const CSRSToken = response.data;
                const arrayStr = reader.result;
                console.log(arrayStr);
                console.log(CSRSToken);
                return axios.post('https://pitwall.thewheelist.com/jsonapi/comment/car_reviews/field_photo', arrayStr, {
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/octet-stream',
                        'X-CSRF-Token': CSRSToken,
                        'Content-Disposition': 'file; filename="' + fileName + '"',
                    }
                })
            })
            .then(function (response) {
                const imageID = response.data.data.id;
                const fieldImageId = document.getElementById('field_image_id');
                fieldImageId.value = imageID;
            });
    });
})();