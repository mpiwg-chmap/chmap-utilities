
String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const values = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...values);
}

export const GEO_REF_IMG_SIZE = 500;

export const POPUP_THUMBNAIL_WIDTH = 300;

export const PHOTO_ICON_SIZE = 55;

export const PUBLIC_MAP_API_URL = process.env.PUBLIC_MAP_API_URL;

export const IIIF_VIEWER_URL = process.env.IIIF_VIEWER_URL;

export const EXAMPLE_FILES_DIR = process.env.EXAMPLE_FILES_DIR;


