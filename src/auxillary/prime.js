import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import PrimeVue from "primevue/config";
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
export const prime = (app) => {
    app.use(PrimeVue);
    app.component("PvInputText", InputText);
    app.component("PvDropdown", Dropdown);
    app.component("PvButton", Button);
    app.component("PvToast", Toast);


    const toastService = app.use(ToastService);
    app.config.globalProperties.$toast = toastService.config.globalProperties.$toast;

}

