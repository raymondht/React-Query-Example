import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";

interface LinkTabProps {
  label?: string;
  href: string;
}

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate(props.href);
      }}
      {...props}
    />
  );
}

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "50px" }}>
      <h1 style={{ textAlign: "center" }}>PokeQuery</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        centered
      >
        <LinkTab label="Home" href="/" />
        <LinkTab label="Favorites" href="/favorites" />
      </Tabs>
    </Box>
  );
}
