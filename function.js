const main = document.querySelector("#main");
const select = document.querySelector(".select");
const searchBtn = document.querySelector(".searchBtn");
const input = document.querySelector("input");
let articles; //記事一覧

//初期読み込み
async function init() {
  try {
    const response = await fetch("json/articles.json");
    articles = await response.json();
    renderArticles(articles);
    addCategory(articles);
  } catch (error) {
    console.error("jsonの読み込みに失敗", error);
  }
}

//記事を作成、要素を追加
function renderArticles(articles) {
  articles.forEach((article) => {
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

    flexDiv.append(date, category);

    newDiv.append(title, flexDiv, content);
    main.prepend(newDiv);
  });
}

//カテゴリーを抽出
function addCategory(articles) {
  const categoryArray = [];

  articles.forEach((article) => {
    categoryArray.push(article.category);
  });

  const extractedCategoryArray = Array.from(new Set(categoryArray));

  extractedCategoryArray.forEach((category) => {
    const newOption = document.createElement("option");
    newOption.setAttribute("value", category);
    newOption.textContent = category;
    select.append(newOption);
  });
}

//最初に記事を読み込む
init();

//カテゴリー選択時
select.addEventListener("change", () => {
  //１度記事を消去
  deleteHtml();
  const selectedValue = select.value;
  //すべてを選択したら全記事表示
  if (selectedValue === "すべて") {
    renderArticles(articles);
  } else {
    //各カテゴリーを選択した場合
    const copiedArticles = [...articles];
    const filteredArticles = copiedArticles.filter((article) => {
      return article.category === selectedValue;
    });

    renderArticles(filteredArticles);
  }
});

//検索機能
searchBtn.addEventListener("click", () => {
  //１度記事と検索０ヒット文を消去
  deleteHtml();

  const searchWord = input.value; //検索ワード
  //空白の場合全て表示
  if (searchWord === "") {
    renderArticles(articles);
    return;
  }

  const copiedArticles = [...articles];
  const filteredArticles = copiedArticles.filter((article) => {
    return article.content.includes(searchWord);
  });

  if (filteredArticles.length > 0) {
    renderArticles(filteredArticles);
  } else {
    const notHitTxt = document.createElement("p");
    notHitTxt.classList.add("notHitTxt");
    notHitTxt.textContent =
      "すみません、その検索ワードに関連する記事はないので他を当たってください";
    main.append(notHitTxt);
  }
});

//検索、カテゴリー時の初期化
function deleteHtml() {
  const notHitTxt = document.querySelector(".notHitTxt");
  if (notHitTxt != null) {
    notHitTxt.remove();
  }
  const articlesDiv = document.querySelectorAll(".article");
  articlesDiv.forEach((article) => {
    article.remove();
  });
}
