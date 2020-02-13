(function() {
  const CLOSE_KEY = "isCloseMessagePopup";
  const NOT_CLOSE_COUNTER_KEY = "notClosePopupCounter";

  chrome.storage.local.get(["list"], result => {
    const list = result.list;

    const body = document.getElementsByTagName("body")[0];

    for (let site of list) {
      if (isCurrentDomain(site.domain) && isShowMessage()) {
        const message = document.createElement("div");
        message.classList.add("site-list-popup");
        message.classList.add("site-list-popup-message");

        message.innerHTML = `
          <div class="site-list-popup__header">
            <p>Message</p>
            <span class="site-list-popup__close"></span>
          </div>
          <div class="site-list-popup__wrap">
            <div class="site-list-popup__content">
              <p class="site-list-popup__text">${site.message}</p>
            </div>
          </div>
        `;

        body.appendChild(message);

        setShowMessageCounter();

        const closeButton = document.getElementsByClassName(
          "site-list-popup__close"
        )[0];
        closeButton.addEventListener("click", () => {
          message.style.display = "none";
          window.localStorage.setItem(CLOSE_KEY, true);
        });
      }
    }
  });

  function isCurrentDomain(domain) {
    let currentDomain = document.location.host;
    if (currentDomain.match(/^www.*/)) {
      currentDomain = currentDomain.slice(4);
    }
    return domain === currentDomain;
  }

  function isShowMessage() {
    return !(
      window.localStorage.getItem(CLOSE_KEY) ||
      sessionStorage.getItem(NOT_CLOSE_COUNTER_KEY) == 3
    );
  }

  function setShowMessageCounter() {
    let count = window.sessionStorage.getItem(NOT_CLOSE_COUNTER_KEY);
    count = count ? parseInt(count) : 0;
    count++;
    sessionStorage.setItem(NOT_CLOSE_COUNTER_KEY, count);
  }
})();
