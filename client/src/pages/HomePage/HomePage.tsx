import { Container, Typography } from "@mui/material";
import { LogOut } from "../../features/LogOut";

export const HomePage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <LogOut />
      <Typography variant="h6">{"Homepage"}</Typography>
    </Container>
  );
};
