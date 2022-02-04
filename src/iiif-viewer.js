import { IIIF_VIEWER_URL } from "./constants.js";

const IIIFViewer = function () {

    function open(params){

        window.open( IIIF_VIEWER_URL.interpolate(params).trim());
    }

    return {
        open,
    }

}();

export default IIIFViewer;
