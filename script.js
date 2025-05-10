function copyLink(index) {
  switch (index) {
    case 2:
      window.open("https://www.instagram.com/mabylife2021/", "_blank");
      break;
    case 3:
      window.open("https://line.me/ti/p/glWJc_iuc6", "_blank");
      break;
    case 4:
      window.open("https://steamcommunity.com/profiles/76561199215438806/", "_blank");
      break;
  }
}

const text = "mabylife";
const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
  discordCopied();
};

const text1 = "970520h@gmail.com";
const copyContent1 = async () => {
  try {
    await navigator.clipboard.writeText(text1);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
  gmailCopied();
};

function discordCopied() {
  const discordButton = document.getElementById("dcbtn");
  discordButton.querySelector("span").innerText = "Copied!";
  setTimeout(() => {
    discordButton.querySelector("span").innerText = "Discord";
  }, 2000);
}

function gmailCopied() {
  const discordButton = document.getElementById("gmbtn");
  discordButton.querySelector("span").innerText = "Copied!";
  setTimeout(() => {
    discordButton.querySelector("span").innerText = "970520h@gmail.com";
  }, 2000);
}
