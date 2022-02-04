function mapCSVRequiredProps(headerMap, rows){

    //TODO: Hard coding
    const rules = [
        {required: 'ID', alias: 'BookID'},
        {required: 'name', alias: 'BookName'},
        {required: 'date', alias: 'BookYear'},
    ];

    for(const rule of rules){
        convert(headerMap, rule.required, rule.alias);
    }

    for(const row of rows){

        mapRequiredProps(row, rules);

    }

}

function mapGeoJSONRequiredProps(props){

    //TODO: Hard coding
    const rules = [
        {required: 'ID', alias: 'OBSERVER_I'},
        {required: 'name', alias: 'COMMON_NAM'},
        {required: 'imageURL', alias: 'Pict'},
        {required: 'date', alias: 'OBSERVAT_1'},
        {required: 'ID', alias: '圖徵編號'},
        {required: 'name', alias: '空間名稱'},
        {required: 'imageURL', alias: '空間圖像'},
        {required: 'date', alias: '建立時間'},
    ];

    mapRequiredProps(props, rules);

}

function mapRequiredProps(props, rules){

    for(const rule of rules){

        convert(props, rule.required, rule.alias);

    }

}

function convert(props, requiredKey, aliasKey){

    const required = props[requiredKey];
    const alias = props[aliasKey];

    if(!required && alias) {
        props[requiredKey] = alias;
    }

}

export {
    mapCSVRequiredProps,
    mapGeoJSONRequiredProps,
}
