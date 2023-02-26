// Carousel
const api_url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=55d2ce8660f4b3a80d1c625f97eaa4a3`;
// Carousel Right Side
const latest_news = `https://newsdata.io/api/1/news?apikey=pub_15219c58e95ac7a128b0c6e40fc36fce1357d&language=en`;
const world_news = `https://gnews.io/api/v4/search?q=sports&lang=en&country=uk&max=10&apikey=55d2ce8660f4b3a80d1c625f97eaa4a3`;
const top_headlines = `https://gnews.io/api/v4/search?q=politics&lang=en&country=us&max=100&apikey=55d2ce8660f4b3a80d1c625f97eaa4a3`;
const editor = `https://gnews.io/api/v4/search?q=technology&lang=en&country=uk&max=100&apikey=55d2ce8660f4b3a80d1c625f97eaa4a3`;

let dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

// Function to get Data from the API
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  const data = await response.json();
  return data;
}

// Call API and create Carousel on Home Page
getapi(api_url).then((data) => {
  let template = "";
  const items = show(data.articles);
  for (let item of items) {
    template += item;
  }

  // This Code is responsible for Creating Carousel
const carousel = $("#main-banner-carousel");
  carousel.trigger("destroy.owl.carousel");
  carousel.find(".owl-stage-outer").children().unwrap();
  carousel.removeClass("owl-center owl-loaded owl-text-select-on");
  carousel.html(template);
  carousel.owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    autoWidth: false,
    dots: true,
    margin: 0,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      320: {
        items: 1,
      },
    },
  });
});


// This Function receive data and return html element for carousel to show
function show(data) {
  const items = [];
  if (items.length < 4) {
    for (let i = 0; i < 4; i++) {
      const date = new Date(data[i].publishedAt);
      let item = `
      <div class="item">
        <div class="carousel-content-wrapper">
          <div class="w-75 carousel-content p-3">
            <h2 class="font-weight-bold">
              ${
                data[i].title.length > 60
                  ? `${data[i].title.substr(0, 60)}...`
                  : data[i].title
              }
            </h2>
            <h5 class="font-weight-normal m-0">
                ${
                  data[i].description.length > 80
                    ? `${data[i].description.substr(0, 80)}...`
                    : data[i].description
                }
            </h5>
            <p class="text-color m-0 pt-2 d-flex align-items-center">
            <i class="mdi mdi-open-source-initiative mr-2"></i>
              <span class="fs-10 mr-5">${data[i].author}</span>
              <i class="mdi mdi-calendar mr-2"></i>
              <span class="fs-10 mr-1">${new Intl.DateTimeFormat('en-US', dateOptions).format(date)}</span>
            </p>
          </div>
          <div class="carousel-image">
            <img src="${
              data[i].image
                ? data[i].image
                : "https://via.placeholder.com/728x380.png"
            }" alt="" height="100%"/>
          </div>
        </div>
      </div>
    `;
      if (data[i].image) {
        items.push(item);
      }
    }
  }
  return items;
}


// This code is responsible for creating news section right side to the carousel
getapi(latest_news).then((data) => {
  let template = "";
  const results = data.results;
  for (let i = 0; i < 6; i++) {
    if (results[i].source_id) {
      let item = `
      ${i % 2 === 0 ? '<div class="row">' : ""}
      <div class="col-sm-6">
        <div class="py-3 border-bottom">
          <div class="d-flex align-items-center pb-2">
              <img
                src="assets/images/dashboard/Profile_${i + 1}.jpg"
                class="img-xs img-rounded mr-2"
                alt="thumb"
              />
              <span class="fs-12 text-muted text-capitalize">${
                results[i].source_id
              }</span>
              
            </div>
            <p class="fs-14 m-0 font-weight-medium line-height-sm">
            
            <a href="${
              results[i].link
            }" class="d-block text-decoration-none text-dark" target="_blank">
              <h6>
              ${
          results[i].title.length > 50
              ? `${results[i].title.substr(0, 49)}...`
              : results[i].title
                    }
              </h6>
            </a>
            <span class="h6">${new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(results[i].pubDate))}</span>
            </p>
          </div>
        </div>
      ${i % 2 === 1 ? "</div>" : ""}
    `;
      template += item;
    }
  }
  document.getElementById("carousel-right").innerHTML = template;
});

