import { EventEmitterClass } from "./commons.js";

const OpenStreetMapService = function () {

    const localEventEmitter = new EventEmitterClass();

    function addEventListener(obj, types, fn, context) {
        localEventEmitter.on(obj, types, fn, context);
    }

    function getInfoByLatLng({callback, lat, lng, lang}) {

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=${lang}`;

        fetch(url)
        .then(response => response.ok ? response : Promise.reject({err: response.status}))
        .then(response => response.json())
        .then(json => callback({placeInfo: json.display_name || 'unknown', lat, lng}))
        .catch(error => {
            console.error('Error:', error);
            localEventEmitter.emit('exception', 'Cannot access openstreetmap service, please contact administrators');
        });

    }

    function searchPlaceName(placeName, callback) {

        if (placeName === "") {
            return;
        }

        //TODO get user's current language
        const url =
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&polygon=1&addressdetails=1&accept-language=en`;

        fetch(url)
        .then(response => response.ok ? response : Promise.reject({err: response.status}))
        .then(response => response.json())
        .then(json => {

            const data = [];

            for (const element of json) {

                const node = {lat: element.lat, lng: element.lon, info: ''};

                node.info = JSON.stringify(element)
                .replace(/{/g, "")
                .replace(/}/g, "")
                .replace(/"/g, "")
                .replace(/, ODbL 1.0. https:\/\/osm.org\/copyright/g, "")
                .replace(/,/g, "<br/>");

                data.push(node);
            }

            callback(data);


        })
        .catch(error => {
            console.error('Error:', error);
            localEventEmitter.emit('exception', 'Cannot access openstreetmap service, please contact administrators');
        });
    }

    return {
        getInfoByLatLng,
        searchPlaceName,
        on: addEventListener,
    }

    /* Events

    { name: 'exception', params: String }

    */
}();

export default OpenStreetMapService;

