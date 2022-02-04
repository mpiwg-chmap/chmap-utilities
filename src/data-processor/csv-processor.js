import { mapCSVRequiredProps } from "./data-props-mapping";

export function process(text) {

    const {headerArray, headerMap, data} = csv2JSON(text);

    mapCSVRequiredProps(headerMap, data);

    if (headerMap.ID !== undefined) {
        data.sort((a, b) => parseInt(a.ID) - parseInt(b.ID));
    }
    if (headerMap.Page !== undefined) {
        data.sort((a, b) => parseInt(b.Page) - parseInt(a.Page));
    }

    return {headerArray, headerMap, items: data};

}

function csv2Array(CSV_string, delimiter) {

    delimiter = (delimiter || ","); // user-supplied delimeter or default comma

    const pattern = new RegExp( // regular expression to parse the CSV values.
    ( // Delimiters:
    "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + delimiter + "\\r\\n]*))"
    ), "gi"
    );

    const rows = [[]];  // array to hold our data. First row is column headers.
    // array to hold our individual pattern matching groups:
    let matches = false; // false if we don't find any matches
    // Loop until we no longer find a regular expression match
    while (matches = pattern.exec(CSV_string)) {
        const matched_delimiter = matches[1]; // Get the matched delimiter
        // Check if the delimiter has a length (and is not the start of string)
        // and if it matches field delimiter. If not, it is a row delimiter.
        if (matched_delimiter.length && matched_delimiter !== delimiter) {
            // Since this is a new row of data, add an empty row to the array.
            rows.push([]);
        }
        let matched_value;
        // Once we have eliminated the delimiter, check to see
        // what kind of value was captured (quoted or unquoted):
        if (matches[2]) { // found quoted value. unescape any double quotes.
            matched_value = matches[2].replace(
            new RegExp("\"\"", "g"), "\""
            );
        } else { // found a non-quoted value
            matched_value = matches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        rows[rows.length - 1].push(matched_value);
    }

    return rows; // Return the parsed data Array

}

function csv2JSON(csvStr) {

    const aryCSV = csv2Array(csvStr);

    const headers = aryCSV[0], result = [], headerLen = headers.length;

    const headerArray = [], headerMap = {};

    let header, headerWOSpace;
    for (let idx = 0; idx < headerLen; idx++) {

        header = headers[idx];

        headerWOSpace = headers[idx].replace(/\s/g, '');

        headers[idx] = headerWOSpace;

        headerMap[headerWOSpace] = header;

        headerArray.push(headerWOSpace)
    }

    let rec, currentline, val;

    for (let idx = 1, len = aryCSV.length; idx < len; idx++) {

        rec = {};

        currentline = aryCSV[idx];

        if (currentline.length < headerLen) continue;

        for (let idx2 = 0; idx2 < headerLen; idx2++) {

            val = currentline[idx2];

            rec[headers[idx2]] = (val) ? val : '';
        }

        result.push(rec);

    }

    return {headerArray, headerMap, data: result};
}
