function success(text) {
    try {
        let notyfCss = GM_getResourceText("NOTYF_CSS");
        GM_addStyle(notyfCss);
        let notyf = new Notyf({ duration: 5000 });
        notyf.success(text)
    } catch {
        console.log(text)
    }
}
function error(text) {
    try {
        let notyfCss = GM_getResourceText("NOTYF_CSS");
        GM_addStyle(notyfCss);
        let notyf = new Notyf({ duration: 5000 });
        notyf.error(text)
    } catch {
        console.log(text)
    }
}
function adSpoof(link, tospoof) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: link,
            anonymous: true,
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; GO3C Build/OPM2.171019.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.141 Mobile Safari/537.36",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": "\"Android\"",
                "referrer": tospoof,
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            onload: function (response) {
                if (opendiscordinvite) { window.open("https://discord.gg/hKUUpWyC7G") }
                window.location.href = link;
            },
            onerror: function (error) {
                console.log(error);
            }
        });
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//=========================custom Bypass

//delta
async function delta(cftoken) {
    if (document.title == 'Just a moment...') { return; }
    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    function nohcc() {
        if (document.body.innerHTML.includes("hCaptcha")) {
            return;
        }
    }
    setInterval(nohcc, 1000);
    async function getTurnstileResponse() {
        success('please solve the captcha');
        let res = '';
        while (true) {
            try {
                res = turnstile.getResponse();
                if (res) { break; }
            } catch (e) { }
            await sleep(1000);
        }
        return turnstile.getResponse();
    }

    let id = new URL(window.location.href).searchParams.get('id');
    let linkInfo = await (await fetch('https://api-gateway.platoboost.com/v1/authenticators/8/' + id)).json();
    if (linkInfo.key) {
        success("Bypass Was Success, Key Has Been Copied To Your Clipboard! | " + linkInfo.key);
        GM_setClipboard(linkInfo.key)
        console.log('bypassed successfully');
        return;
    }
    let token = new URL(window.location.href).searchParams.get('tk');
    if (!token) {
        let captchaRequired = linkInfo.captcha;
        let data = await fetch('https://api-gateway.platoboost.com/v1/sessions/auth/8/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "captcha": captchaRequired ? await getTurnstileResponse() : "",
                "type": captchaRequired ? "Turnstile" : ""
            })
        })
        data = await data.json();

        success('1/1 stages completed');
        await sleep(2000);

        let followedUrl = data.redirect;
        console.log(followedUrl)
        let decryptedUrl = await (await fetch(`https://bypass.rblx.workers.dev/delta-decrypt?url=${encodeURIComponent(followedUrl)}`)).text();
        try {
            let encodedDest = new URL(decryptedUrl).searchParams.get('r');
            let followedDest = atob(encodedDest);
            window.location.assign(followedDest);
        } catch {
            error("hCaptcha detected! please solve it by clicking continue and wait after you done.");
            return;
        }
    }
    else {
        await sleep(5000);
        await (await fetch(`https://api-gateway.platoboost.com/v1/sessions/auth/8/${id}/${token}`, {
            method: 'PUT',
        })).json().then(async res => {
            console.log(res)
            if (res.message) {
                window.location.href = `https://gateway.platoboost.com/a/8?id=${id}`
                return
            }
            console.log('bypassed successfully');
            if (opendiscordinvite) { window.open("https://discord.gg/hKUUpWyC7G") }
            await sleep(1000);
            window.location.reload();
        }).catch(e => {
            error(e);
        })
    }
}
//hydrogen
async function hydrogen() {
    function nohcc() {
        if (document.body.innerHTML.includes("hCaptcha")) {
            location.reload();
        }
    }
    setInterval(nohcc, 1000);
    if (document.title == 'Just a moment...') { return; }
    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    async function getTurnstileResponse(linkInfo) {
        success('please solve the captcha');
        let res = '';
        while (true) {
            try {
                res = turnstile.getResponse();
                if (res) { break; }
            } catch (e) { }
            await sleep(1000);
        }
        return turnstile.getResponse();
    }
    if (document.title == 'Just a moment...') { return; }
    let id = new URL(window.location.href).searchParams.get('id');
    let linkInfo = await (await fetch('https://api-gateway.platoboost.com/v1/authenticators/2569/' + id)).json();
    if (linkInfo.key) {
        GM_setClipboard(linkInfo.key)
        success("Bypass Was Success, Key Has Been Copied To Your Clipboard! | " + linkInfo.key);
        return;
    }
    let token = new URL(window.location.href).searchParams.get('tk');
    if (!token) {
        let captchaRequired = linkInfo.captcha;
        let data = await fetch('https://api-gateway.platoboost.com/v1/sessions/auth/2569/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "captcha": captchaRequired ? await getTurnstileResponse() : "",
                "type": captchaRequired ? "Turnstile" : ""
            })
        })
        data = await data.json();

        success('tunstile stage completed');
        await sleep(2000);

        let followedUrl = data.redirect;
        let decryptedUrl = await (await fetch(`https://bypass.rblx.workers.dev/delta-decrypt?url=${encodeURIComponent(followedUrl)}`)).text();

        let encodedDest = new URL(decryptedUrl).searchParams.get('r');
        let followedDest = atob(encodedDest);
        window.location.assign(followedDest);
    }
    else {
        await sleep(5000);
        await (await fetch(`https://api-gateway.platoboost.com/v1/sessions/auth/2569/${id}/${token}`, {
            method: 'PUT',
        })).json().then(async res => {
            console.log(res)
            await sleep(1000);
            if (res.redirect.includes("https://gateway.platoboost.com/")) {
                success('bypassed successfully');
                window.location.reload()
                return
            }
            let followedUrl = res.redirect;
            let decryptedUrl = await (await fetch(`https://bypass.rblx.workers.dev/delta-decrypt?url=${encodeURIComponent(followedUrl)}`)).text();

            let encodedDest = new URL(decryptedUrl).searchParams.get('r');
            let followedDest = atob(encodedDest);
            success("stage completed!")
            if (opendiscordinvite) { window.open("https://discord.gg/yxu") }
            window.location.assign(followedDest);
        }).catch(e => {
            window.location.reload();
        })
    }
}

// start bypass
async function bypass() {
    if (window.location.href.includes("gateway.platoboost.com/a/8?id=")) {
        await delta()
        return;
    } else if (window.location.href.includes("gateway.platoboost.com/a/2569?id=")) {
        await hydrogen()
        return;
    }
}

bypass();
