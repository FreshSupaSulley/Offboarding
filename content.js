const TOP_SPEED = 15;
const MAX_IFRAME_ATTEMPTS = 5;
const POLL_INTERVAL = 2000;

let attempts = 0;

console.log("INJECTED");

const interval = setInterval(() => {
  attempts++;

  let targetDoc = null;

  const iframe = document.querySelector("iframe");

  // Case 1: iframe exists and is ready
  if (iframe) {
    const doc = iframe.contentWindow?.document;

    if (!doc || !doc.body) {
      console.log("iframe found, waiting for document...");
      return;
    }

    targetDoc = doc;
  } else {
    // Case 2: no iframe yet
    if (attempts < MAX_IFRAME_ATTEMPTS) {
      console.log("Waiting for iframe...");
      return;
    }

    console.log("No iframe found, falling back to main document");
    targetDoc = document;
  }

  // Unified logic: search in whichever document we decided
  const elements = targetDoc.getElementsByClassName("menu-choice");

  if (elements.length > 0) {
    const first = elements[0];

    console.log("Found elements:", elements);

    first.setAttribute("data-speed", TOP_SPEED);

    if (first.lastElementChild) {
      first.lastElementChild.innerHTML = `${TOP_SPEED}`;
    }

    clearInterval(interval);
  } else {
    console.log("menu-choice not found yet...");
  }
}, 2000);

// Auto-click next button
setInterval(() => {
  const iframe = document.querySelector("iframe");
  const doc = iframe?.contentWindow?.document;
  const btn = doc?.querySelector("button#next");
  if (btn?.getAttribute("aria-disabled") === "false") btn.click();
}, POLL_INTERVAL);
