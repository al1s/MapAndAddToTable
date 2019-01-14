/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
let listenForClicks = () => {
  let btnSubmit = document.querySelector('#btnSubmit');
  let textAreaElm = document.querySelector('#textAreaElm');
  btnSubmit.addEventListener('click', () => {
    // 1. Read all what was pasted into the textarea;
    let textInput = textAreaElm.value;
    // 2. Parse it into a JSON;
    let re = /(\d+)[\s|,|.](\w+\s\w+)/g;
    let idToNamesMapping = {};
    let searchResult;
    while ((searchResult = re.exec(textInput)) !== null) {
      idToNamesMapping[searchResult[1]] = searchResult[2];
    }
    console.log({ idToNamesMapping });
    // 3. Sent a message with the JSON to the injected script
    window.browser.tabs.query({ active: true, currentWindow: true }, tabs =>
      window.browser.tabs.sendMessage(tabs[0].id, {
        data: JSON.stringify(idToNamesMapping)
      })
    );
  });
};
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 */
window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();
window.browser.tabs.executeScript({ file: '/js/content.js' });
listenForClicks();
