import DateUtils from "../date-utils.js";
import { process as processCSV } from "./csv-processor";
import { process as processGeoJson, shouldIHandle as isGeoJson } from "./geo-json-processor";
import { process as processIIIF, shouldIHandle as isIIIFFile } from "./iiif-processor";

const BasicDataProcessor = function() {

    function execute(text, fileType) {

        const {items, imgType, json} = processRawText(text, fileType);

        const rows = [];

        for (const item of items) {

            //screen out the items which are without geo-coordinate.
            if (item.Latitude !== undefined && item.Longitude !== undefined) {

                rows.push(decorateDate(item));
            }
        }

        return {rows, imgType, json};

    }

// extract required fields from rawText and convert each line into a json object.
    function processRawText(text, fileType) {

        let imgType = 'text';

        let items = [];

        let json = null;

        if (fileType === 'geoJson' ||
        fileType === 'unknown' && isGeoJson(text)) {

            imgType = 'geoJson';

            const result = processGeoJson(text);

            items = result.items;

            json = result.json;

        } else if (fileType === 'iiif' || fileType === 'unknown' && isIIIFFile(text)) {

            imgType = 'iiif';

            const result = processIIIF(text);

            items = result.items;

            json = result.json;

        } else {

            const result = processCSV(text);

            items = result.items;

            imgType = (result.headerMap.imageURL !== undefined) ? 'normal' : 'text';

        }

        return {items, imgType, json};

    }

    function decorateDate(item) {

        if (item.date) {

            let ds = item.date.toString();

            if (ds.length <= 4) {

                const fixedYear = ("0000" + ds).substr(ds.length, 4);

                item.date = new Date(fixedYear + "-06-01T00:00:00Z");

            } else {

                item.date = DateUtils.parse(item.date, "yyyy/M/d t HH:mm:ss");
            }

        } else {

            item.date = new Date(-99999, 0, 1);
        }

        return item;

    }

    return {
        execute,
        isIIIFFile,
    }
}();

export default BasicDataProcessor;
