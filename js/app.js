if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => { })
        .catch(errr => console.log('Service Worker NOT Registered !' + errr));
}


let deferredPrompt;
function checkInstalled() {
    if (checkCookie("installed")) {
    } else {
        setCookie("installed", "false");
    }
};
window.addEventListener('load', () => {
    checkInstalled();
    if (checkCookie("showADTO")) {
        return;
    } else {
        setCookie("showADTO", "true");
    };
});


window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setCookie("installed", "false");
    checkInstalled();
    if (getCookie("showADTO") === "true") {
        elem('installedEvent').classList.add("msgShow");
    } else if (getCookie("showADTO") === "false") {
        elem('installedEvent').classList.remove("msgShow");
    }
});

function addToHome() {
    elem('installedEvent').classList.remove('msgShow');
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
            shMsg(`
                <p class='sm-text'>Please Wait... <br /> Your App is being Installed</p>
            `);
        } else {
            deferredPrompt = null;
            shMsg(`
                <p class='sm-text'>It's fine if you don't want to install the app <br /> you can still use this web version</p>
            `);
            elem('installedEvent').classList.remove('msgShow');
        }
    });
}

window.addEventListener('appinstalled', (evt) => {
    remMsg('messageBox');
    shMsg(`
        <p class='sm-text'>Your App has been successfully Installed !</p>
    `);
    setTimeout(() => {
        remMsg('messageBox');
        setCookie("installed", "true");
    }, 3000);
    setCookie("showADTO", "false");
    checkInstalled();
});

function neverShow() {
    if (checkCookie("showADTO") === true) {
        setCookie("showADTO", "false");
    } else {
        setCookie("showADTO", "true");
    };
};

function showAgain() {
    setCookie("showADTO", "true");
    elem('installedEvent').classList.add('msgShow');
};