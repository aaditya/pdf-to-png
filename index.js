const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials'
        ]
    });
    const page = await browser.newPage();

    const url = "https://smartexpressuatfilestrg.blob.core.windows.net/mobileaxblotlabel/XSE_00030553_20211220071007.pdf";

    const html = await ejs.renderFile(path.resolve(__dirname, 'label.ejs'), { data: { url } });

    await page.setContent(html);
    await page.waitForNetworkIdle();
    await page.screenshot({ path: 'label.png' });

    await browser.close();
})();