import { createRoot } from "react-dom/client";

import StoreProvider from "./app/providers/storeProvider";
import SettingsProvider from "./app/providers/settingsProvider";
import router from "./app/routes/router";
import { RouterProvider } from "react-router-dom";
import { LocaleProvider } from "~app/providers/localeProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <SettingsProvider>
    <StoreProvider>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </StoreProvider>
  </SettingsProvider>
);
