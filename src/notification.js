
import { Toast } from "./bootstrp-wrap";

const Notification = function(){

    let notification = null;

    let notificationBody = null;

    function create(){

        const html =
`<div class="toast hide bg-white"
      role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body"></div>
</div>`;

        const div = document.createElement('div');

        div.className = 'position-fixed';

        div.style.cssText = "z-index:9998;top:30px;left:43%;"

        div.innerHTML = html;

        document.body.append(div);

        notification = div.firstChild;

        notificationBody = notification.querySelector('.toast-body')

    }

    function show(info, type, sec){

        if(!notification){

            create();

        }

        notificationBody.innerHTML = info;

        notificationBody.className = `toast-body text-white bg-${ type || 'primary' }`;

        const toast = Toast.getOrCreateInstance(notification);

        toast.show();

        window.setTimeout(() => { toast.hide(); }, (sec || 3) * 1000)

    }

    return {
        show,
    }

}();

export default Notification;
