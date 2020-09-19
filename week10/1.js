let result = '{"connectStart":1598865077658,"navigationStart":1598865077658,"loadEventEnd":1598865079387,"domLoading":1598865077716,"secureConnectionStart":0,"fetchStart":1598865077658,"domContentLoadedEventStart":1598865078775,"responseStart":1598865077702,"responseEnd":1598865077704,"domInteractive":1598865078775,"domainLookupEnd":1598865077658,"redirectStart":0,"requestStart":1598865077661,"unloadEventEnd":1598865077709,"unloadEventStart":1598865077709,"domComplete":1598865079377,"domainLookupStart":1598865077658,"loadEventStart":1598865079378,"domContentLoadedEventEnd":1598865078778,"redirectEnd":0,"connectEnd":1598865077658}'
let performance = [
    "navigationStart",
    "redirectStart",
    "redirectEnd",
    "fetchStart",
    "domainLookupStart",
    "domainLookupEnd",
    "connectStart",
    "secureConnectionStart",
    "connectEnd",
    "requestStart",
    "responseStart",
    "responseEnd",
    "unloadEventStart",
    "unloadEventEnd",
    "domLoading",
    "domInteractive",
    "domContentLoadedEventStart",
    "domContentLoadedEventEnd",
    "domComplete",
    "loadEventStart",
    "loadEventEnd"
];

let map = {'domReady': ['domContentLoadedEventEnd', 'navigationStart'], 'tti': ['domInteractive', 'requestStart']}
let p = JSON.parse(result)

for (let key in p) {
    console.log(key, new Date(p[key]).toUTCString());
}

for (let key in map) {
    console.log(key, map[key]);
}