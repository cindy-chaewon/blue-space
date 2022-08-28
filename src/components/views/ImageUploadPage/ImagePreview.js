// import '../App.css';
import style from './ImageUpload.module.css'
import Modal from './Modal.js';
// import ImageName from '../ImageName';
import React, { useState } from 'react';


function ImagePreview({ image, deleteFunc }) {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };


    return (
      <div className={style.ImagePreview} draggable>
        <img onClick={openModal} src={image} alt="preview" />

        <Modal open={modalOpen} close={closeModal}>
          <img src={image} />
        </Modal>

        <div className={style.icon_container}>
          <img src="/img/img+memo/white_star.png" className={style.StarIcon} />
          <img src="/img/img+memo/white_trashbin.png"  onClick={deleteFunc} className={style.TrashIcon} />
        </div>

        {/* <div>
          {fileName}
        </div> */}
      </div>
    );
}

export default ImagePreview;