// World News Section
getapi(world_news).then((data) => {
  let template = "";
  const results = data.articles;
  let count = 0;
  for (let i = 0; i < results.length; i++) {
    if (
      results[i].image
    ) {
      let item = `
        <div class="col-lg-3 col-sm-6 grid-margin mb-5 mb-sm-2 scale-up">
          <div class="position-relative image-hover" style="max-height: 200px">
          <a href="${
            results[i].url
          }" class="d-block text-decoration-none text-dark" target="_blank">
            <img
              src="${results[i].image}"
              class="img-fluid"
              alt="world-news"
            />
            </a>
            <span class="thumb-title">${
              results[i].source.name.length > 17
                ? `${results[i].source.name.substr(0, 17)} ...`
                : `${results[i].source.name}`
            }</span>
          </div>
          <h5 class="font-weight-bold mt-3">
            ${
              results[i].title.length > 22
                ? `${results[i].title.substr(0, 22)}...`
                : `${results[i].title}`
            }
          </h5>
          <p class="fs-15 font-weight-normal">
            ${
              results[i].description.length > 50
                ? `${results[i].description.substr(0, 50)}...`
                : `${results[i].description}`
            }
          </p>
          <div class="mb-2">
                <span class="h6">${new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(results[i].publishedAt))}</span>
          </div>
          <a href="${
            results[i].url
          }" target="_blank" class="font-weight-bold text-dark pt-2">
            Read Article
          </a>
        </div>
      `;

      if (count < 4) {
        template += item;
      }
      count++;
    }
  }

  document.getElementById("world_news").innerHTML = template;
});

// Popular News Section
getapi(top_headlines).then(({ articles }) => {
  let template = "";
  let count = 0;
    if (
      articles[0].image &&
      count === 0
    ) {
      const popular_news = `
                <div class="scale-up">
                <div class="position-relative image-hover">
                <a href="${
          articles[0].url
      }" class="d-block text-decoration-none text-dark" target="_blank">
                  <img
                    src="${articles[0].image}"
                    class="img-fluid"
                    alt="world-news"
                  />
                  </a>
                  <span class="thumb-title">NEWS</span>
                </div>
                <h1 class="font-weight-600 mt-3">
                  ${
          articles[0].title.length > 50
              ? `${articles[0].title.substr(0, 50)} ...`
              : `${articles[0].title}`
      }
                </h1>
                <p class="fs-15 font-weight-normal">
                  ${
          articles[0].description.length > 127
              ? `${articles[0].description.substr(0, 127)}...`
              : `${articles[0].description}`
      }
                </p>
                <span class="h6">${new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(articles[0].publishedAt))}</span>
</div>
`;
      document.getElementById("popular_news_right").innerHTML = popular_news;
      count++;
    }

  count = 0;
  for (let i = 2; i < articles.length; i++) {
    if (
      articles[i].image
    ) {
      let item = `
      ${count % 2 === 0 ? '<div class="row">' : ""}
        <div class="col-sm-6 mb-5 mb-sm-2 scale-up">
            <div class="position-relative image-hover" style="max-height: 200px">
            <a href="${
              articles[i].url
            }" class="d-block text-decoration-none text-dark" target="_blank">
              <img
                src="${articles[i].image}"
                class="img-fluid"
                alt="world-news"
                />
                </a>
              <span class="thumb-title">
              ${
                articles[i].source.name.length > 17
                  ? `${articles[i].source.name.substr(0, 17)} ...`
                  : `${articles[i].source.name}`
              }</span>
            </div>
            <h5 class="font-weight-600 mt-3">
              ${
                articles[i].title.length > 22
                  ? `${articles[i].title.substr(0, 22)}...`
                  : `${articles[i].title}`
              }
            </h5>
            <p class="fs-15 font-weight-normal">
              ${
                articles[i].description.length > 45
                  ? `${articles[i].description.substr(0, 45)}...`
                  : `${articles[i].description}`
              }
            </p>
            <span class="h6">${new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(articles[i].publishedAt))}</span>
          </div>
      ${count % 2 === 1 ? "</div>" : ""}
    `;
      if (count < 4) {
        template += item;
        count++;
      }
    }
  }
  document.getElementById("popular_news_left").innerHTML = template;
});


// Editor Choice Section
getapi(editor).then(({ articles }) => {
  let template = "";
  let count = 0;
  console.log(articles)

  for (let i = 0; i < articles.length; i++) {
    if (
      articles[i].image
    ) {
      let item = `
      ${count === 0 || count === 3 ? '<div class="row">' : ""}
                  <div class="col-sm-4 mb-5 mb-sm-2 scale-up">
                    <div class="position-relative image-hover" style="max-height: 200px">
                    <a href="${
                      articles[i].url
                    }" class="d-block text-decoration-none text-dark" target="_blank">
                      <img
                        src="${articles[i].image}"
                        class="img-fluid"
                        alt="world-news"
                      />
                      </a>
                      <span class="thumb-title">${
                        articles[i].source.name.length > 17
                          ? `${articles[i].source.name.substr(0, 17)} ...`
                          : `${articles[i].source.name}`
                      }</span>
                    </div>
                    <h5 class="font-weight-600 mt-3">
                      ${
                        articles[i].title.length > 50
                          ? `${articles[i].title.substr(0, 50)}...`
                          : `${articles[i].title}`
                      }
                    </h5>
                    <span class="h6">${new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(articles[i].publishedAt))}</span>
                  </div>
                  ${count === 2 || count === 5 ? "</div>" : ""}
    `;
      if (count < 6) {
        template += item;
        count++;
      }
    }
  }
  document.getElementById("editor_choice").innerHTML = template;
})
