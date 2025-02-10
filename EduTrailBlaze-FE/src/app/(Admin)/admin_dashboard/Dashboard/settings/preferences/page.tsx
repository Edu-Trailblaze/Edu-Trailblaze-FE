import React from "react";
import { Box, Typography, Divider, TextField, Grid, Button } from "@mui/material";

const SettingPreference = () => {
    return (
        <Box sx={{ padding: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            {/* Header Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Preferences
                </Typography>

            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
                Update your business personal
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Form Section */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Select Themes
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Time Zone" fullWidth defaultValue="(UTC - 08:00) Pacific Time" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Language" fullWidth defaultValue="English (US)" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Sidebar Size" fullWidth defaultValue="Medium (200px)" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Icon Size" fullWidth defaultValue="Small (24px)" />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SettingPreference;
