import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";
import { PhotoMutation } from "../../../type";

interface Props {
  onSubmit: (mutation: PhotoMutation) => void;
}

const PhotoForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<PhotoMutation>({
    title: "",
    photo: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };


  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Название"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
            InputProps={{
              sx: {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "blue",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "blue",
                },
              },
            }}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Изображение "
            name="photo"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PhotoForm;
