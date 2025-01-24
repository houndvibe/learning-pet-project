import { Container, Typography } from "@mui/material";
import { LogOut } from "~features/Auth/LogOut";
import { TestButton } from "~features/TestButton";

export const HomePage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h6">{"Homepage"}</Typography>
      <TestButton />
      <LogOut />
    </Container>
  );
};
