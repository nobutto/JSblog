const main = document.querySelector('#main');

async function init() {
    try {
        const response = await fetch("json/articles.json");
        const articles = await response.json(); 
        renderArticles(articles);
    }
    catch (error) {
        console.error("jsonの読み込みに失敗",error);
    }
}

function renderArticles(articles) {
    articles.forEach(article => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("article");

        const flexDiv = document.createElement("div");
        flexDiv.classList.add("flex");

        const title = document.createElement("h2");
        title.textContent = article.title;
        title.classList.add("title");

        const category = document.createElement("p");
        category.textContent = article.category;
        category.classList.add("category");

        const date = document.createElement("p");
        date.textContent = article.date;
        date.classList.add("date");

        const content = document.createElement("p");
        content.textContent = article.content;
        content.classList.add("content");

        flexDiv.append(date,category);

        newDiv.append(title,flexDiv,content);
        main.prepend(newDiv)
    });
}

init();

