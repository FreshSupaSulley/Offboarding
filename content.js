const TOP_SPEED = 15;

const interval = setInterval(() => {
  const iframe = document.querySelector("iframe");

  if (!iframe) {
    console.log("Waiting for iframe...");
    return;
  }

  const doc = iframe.contentWindow?.document;
  if (!doc || !doc.body) {
    console.log("iframe exists, waiting for document...");
    return;
  }

  const elements = doc.body.getElementsByClassName("menu-choice");

  if (elements.length > 0) {
    const first = elements[0];
    console.log("Found elements:", elements);
    first.setAttribute("data-speed", TOP_SPEED);
    first.lastElementChild.innerHTML = `${TOP_SPEED}`;
    clearInterval(interval); // stop polling
  }
}, 2000);
