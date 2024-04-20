import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function InputSearch({placeholder}) {
  return (
    <TextField
      placeholder={placeholder}
      size="small"
      InputProps={{
        startAdornment: <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>,
      }}
    />
  );
}
