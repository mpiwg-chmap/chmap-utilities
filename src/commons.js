
class EventEmitterClass {

    constructor() {
        this._events = {};
    }

    on(name, listener) {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(listener);
    }

    removeListener(name, listenerToRemove) {

        if (!this._events[name]) {
            // throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
            return;
        }

        const filterListeners = (listener) => listener !== listenerToRemove;

        this._events[name] = this._events[name].filter(filterListeners);
    }

    emit(name, params) {

        if (!this._events[name]) {
            // throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
            return;
        }

        const fireCallbacks = (listener) => {
            listener(params);
        };

        this._events[name].forEach(fireCallbacks);
    }
}

const SnowflakeID = function(){

    let nowId = 0;

    function next(){
        return nowId++;
    }

    return {
        next
    }
}();

// const UUIDGenerator = function () {
//
//     function next(){
//
//         // Public Domain/MIT
//         let d = new Date().getTime();
//
//         if ( typeof performance !== "undefined" && typeof performance.now === "function") {
//             d += performance.now(); //use high-precision timer if available
//         }
//
//         return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//
//             const r = (d + Math.random() * 16) % 16 | 0;
//
//             d = Math.floor(d / 16);
//
//             return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
//         });
//     }
//
//     return {
//         next,
//     }
//
// }();

const YearMetadata = function(){

    function query(year, callback, errorCallback){

        const dateStr = year.toString() + "-06-01";

        const isoString = (new Date(dateStr)).toISOString();

        const url = `//authority.dila.edu.tw/webwidget/getAuthorityData.php?type=time&when=${isoString}&format=s`;

        fetch(url)
        .then(response => response.ok ? response : Promise.reject({err: response.status}))
        .then(response => response.json())
        .then(json => {

            const root = json.W;

            const html = [`<div class="mb-2">${year + "-06-01"}</div>`];

            for(const key in root) {

                const parent = root[key];

                html.push(`<div class="mb-2"><span class="key">${key}</span><div class="ps-4">`);

                for(const subKey in parent) {
                    const value = parent[subKey];
                    html.push(`<span class="fw-bolder">${subKey}</span>: <span class="key">${value}</span><br>`);
                }

                html.push(`</div></div>`);
            }

            html.push('<br/>Data provider: <a href="https://authority.dila.edu.tw/time/" target="_blank">DILA時間規範資料庫</a>');

            callback(html.join(''));

        })
        .catch(error => {
            console.error('Error:', error);
            errorCallback('Cannot access DILA時間規範資料庫 service, please contact administrators', 'warning')
        });

    }

    return {
        query,
    }

}();

export {
    EventEmitterClass,
    SnowflakeID,
    // UUIDGenerator,
    YearMetadata,
}
