let getFile = () => {
    fetch("model/getFile.php")
        .then((res) => {
            if (!res.ok) {
                console.log("Response not Successful !");
            } else {
                return res.json();
            }
        })
        .then(data => {

            let output = ``;
            if (data[0] === "NoData") {
                output = `
                <h3 style='text-align:center; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); opacity: 0.3;'>No Files ! </h3>
              `;
            } else {
                data.forEach(function (files) {
                    output += `
                <div class="row">
                    <h3>${files.caption}</h3>
                    <span class="actions">
                    <a
                    href="pages/pdf.html?url=resources/${files.caption}"
                    >
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    </span>
                </div>
                `;
                })
            }
            document.getElementById('output').innerHTML = output;
        })
        .catch((err) => console.log(err));
};
let uploadFile = () => {
    let file = document.getElementById("fileUpload");
    // Image File Upload
    const formData = new FormData();
    formData.append("inpFile", file.files[0]);
    formData.append("caption", file.files[0].name);

    let response = false;

    fetch("model/fileUpload.php", {
        method: "POST",
        body: formData,
    })
        .then((res) => {
            if (!res.ok) {
                console.log("Response not Successful !");
                response = false;
            } else {
                response = true;
                return res.text();
            }
        })
        .then((data) => {
            if (response === true) {
                if (data === "File Uploaded !") {
                    alert("PDF Uploaded Successfully !");
                } else {
                    alert("There was a problem in Uploading the PDF !");
                }
            } else if (response === false) {
                alert(
                    "There was a problem in the Server !.. Please Try again later .."
                );
            } else {
                alert("There is a problem ! Please Contact to the Developers.. ");
            }
        })
        .catch((err) => console.log(err));
    setTimeout(() => {
        file.value = "";
    }, 1000);
    setTimeout(() => {
        getFile();
    }, 3000);
};

window.addEventListener('load', () => {
    getFile();
});