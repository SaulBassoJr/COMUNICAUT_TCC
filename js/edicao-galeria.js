document.addEventListener("DOMContentLoaded", function () {
    const ulElement = document.getElementById("ulElement");
    const modalContainer = document.querySelector(".modal-container");
    const addCardBtn = document.getElementById("addCardBtn");
    const closeButton = document.getElementById("closeButton");
    const imgPreview = document.getElementById("imgPreview");
    const fileInput = document.getElementById("fileInput");
    const colorPicker = document.getElementById("colorPicker");
    const titleInput = document.getElementById("titleInput");
    const addButton = document.getElementById("addButton");
    const titlePreview = document.getElementById("titlePreview");
    const audioInput = document.getElementById("audioInput");
    const playPauseButton = document.getElementById("playPauseButton");
    const audioElement = document.getElementById("audioElement");
    const audioControls = document.getElementById("audioControls");
    const audioNameDisplay = document.getElementById("audioNameDisplay");
    const resetAllButton = document.getElementById("resetAllButton");
    
    let audioPlaying = false;

    let currentCardInfo = {
        imgSrc: "",
        backgroundColor: "white",
        title: "Título da imagem",
        audioSrc: "",
        audioName: ""
    };

    function resetCardCustomization() {
        imgPreview.src = "./src/imagens/placeholder.png";
        imgPreview.style.backgroundColor = "white";
        titlePreview.textContent = "Título da imagem";
        titleInput.value = "";
        fileInput.value = "";
        colorPicker.value = "#ffffff";
        audioElement.src = "";
        audioNameDisplay.textContent = "";
        audioControls.style.display = "none";
        audioInput.value = "";
        playPauseButton.textContent = "Reproduzir";
        currentCardInfo = {
            imgSrc: "",
            backgroundColor: "white",
            title: "Título da imagem",
            audioSrc: "",
            audioName: ""
        };
    }

    addCardBtn.addEventListener("click", function () {
        modalContainer.style.display = "block";
        resetCardCustomization();
    });

    // Ao clicar em um cartão existente
    ulElement.addEventListener("click", function (event) {
        if (event.target.classList.contains("card-content")) {
            const cardContent = event.target;
            const liElement = cardContent.closest(".editable-card");
            if (liElement) {
                // Obtenha as informações do cartão clicado
                const imgSrc = liElement.querySelector("img").src;
                const bgColor = cardContent.style.backgroundColor;
                const cardTitle = cardContent.querySelector("h1").textContent;
                
                const cardAudioSrc = liElement.querySelector("audio").src;
                const audioName = liElement.querySelector(".audio-name").textContent;

                // Preencha o modal com as informações do cartão clicado
                imgPreview.src = imgSrc;
                imgPreview.style.backgroundColor = bgColor;
                titleInput.value = cardTitle;
                colorPicker.value = bgColor;
                audioElement.src = cardAudioSrc;
                audioNameDisplay.textContent = audioName;
                audioControls.style.display = "block";

                modalContainer.style.display = "block";
            }
        }
    });

    closeButton.addEventListener("click", function () {
        modalContainer.style.display = "none";
    });

    fileInput.addEventListener("change", function (event) {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            imgPreview.src = URL.createObjectURL(selectedImage);
            currentCardInfo.imgSrc = imgPreview.src;
        }
    });

    colorPicker.addEventListener("input", function () {
        imgPreview.style.backgroundColor = colorPicker.value;
        currentCardInfo.backgroundColor = colorPicker.value;
    });

    titleInput.addEventListener("input", function () {
        const title = titleInput.value || "TÍTULO";
        titlePreview.textContent = title;
        currentCardInfo.title = title;
    });

    audioInput.addEventListener("change", function (event) {
        const selectedAudio = event.target.files[0];
        if (selectedAudio) {
            audioElement.src = URL.createObjectURL(selectedAudio);
            audioElement.style.display = "block";
            playPauseButton.style.display = "block";
            currentCardInfo.audioSrc = audioElement.src;
            audioNameDisplay.textContent = selectedAudio.name;
            audioControls.style.display = "block";
        }
    });

    playPauseButton.addEventListener("click", function () {
        if (audioPlaying) {
            audioElement.pause();
            playPauseButton.textContent = "Reproduzir";
        } else {
            audioElement.play();
            playPauseButton.textContent = "Pausar";
        }
        audioPlaying = !audioPlaying;
    });

    addButton.addEventListener("click", function () {
        const title = titleInput.value || "TÍTULO";

        const liElement = document.createElement("li");
        liElement.classList.add("card");
        liElement.classList.add("editable-card");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        cardContent.style.backgroundColor = colorPicker.value;

        const imgElement = document.createElement("img");
        imgElement.src = currentCardInfo.imgSrc;
        imgElement.alt = title;

        const h1Element = document.createElement("h1");
        h1Element.textContent = title;

        cardContent.appendChild(imgElement);
        cardContent.appendChild(h1Element);
        liElement.appendChild(cardContent);
        ulElement.appendChild(liElement);

        modalContainer.style.display = "none";
    });

    resetAllButton.addEventListener("click", function () {
        resetCardCustomization();
    });
});