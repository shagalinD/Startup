chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "newSession") {
        // Сохраняем сессию
        chrome.storage.local.set({ [request.token]: { active: true } });
    }
    
    if (request.action === "qrScanned") {
        // Получены данные от мобильного приложения
        autoFillForm(request.token, request.credentials);
    }
});

async function autoFillForm(token, credentials) {
    // Получаем активную вкладку
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Внедряем скрипт для заполнения формы
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: fillLoginForm,
        args: [credentials]
    });
}

function fillLoginForm(creds) {
    // Эта функция выполняется на странице
    const loginInput = document.querySelector('input[type="email"], input[name="login"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    if (loginInput && passwordInput) {
        loginInput.value = creds.login;
        passwordInput.value = creds.password;
        
        // Автоматически отправляем форму
        const form = passwordInput.closest('form');
        if (form) form.submit();
    }
}