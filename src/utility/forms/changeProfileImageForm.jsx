import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { uploadImage } from "../../actions/imageUploadAction";
import { useDispatch } from "react-redux";

export default function ChangeProfileImageForm() {
  const dispatch = useDispatch();
  const [newProfileImage, setNewProfileImage] = useState(null);
  function handleImageChange(e) {
    setNewProfileImage(e.target.files[0]);
  }
  function handleImageUpload(e) {
    e.preventDefault();
    console.log(newProfileImage);
    if (newProfileImage) dispatch(uploadImage(newProfileImage));
    else toast.error("Please upload an image");
  }
  return (
    <form onSubmit={(e) => handleImageUpload(e)} style={{ padding: "3rem" }}>
      <Input
        inputProps={{ accept: ".jpg, .png" }}
        type="file"
        onChange={(e) => handleImageChange(e)}
      />
      <br />
      <Button type="submit">Upload</Button>
    </form>
  );
}
