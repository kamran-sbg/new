let btn = document.querySelector("#btnh");
let p = document.querySelector("#result");
let uni = "https://universities.hipolabs.com/search?name=";

btn.addEventListener("click", async () => {
  let inp = document.querySelector("#inph").value;
  let clgarr = await getUniName(inp);
  if (Array.isArray(clgarr)) {
    show(clgarr);
  } else {
    p.innerText = "No results found or invalid data.";
  }
});

function show(clgarr) {
  p.innerText = "";
  for (let clg of clgarr) {
    console.log(clg);
    let li = document.createElement("li");
    let h3 = document.createElement("p");
    let h2 = document.querySelector("h2");
    li.innerText = clg.name || "No name available";
    h2.innerText = clg.country || "No country available";
    h3.style.color = "blue";
    h3.innerText = clg.web_pages
      ? clg.web_pages.join(", ")
      : "No web pages available";
    p.append(li, h3);
  }
}

async function getUniName(inp) {
  try {
    let res = await axios.get(uni + inp);
    let data = res.data;
    return data; // Make sure this is an array
  } catch (e) {
    console.log(e);
    return []; // Return an empty array on error
  }
}
