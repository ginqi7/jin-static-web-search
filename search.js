var idx;

fetch("index.json")
.then(res => res.text())
.then(data => idx = lunr.Index.load(JSON.parse(data)))

var content_map;
fetch("content-map.json")
.then(res => res.json())
.then(data => content_map = data)

window.addEventListener('load', function () {
  const search_a = document.createElement("a");
  search_a.href = "javascript:void(0)";
  search_a.addEventListener("click", showSearchContainer);
  search_a.className = "top-bar-search-btn";
  const search_i = document.createElement("div");
  search_i.className = "icon-search";
  search_a.appendChild(search_i);
  
  var body = document.body
  body.appendChild(search_a);
})


function showSearchContainer () {
  if (document.getElementsByClassName("search-container").length != 0) {
    return
  };
  const search_container = document.createElement("div");
  search_container.className =  "search-container";
  const search_input = document.createElement("input");
  search_input.type = "text";
  search_input.addEventListener("change", showSearchResults);
  const search_results = document.createElement("div");
  search_results.className = "search-results";
  const search_notice = document.createElement("div");
  search_notice.className = "search-notice";
  var body = document.body;
  body.appendChild(search_container);
  body.appendChild(search_input);
  body.appendChild(search_results);
  body.appendChild(search_notice);
}

function showSearchResults (event) {
  const results = idx.search(event.target.value);
  const search_results = document.getElementsByClassName("search-results")[0];
  search_results.textContent = "";
  results.map((result) => content_map[result.ref]).map(buildResultItem)
    .forEach(item => search_results.appendChild(item))
  ;
}

function buildResultItem (result) {
  const item = document.createElement("div");
  item.className = "item";
  const a = document.createElement("a");
  a.className = "item-title";
  a.href = result.id;
  a.textContent = result.title;
  item.appendChild(a);
  return item;
}

