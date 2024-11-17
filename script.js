async function fetchImages() {
  try {
    document.querySelector(
      ".img-container"
    ).innerHTML = `<div class="loading" id="loading-spinner">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
            </div>`;
    const imagesData = await fetch(
      "https://api.unsplash.com/photos?per_page=10&client_id=ce0YZaal3h5sawljMcEtGDCLo7bV4c-xa7Jy2XP9lCs"
    );
    const jsonData = await imagesData.json();
    if (jsonData) {
      if (document.querySelector("#loading-spinner").className === "loading") {
        setTimeout(() => {
          paintUi({ type: "random", rawData: jsonData });
        }, 1000);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

fetchImages();

function paintUi(action) {
  const { type, rawData } = action;
  let imgContainer = document.querySelector(".img-container");
  imgContainer.innerHTML = "";
  if (type === "random") {
    return rawData.forEach(({ urls }) => {
      const { regular } = urls;
      let imgCard = document.createElement("div");
      imgCard.setAttribute("class", "img-card");
      let imgMain = document.createElement("img");
      imgMain.setAttribute("class", "img-main");
      imgMain.setAttribute("src", regular);
      imgMain.setAttribute("alt", "photo");
      imgCard.append(imgMain);
      imgContainer.append(imgCard);
    });
  } else if (type === "search") {
    return rawData.forEach(({ urls }) => {
      const { regular } = urls;
      let imgCard = document.createElement("div");
      imgCard.setAttribute("class", "img-card");
      let imgMain = document.createElement("img");
      imgMain.setAttribute("class", "img-main");
      imgMain.setAttribute("src", regular);
      imgMain.setAttribute("alt", "photo");
      imgCard.append(imgMain);
      imgContainer.append(imgCard);
    });
  }
}

document.querySelector(".search-input").addEventListener("input", (event) => {
  if (event.target.value?.length > 0) {
    fetchSearchedImages(event.target.value);
  } else if (event.target.value?.length === 0) {
    fetchImages();
  }
});

async function fetchSearchedImages(search) {
  try {
    document.querySelector(
      ".img-container"
    ).innerHTML = `<div class="loading" id="loading-spinner">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
    const imagesData = await fetch(
      `https://api.unsplash.com/search/collections?&query=${search}&client_id=ce0YZaal3h5sawljMcEtGDCLo7bV4c-xa7Jy2XP9lCs`
    );
    const jsonData = await imagesData.json();
    const { results } = jsonData;
    let rawData = results.reduce((acc, { preview_photos }) => {
      for (let i = 0; i < preview_photos.length; i++) {
        acc.push(preview_photos[i]);
      }
      return acc;
    }, []);

    if (rawData) {
      if (document.querySelector("#loading-spinner")?.className === "loading") {
        setTimeout(() => {
          return paintUi({ type: "search", rawData });
        }, 1000);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// https://api.unsplash.com/search/collections?&query=ho&client_id=ce0YZaal3h5sawljMcEtGDCLo7bV4c-xa7Jy2XP9lCs

// https://api.unsplash.com/photos/?page=1&client_id=ce0YZaal3h5sawljMcEtGDCLo7bV4c-xa7Jy2XP9lCs
