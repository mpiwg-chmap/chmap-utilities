const Spinner = function() {

    let spinner = null;

    function create(){

        const html = `<span class="visually-hidden">Loading...</span>`;

        const div = document.createElement('div');

        div.className = 'spinner-border';

        div.style.cssText = "z-index:9998;position:absolute;top:40%;left:50%;width:3rem;height:3rem;display:none;";

        div.innerHTML = html;

        document.body.append(div);

        spinner = div;

    }

    function show(){

        if(!spinner){
            create();
        }

        spinner.style.display = 'block';
    }

    function hide(){

        if(spinner) {
            spinner.style.display = 'none';
        }
    }

    return {
        show,
        hide,
    }
}();

export default Spinner;
