"use strict";

const currentButton = document.getElementById("current");
const privateButton = document.getElementById("private");
const statusMessage = document.getElementById("status");

async function launch(openWindow, errorMessage) {
  if (currentButton.disabled) return;
  currentButton.disabled = true;
  privateButton.disabled = true;
  statusMessage.textContent = "";
  try {
    await openWindow();
    window.close();
  } catch {
    statusMessage.textContent = errorMessage;
    currentButton.disabled = false;
    privateButton.disabled = false;
  }
}

currentButton.addEventListener("click", () => launch(
  () => chrome.tabs.create({ url: "https://chatgpt.com/" }),
  "打开失败，请在地址栏输入 chatgpt.com。"
));

privateButton.addEventListener("click", () => launch(
  () => chrome.windows.create({ url: "https://chatgpt.com/auth/login", incognito: true }),
  "无法打开无痕窗口。请检查 Chrome 的无痕模式设置，或使用单独的 Chrome 个人资料登录。"
));
