document.getElementById('refresh').addEventListener('click', () => {
    generateNewQRCode();
});

async function generateNewQRCode() {
    const sessionToken = generateToken();
    
    showQRCode(sessionToken);
    
    chrome.runtime.sendMessage({ 
        action: "newSession", 
        token: sessionToken 
    });
}