# cookie-collector

This is an Chrome Extension to collect where a client-side cookie is born: context(top frame or iframe), script(call function, js file, line number) and which response set HTTP cookies.

These data is useful to audit the website cookie usage so that the risk can be aware due to the new release of Safari ITP 2.1 which enforces some restrictions on client-side cookies.

## install

- Open Chrome -> More Tools -> Extensions
- Enable Developer mode
- Load unacked, and select this repo folder

## Start Cookie-Audit server

See also https://github.com/chaoyangnz/cookie-audit

It should be listening on 9000

## Visit a page

- Open Chrome DevTools, and open this extension background page
- Observe the logs
- visit http://localhost:9000 and see which cookies would be risky to be affected by ITP2.1 changes around client-side cookie

