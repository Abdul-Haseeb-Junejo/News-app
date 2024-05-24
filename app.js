let searchBar = document.getElementById('searchBar');
let cardsDiv = document.querySelector('.cards') ;


// var defaultNews =()=>{  
// return new Promise(function(resolve,reject){
//     fetch(`
//     https://newsdata.io/api/1/latest?apikey=pub_447088ff917e919eaf9ceebaec20f88529127&q=pakistan&language=en`
//     )
//     .then(function(res){
//         return res.json();
//     })
//     .then(function(res){
//         resolve(res);
//         displayNews(res);
//         console.log(res);
//     })
//     .catch(function(err){
//         reject(err);
//         console.log("error",err)
//     })
// })
// }

var searchNews = () => {
    return new Promise(function(resolve, reject) {
        fetch(`https://newsdata.io/api/1/latest?apikey=pub_447088ff917e919eaf9ceebaec20f88529127&q=${searchBar.value.toLowerCase().trim()}&language=en`)
            .then(function(res) {
                return res.json();
            })
            .then(function(res) {
                resolve(res);
                displayNews(res);
                console.log(res);
            })
            .catch(function(err) {
                reject(err);
                console.log("error", err);
            });
    });
}

var displayNews = (data) => {
    if (data.results && Array.isArray(data.results)) {
        const uniqueNewsItem = {};
        console.log("unique", uniqueNewsItem);

        cardsDiv.innerHTML = "";

        data.results.forEach(newsItem => {
            console.log("newsItem", newsItem);
            const newsTitle = newsItem.title || "No Title has provided";
            const newsImg = newsItem.image_url || "./img/newsimg.jpg"; // Updated to use the default image if image_url is null
            const description = newsItem.description || "No Description has provided";
            const visitLink = newsItem.link || "#";
            const truncatTitle = newsTitle.slice(0, 100) + "...";
            const truncatDescription = description.slice(0, 100) + "...";

            if (!uniqueNewsItem[newsTitle]) {
                uniqueNewsItem[newsTitle] = true;

                cardsDiv.innerHTML += `
                <div class="cardDesc1">
                    <div class="cardImg">
                        <img src="${newsImg}" alt="">
                    </div>
                    <div class="descriptionDiv">
                        <h5 class="cardTitle">${truncatTitle}</h5>
                        <p>${truncatDescription}</p>
                        <a href="${visitLink}" target="_blank"><button>Visit Website</button></a> 
                    </div>
                </div>`;
            }
        });
    } else {
        newsCard.innerHTML = "<p>No news items found.</p>";
    }
}



