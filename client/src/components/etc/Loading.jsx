import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ width: "100%"}}>
        <CircularProgress sx={{position: "absolute", top: '40%', left: '50%', translate: "-50%" }} />
    </Box>
  )
}
