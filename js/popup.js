chrome.storage.local.get(["list"], result => {
  const list = result.list;

  const siteList = document.getElementsByClassName("site-list-popup___list")[0];

  for (let site of list) {
    const listItem = document.createElement("li");
    listItem.classList.add("site-list-popup__item");
    listItem.innerText = `www.${site.domain}`;
    listItem.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.update(tabs[0].id, { url: `https://${site.domain}` });
      });
    });

    siteList.appendChild(listItem);
  }
});
