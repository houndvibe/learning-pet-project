import { StrictMode } from "react";
import { CssBaseline } from "@mui/material";

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StrictMode>
        <CssBaseline />
        {children}
      </StrictMode>
    </div>
  );
};

export default SettingsProvider;
