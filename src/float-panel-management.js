const FloatPanelManagement = function (){

    const panelMap = {
        right: [],
        left: [],
    };

    function setPanelSeq(panels, panelSeq, newPanel){

        for(const panel of panels){
            if(panel.id !== newPanel.id) {
                panelSeq.push(panel);
            }
        }

        for(let idx = 0, len = panelSeq.length; idx < len; idx++){
            panelSeq[idx].style.zIndex = 9999 - idx;
        }

    }

    function shown(position, panel){

        const panels = panelMap[position];

        const panelSeq = [ panel ];

        setPanelSeq(panels, panelSeq, panel);

        panelMap[position] = panelSeq;

    }

    function hidden(position, panel){

        const panels = panelMap[position];

        const panelSeq = [ ];

        setPanelSeq(panels, panelSeq, panel);

        panelMap[position] = panelSeq;

    }

    function register(controller, eventPrefix, position){

        const shownEventName = `${eventPrefix}.shown`;
        const hiddenEventName = `${eventPrefix}.hidden`;

        controller.on(shownEventName, (panel) => shown(position, panel));

        controller.on(hiddenEventName, (panel) => hidden(position, panel));

    }

    return {
        register,
    }

}();

export default FloatPanelManagement;
