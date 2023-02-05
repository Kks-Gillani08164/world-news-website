// Drop Down
function create_custom_dropdowns() {
    $("select").each(function (i, select) {
        if (!$(this).next().hasClass("dropdown-select")) {
            $(this).after(
                '<div class="dropdown-select wide ' +
                ($(this).attr("class") || "") +
                '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>'
            );
            var dropdown = $(this).next();
            var options = $(select).find("option");
            var selected = $(this).find("option:selected");
            dropdown
                .find(".current")
                .html(selected.data("display-text") || selected.text());
            options.each(function (j, o) {
                var display = $(o).data("display-text") || "";
                dropdown
                    .find("ul")
                    .append(
                        '<li class="option ' +
                        ($(o).is(":selected") ? "selected" : "") +
                        '" data-value="' +
                        $(o).val() +
                        '" data-display-text="' +
                        display +
                        '">' +
                        $(o).text() +
                        "</li>"
                    );
            });
        }
    });

    $(".dropdown-select ul").before(
        '<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text" placeholder="Search country ..."></div>'
    );
}

// Event listeners

// Open/close
$(document).on("click", ".dropdown-select", function (event) {
    if ($(event.target).hasClass("dd-searchbox")) {
        return;
    }
    $(".dropdown-select").not($(this)).removeClass("open");
    $(this).toggleClass("open");
    if ($(this).hasClass("open")) {
        $(this).find(".option").attr("tabindex", 0);
        $(this).find(".selected").focus();
    } else {
        $(this).find(".option").removeAttr("tabindex");
        $(this).focus();
    }
});

// Close when clicking outside
$(document).on("click", function (event) {
    if ($(event.target).closest(".dropdown-select").length === 0) {
        $(".dropdown-select").removeClass("open");
        $(".dropdown-select .option").removeAttr("tabindex");
    }
    event.stopPropagation();
});

function filter() {
    var valThis = $("#txtSearchValue").val();
    $(".dropdown-select ul > li").each(function () {
        var text = $(this).text();
        text.toLowerCase().indexOf(valThis.toLowerCase()) > -1
            ? $(this).show()
            : $(this).hide();
    });
}

// Search
let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
async function getapi(url) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    const {results} = await response.json();

    let template = ''
    results.forEach(news => {
        if(news.pubDate && news.creator && news.category && news.title) {
            const date = new Date(news?.pubDate)
            const item = `
        <div class="world_news_card">
            <div class="d-flex justify-content-between px-5 mt-4 mb-2">
              <p class="world_news_card_total">${news.creator[0]}</p>
              <p class="world_news_card_category text-capitalize">${news.category[0]}</p>
           </div>
           <h3 class="px-4">${news?.title.length > 67 ? `${news?.title.substr(0, 67)}...` : news?.title}</h3>
           <p class="px-4 mb-4 world_news_card_date">${new Intl.DateTimeFormat('en-US', dateOptions).format(date)}</p>
        </div>
        `
            template += item
        }
    })

    document.getElementById('world_news_live').innerHTML = template || 'No news found ...'
}

// Option click
$(document).on("click", ".dropdown-select .option", function (event) {
    $(this).closest(".list").find(".selected").removeClass("selected");
    $(this).addClass("selected");
    var text = $(this).data("display-text") || $(this).text();
    $(this).closest(".dropdown-select").find(".current").text(text);
    $(this)
        .closest(".dropdown-select")
        .prev("select")
        .val($(this).data("value"))
        .trigger("change");

    // API Call
    const countryCode = $(this).data("value")
    const api_url =
        `https://newsdata.io/api/1/news?apikey=pub_15219c58e95ac7a128b0c6e40fc36fce1357d&country=${countryCode}&category=science,sports,technology,top,world`
    getapi(api_url)
});

$(window).on('load', function(){
    // API Call
    const countryCode = 'au'
    const api_url =
        `https://newsdata.io/api/1/news?apikey=pub_15219c58e95ac7a128b0c6e40fc36fce1357d&country=${countryCode}&category=science,sports,technology,top,world`
    getapi(api_url)
});

$(document).ready(function () {
    create_custom_dropdowns();
});
