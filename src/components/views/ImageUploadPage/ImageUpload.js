// import '../App.css';
import ImagePreview from './ImagePreview';
import style from './ImageUpload.module.css'
import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar"

function ImageUpload() {

    const category = 'image';
    
    const [uploadedImages, setUploadedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const uploadBoxRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        const uploadBox = uploadBoxRef.current;
        const input = inputRef.current;
        
        const handleFiles = (files) => {
          for (const file of files) {
            if (!file.type.startsWith("image/")) continue;
            const reader = new FileReader();
            reader.onloadend = (e) => {
              const result = e.target.result;
              if (result) {
                setUploadedImages((state) => [...state, result]);
              }
            };
            reader.readAsDataURL(file);
          }
        };
        
        const changeHandler = (event) => {
          const files = event.target.files;
          handleFiles(files);
        };
        
        const dropHandler = (event) => {
          event.preventDefault();
          event.stopPropagation();
          const files = event.dataTransfer.files;
          handleFiles(files);
        };
        
        const dragOverHandler = (event) => {
          event.preventDefault();
          event.stopPropagation();
        };
        
        uploadBox.addEventListener("drop", dropHandler);
        uploadBox.addEventListener("dragover", dragOverHandler);
        input.addEventListener("change", changeHandler);
        
        return () => {
          uploadBox.removeEventListener("drop", dropHandler);
          uploadBox.removeEventListener("dragover", dragOverHandler);
          input.removeEventListener("change", changeHandler);
        };
    });
      
    useEffect(() => {
        const imageJSXs = uploadedImages.map((image, index) => {
          const isDeleteImage = (element) => {
            return element === image;
          };
          const deleteFunc = () => {
            uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
            setUploadedImages([...uploadedImages]);
          };
          return <ImagePreview image={image} deleteFunc={deleteFunc} key={index} />;
        });
        setPreviewImages(imageJSXs);
    }, [uploadedImages]);
   


  return (
    <div id={style.contents}>
        <div id={style.contents_wrap}>
          <div className = {style.container}>

              < Navbar category={category}/>
              
              <form method="post">
                  <label className={style.label} ref={uploadBoxRef} htmlFor="ImgInput">
                      <div className={style.inner}>드래그 또는 클릭하여 업로드</div> 
                  </label>
                  <input id='ImgInput' className = {style.ImgInput} ref={inputRef} multiple accept="image/*" type="file" name="chooseFile" />
                  <div className={style.preview_container}>{previewImages}</div>
              </form>
          </div>
        </div>
      </div>
  );
}

export default ImageUpload;
