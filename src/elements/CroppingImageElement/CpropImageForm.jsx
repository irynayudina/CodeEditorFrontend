
import React, { useState } from "react";
import FileInput from "./FileInput";
import ImageCropper from "./ImageCropper";
import './CroppImage.scss'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";

const CpropImageForm = () => {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };

  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");

      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");
    };
  };

  // Handle Cancel Button Click
  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  return (
    <div className="container">
      {currentPage === "choose-img" ? (
        <div>
          <div className="image-after-crop">
            <div className="image-container-cropped">
              <img
                src={"blank-profile-picture.png"}
                className="cropped-img sizes-for-cropp-image"
              />
            </div>
          </div>
          <FileInput setImage={setImage} onImageSelected={onImageSelected} />
        </div>
      ) : currentPage === "crop-img" ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div className="image-after-crop">
          <div className="image-container-cropped">
            <img
              src={imgAfterCrop}
              className="cropped-img sizes-for-cropp-image"
            />
          </div>
          {/* <div
            className="profile-pic-preview"
            style={{ backgroundImage: `url(${imgAfterCrop})` }}
          ></div> */}

          <div className="d-flex mt-1">
            <Button
              variant="primary"
              onClick={() => setCurrentPage("crop-img")}
            >
              Crop
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setCurrentPage("choose-img");
                setImage("");
              }}
            >
              New Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CpropImageForm