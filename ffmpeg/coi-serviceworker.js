/* coi-serviceworker.js */
/*! coi-serviceworker v0.1.7 - Guido Zuidhof, licensed under MIT */
let coepCredentialless = false;
if (typeof window === 'object') {
    if (window.coi) {
        const { shouldRegister = true, shouldDeregister = false, coepCredentialless: coepCred = false, doReload = true, quiet = false } = window.coi;
        coepCredentialless = coepCred;
        const n = navigator;
        if (shouldRegister) {
            if (!quiet) console.log("COOP/COEP: Registering service worker");
            n.serviceWorker.register(window.document.currentScript.src).then(registration => {
                if (!quiet) console.log("COOP/COEP: Service worker registered", registration);
                if (shouldDeregister) {
                    if (!quiet) console.log("COOP/COEP: Unregistering service worker");
                    registration.unregister();
                }
            }).catch(err => {
                if (!quiet) console.error("COOP/COEP: Service worker registration failed:", err);
            });
            if (doReload) {
                if (!quiet) console.log("COOP/COEP: Reloading page to activate service worker");
                window.location.reload();
            }
        }
    } else {
        fetch(window.document.currentScript.src).then(response => response.text()).then(text => {
            const script = document.createElement('script');
            script.innerText = text;
            document.head.appendChild(script);
            delete window.coi;
            const { coepCredentialless: coepCred = false, doReload = true } = window.coiInit || {};
            coepCredentialless = coepCred;
            if (doReload) {
                if (!window.coiInit?.quiet) console.log("COOP/COEP: Reloading page to activate interceptor");
                window.location.reload();
            }
        });
    }
                  }
