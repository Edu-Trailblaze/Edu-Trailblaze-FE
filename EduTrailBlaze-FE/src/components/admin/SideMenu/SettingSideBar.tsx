"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const SettingSideBar = () => {
  return (
    <Box
      sx={{
        width: "30%",
        bgcolor: "white",
        boxShadow: 1,
        padding: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Setting
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Customize until it matches your workflow
      </Typography>
      <Box sx={{ mt: 4 }}>
        {[
          { label: "General", path: "/admin_dashboard/Dashboard/settings/general" },
          { label: "Preferences", path: "/admin_dashboard/Dashboard/settings/preferences" },
          { label: "Notification", path: "/admin_dashboard/Dashboard/settings/notification" },
          { label: "Account", path: "/admin_dashboard/Dashboard/settings/account" },
        ].map((item, index) => (
          <Typography
            key={index}
            component="div"
            sx={{
              padding: "10px 0",
              cursor: "pointer",
              fontWeight: "normal",
            }}
          >
            <Link
              href={item.path}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "normal",
              }}
            >
              {item.label}
            </Link>
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default SettingSideBar;
