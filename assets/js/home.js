$(function () {
  // owl carousel script starts
  if ($("#main-banner-carousel").length) {
    $("#main-banner-carousel").owlCarousel({
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
  }
});

// Carousel




// var api_url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=9b0c5f77afb34a33b22cda3433662b79`;

async function getapi(options) {
  return axios.request(options).then(function (response) {
    return response.data
  }).catch(function (error) {
    return error
  });
}
// Calling that async function
var carousel = $("#main-banner-carousel");
var options = {
  method: 'GET',
  url: 'https://api.newscatcherapi.com/v2/search',
  params: {q: 'Sports', lang: 'en', sort_by: 'relevancy', page: '1'},
  headers: {
    'x-api-key': 'Ng18KsuCHLvYztP-gx8x9_h4E7YxClMhz1itacLE7dU'
  }
};
getapi(options).then((data) => {
  console.log('Data', data)
  let template = "";
  var items = show(data.articles);
  console.log(items)
  for (var item of items) {
    template += item;
  }

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

function show(data) {
  const items = [];
  if (items.length < 4) {
    for (var i = 0; i < 4; i++) {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var date = new Date(data[i].published_date);
      var day = date.getDate();
      var month = months[date.getMonth()];
      var year = date.getFullYear();

      var item = `
      <div class="item">
        <div class="carousel-content-wrapper mb-2">
          <div class="carousel-content">
            <h2 class="font-weight-bold">
              ${data[i].title}
            </h2>
            <h5 class="font-weight-normal m-0">
                ${
          data[i].summary.length > 80
              ? `${data[i].summary.substr(0, 80)}...`
              : data[i].summary
      }
            </h5>
            <p class="text-color m-0 pt-2 d-flex align-items-center">
            <i class="mdi mdi-open-source-initiative mr-2"></i>
              <span class="fs-10 mr-5">${data[i].author}</span>
              <i class="mdi mdi-calendar mr-2"></i>
              <span class="fs-10 mr-1">${month} ${day} , ${year}</span>
            </p>
          </div>
          <div class="carousel-image">
            <img src="${
              data[i].media
                ? data[i].media
                : "https://via.placeholder.com/728x380.png"
            }" alt="" height="100%"/>
          </div>
        </div>
      </div>
    `;
      if (data[i].media) {
        items.push(item);
      }
    }
  }
  return items;
}

// Carousel Right Side

const latest_news = `https://newsdata.io/api/1/news?apikey=pub_15219c58e95ac7a128b0c6e40fc36fce1357d&language=en`;

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
              ${
                results[i].title.length > 50
                  ? `${results[i].title.substr(0, 49)}...`
                  : results[i].title
              }
              
            </a>
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

const world_news =
  "https://newsapi.org/v2/everything?q=art&apiKey=9b0c5f77afb34a33b22cda3433662b79&pageSize=20";

getapi(world_news).then((data) => {
  let template = "";
  const results = data.articles;
  let count = 0;
  for (let i = 0; i < results.length; i++) {
    if (
      results[i].urlToImage &&
      results[i].author &&
      !results[i].urlToImage.includes("i.kinja-img.com")
    ) {
      const item = `
        <div class="col-lg-3 col-sm-6 grid-margin mb-5 mb-sm-2">
          <div class="position-relative image-hover" style="max-height: 200px">
          <a href="${
            results[i].url
          }" class="d-block text-decoration-none text-dark" target="_blank">
            <img
              src="${results[i].urlToImage}"
              class="mh-100"
              alt="world-news"
            />
            </a>
            <span class="thumb-title">${
              results[i].author.length > 17
                ? `${results[i].author.substr(0, 17)} ...`
                : `${results[i].author}`
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

const top_headlines =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=9b0c5f77afb34a33b22cda3433662b79&pageSize=25";

getapi(top_headlines).then(({ articles }) => {
  let template = "";
  let count = 0;
  for (let i = 2; i < 11; i++) {
    if (
      articles[i].urlToImage &&
      articles[i].author &&
      !articles[i].urlToImage.includes("i.kinja-img.com") &&
      count === 0
    ) {
      const popular_news = `
                <div class="position-relative image-hover">
                <a href="${
                  articles[0].url
                }" class="d-block text-decoration-none text-dark" target="_blank">
                  <img
                    src="${articles[0].urlToImage}"
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
                </p>`;
      document.getElementById("popular_news_right").innerHTML = popular_news;
      count++;
    }
  }
  count = 0;
  for (let i = 2; i < 11; i++) {
    if (
      articles[i].urlToImage &&
      articles[i].author &&
      !articles[i].urlToImage.includes("i.kinja-img.com")
    ) {
      let item = `
      ${count % 2 === 0 ? '<div class="row">' : ""}
        <div class="col-sm-6 mb-5 mb-sm-2">
            <div class="position-relative image-hover" style="max-height: 200px">
            <a href="${
              articles[i].url
            }" class="d-block text-decoration-none text-dark" target="_blank">
              <img
                src="${articles[i].urlToImage}"
                class="img-fluid"
                alt="world-news"
                />
                </a>
              <span class="thumb-title">
              ${
                articles[i].author.length > 17
                  ? `${articles[i].author.substr(0, 17)} ...`
                  : `${articles[i].author}`
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
  template = "";
  count = 0;

  for (let i = 12; i < articles.length; i++) {
    if (
      articles[i].urlToImage &&
      articles[i].author &&
      !articles[i].urlToImage.includes("i.kinja-img.com")
    ) {
      let item = `
      ${count === 0 || count === 3 ? '<div class="row">' : ""}
                  <div class="col-sm-4 mb-5 mb-sm-2">
                    <div class="position-relative image-hover" style="max-height: 200px">
                    <a href="${
                      articles[i].url
                    }" class="d-block text-decoration-none text-dark" target="_blank">
                      <img
                        src="${articles[i].urlToImage}"
                        class="mh-100"
                        alt="world-news"
                      />
                      </a>
                      <span class="thumb-title">${
                        articles[i].author.length > 17
                          ? `${articles[i].author.substr(0, 17)} ...`
                          : `${articles[i].author}`
                      }</span>
                    </div>
                    <h5 class="font-weight-600 mt-3">
                      ${
                        articles[i].title.length > 50
                          ? `${articles[i].title.substr(0, 50)}...`
                          : `${articles[i].title}`
                      }
                    </h5>
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
});
