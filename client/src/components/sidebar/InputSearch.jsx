import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SerachUsers } from "../../utils/UserApi";

export default function InputSearch({
  placeholder,
  setSearchUser,
  setOpen,
  setIsSearch,
}) {
  const ChangeSearch = async (e) => {
    const name = e.target.value;
    if (!name) {
      setOpen(false);
      setIsSearch(false);
      return;
    }

    try {
      const res = await SerachUsers(name);

      if (!res) {
        throw new Error("Error");
      }

      setSearchUser(res?.data);
      setOpen(true);
      setIsSearch(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TextField
      placeholder={placeholder}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      onChange={ChangeSearch}
    />
  );
}
