import { mapGeoJSONRequiredProps } from "./data-props-mapping";
import DateUtils from "../date-utils";

export function shouldIHandle(text) {
    return text.indexOf("FeatureCollection") >= 0;
};

export function process(text) {

    const json = JSON.parse(text);

    const items = [];

    for (let idx = 0, len = json.features.length; idx < len; idx++) {

        const feature = json.features[idx];

        const {properties, geometry} = feature;

        mapGeoJSONRequiredProps(properties);

        const {ID, name, imageURL, date} = properties;

        const obj = {ID, name};

        obj.imageURL = imageURL || "#";
        obj.Longitude = geometry.coordinates[0] || 0;
        obj.Latitude = geometry.coordinates[1] || 0;
        obj.date = DateUtils.parse(date, "yyyy/M/d t HH:mm:ss");
        obj.all = properties;

        items.push(obj);

    }

    return {items, json};
}
