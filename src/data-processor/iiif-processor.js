import {POPUP_THUMBNAIL_WIDTH} from "../constants";

export function shouldIHandle(text) {

    return text.indexOf("http://iiif.io") >= 0;

};

export function process(text) {

    const json = JSON.parse(text);

    const manifestId = json['@id'];

    const manifestLabel = json.label;

    const canvases = json.sequences[0].canvases;

    const items = [];

    for (const canvas of canvases) {

        const resource = canvas.images[0].resource;

        const item = {
            manifestId,
            ID: canvas["@id"],
            name: canvas.label + " " + manifestLabel,
            height: canvas?.height || 200,
            width: canvas?.width || 200,
            serviceID: resource.service["@id"],
        };

        item.imageURL = item.ID;

        item.bigImage = `${item.serviceID}/full/500,/0/default.jpg`;

        if (canvas.thumbnail) {

            const {height, width} = canvas.thumbnail;

            item.thumbnail = canvas.thumbnail["@id"];
            item.thumbnailWidth = height;
            item.thumbnailHeight = width;

        } else {

            item.thumbnail = `${item.serviceID}/full/${POPUP_THUMBNAIL_WIDTH},/0/default.jpg`;

        }

        if (canvas.metadata !== undefined) {

            item.metadata = canvas.metadata;

            const firstMeta = item.metadata[0];

            item.Longitude = firstMeta.Longitude || 0;
            item.Latitude = firstMeta.Latitude || 0;
            item.Zoom = firstMeta.Zoom || 4;
            item.date = makeDateProperty(firstMeta);

        } else {

            item.metadata = [{Latitude: 0, Longitude: 0, Zoom: 4}];

            item.Latitude = 0;
            item.Longitude = 0;
            item.Zoom = 4;
            item.date = makeDateProperty({});
        }

        items.push(item);

    }

    return {items, json};
}

function makeDateProperty(firstMeta){

    const { label, value } = firstMeta;

    let result;

    if (label && label.toLowerCase() === 'date') {

        if (value.length <= 4) {

            const fixedYear = ("0000" + value).substr(value.length, 4);

            result = new Date(parseInt(fixedYear), 5, 1);

        } else {
            //TODO: Hard coding
            //Only deal with the two cases below:
            // 1856-03-28
            // 1746 ~ 1809
            const regex = /(\d*)(-|~)\d*/g;
            const found = regex.exec(value.replace(/\s/g, ""));

            result = new Date(parseInt(found[1]), 5, 1);
        }

    } else {

        result = new Date(-99999, 0, 1);
    }

    return result;

}

