import React from "react";
import { Box, Divider } from "@mui/material";
import SettingSideBar from "@/components/admin/SideMenu/SettingSideBar";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
            {/* Sidebar */}
            <SettingSideBar />

            {/* Divider */}
            <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ddd" }} />

            {/* Main Content */}
            <Box sx={{ flex: 1, padding: 4 }}>{children}</Box>
        </Box>
    );
}
