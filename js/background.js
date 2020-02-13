(function() {
  function getList() {
    fetch("https://www.softomate.net/ext/employees/list.json", {
      credentials: "same-origin",
      mode: "cors"
    })
      .then(response => response.json())
      .then(response =>
        response.map(item => {
          if (item.domain.match(/^www.*/)) {
            item.domain = item.domain.slice(4);
          }
          return item;
        })
      )
      .then(response => {
        chrome.storage.local.set({ list: response });
      });
  }

  const INTERVAL_DURATION = 30 * 1000;

  getList();
  setInterval(() => getList(), INTERVAL_DURATION);
})();
