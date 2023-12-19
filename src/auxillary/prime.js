import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import OverlayPanel from 'primevue/overlaypanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ContextMenu from 'primevue/contextmenu';

export const prime = (app) => {
  app.use(PrimeVue);
  app.component("PvInputText", InputText);
  app.component("PvDropdown", Dropdown);
  app.component("PvButton", Button);
  app.component("PvToast", Toast);
  app.component("PvOverlayPanel", OverlayPanel);
  app.component("PvDataTable", DataTable);
  app.component("PvColumn", Column);
  app.component("PvContextMenu", ContextMenu);

  app.directive("tooltip", Tooltip);

  const toastService = app.use(ToastService);
  app.config.globalProperties.$toast =
    toastService.config.globalProperties.$toast;
};
