if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let s={};const o=e=>n(e,r),a={module:{uri:r},exports:s,require:o};i[r]=Promise.all(c.map((e=>a[e]||o(e)))).then((e=>(d(...e),s)))}}define(["./workbox-0fe41a65"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"19ddc94712db249f3ae4fa4d99cc5935"},{url:"android-chrome-384x384.png",revision:"324fa407f9f96ed0af804ead5ce8cc9a"},{url:"apple-touch-icon.png",revision:"3eade2b12325774bdcdbfbe29270dd14"},{url:"assets/index-d3fb2b3e.css",revision:null},{url:"assets/index-ecd1f4e9.js",revision:null},{url:"favicon-16x16.png",revision:"e3b3dc0cc8b8f8ad808fedf0caa76ff1"},{url:"favicon-32x32.png",revision:"8633bc0b827ccc31d7d67b8bfcb0237f"},{url:"favicon.ico",revision:"9ec8a3abd0d54ec21c63882183d08919"},{url:"icon-512x512.png",revision:"0b020e7e1b4b26bb3db8d19417261d62"},{url:"index.html",revision:"7d75cc5cd99dda432779685b11980183"},{url:"mstile-150x150.png",revision:"335422988770b876215a16bd2f230b7e"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icon-512x512.png",revision:"0b020e7e1b4b26bb3db8d19417261d62"},{url:"manifest.webmanifest",revision:"b43432da3704ffec2590cbc7cc542cbf"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/www\.ganatech\.me\//,new e.CacheFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:86400})]}),"GET")}));
