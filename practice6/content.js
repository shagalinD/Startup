// Слушаем сообщения от расширения
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkPage") {
        // Анализируем структуру страницы
        const hasLoginForm = document.querySelector('input[type="password"]') !== null;
        sendResponse({ hasLoginForm, url: window.location.href });
    }
});