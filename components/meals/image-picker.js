"use client";
import classes from "./image-picker.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [pickerImage, setPickerImage] = useState();
  function handleClick() {
    imageInput.current.click();
  }
  function handleChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickerImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPickerImage(fileReader.result);
    };
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickerImage && <p>No image picked yet</p>}
          {pickerImage && (
            <Image
              src={pickerImage}
              alt="The image  selected by the user"
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick a Image
        </button>
      </div>
    </div>
  );
}
