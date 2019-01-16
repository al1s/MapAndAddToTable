(function() {
  function replaceIds(objectWithMapping) {
    let idToNamesMapping = JSON.parse(objectWithMapping);
    // let allIdsOfInterestOnPage = document.querySelectorAll(
    // 'div.socrata-table tr td:first-child'
    // );
    let allIdsOfInterestOnPage = document.querySelectorAll('td.body__sell');

    allIdsOfInterestOnPage.forEach(elm => {
      let elmInnerText = elm.querySelector('div').innerText;
      elm.innerHTML =
        elm.innerHTML + `<div>${idToNamesMapping[elmInnerText]}</div>`;
    });
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  console.log('Content script started');
  window.browser = (function() {
    return window.msBrowser || window.browser || window.chrome;
  })();
  console.log(window.browser);
  window.browser.runtime.onMessage.addListener(message => {
    console.log('Get message from popup');
    replaceIds(message.data);
  });
})();
