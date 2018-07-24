/*!
 * Puppet-PDF
 * -------------------------------------
 * Server creation & initialization.
 */

'use strict';

var CONF = require('config'),
    puppeteer = require('puppeteer');


/////////////////////////////////////////////
//  Entry point
/////////////////////////////////////////////

(async () => {

    try {

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        console.log(`Fetching URL: ${process.env.FETCH_URL}`);

        await page.goto(process.env.FETCH_URL);

        await page.waitForFunction('window.PHANTOM_HTML_TO_PDF_READY || window.HTML_TO_PDF_READY', {
            timeout: CONF.app.HTML_TO_PDF_TIMEOUT
        });

        console.log('Page finished loading... Creating PDF...');

        await page.pdf({
            path: '/var/app/puppet-pdf/shared/test.pdf',
            format: 'A4',
            margin: {
                top: '1cm',
                bottom: '1cm',
                right: '1cm',
                left: '1cm'
            }
        });

        console.log('Finished writing PDF.');

    } catch (error) {
        console.error(`Error trying to generate pdf from html. Reason: ${error}`, {
            error
        });
    } finally {
        await page.close();
        await browser.close();
    }

})();
