import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import style from './FileUpload.module.css';
import { trashFile, bookmarkOff, bookmarkOnFile } from '../../../_actions/user_action'
import { Axios } from "axios";



function FileUploadItem(props) {

    const Dispatch = useDispatch();

    let fileVolume;
    if(props.volume<1000) {
        fileVolume = `${props.volume} Byte`
    } else if(props.volume<1000**2) {
        fileVolume = `${parseInt(props.volume/1000)} KB`
    } else if(props.volume<1000**3) {
        fileVolume = `${parseInt(props.volume/1000**2)} MB`
    }
    
    
    // 지금 byte를 보냄
    const fileType = props.filepath.split(".").pop();


    const onTrashHandler = () => {
        
        Dispatch(trashFile(props.fileId, props.userId))
        .then(response => {
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in TrashLink");      
            } else {
                console.log("ERROR in TrashLink");
                alert(response.payload.data.message);
            }
        })
        .catch(err => console.log("dispatch", err))
    }        

    const onBookmarkOffFile = () => {
        Dispatch(bookmarkOff(props.bookmarkId))
        .then(response => { 
            console.log(response)
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in bookmarkOffLink");
            } else {
                console.log('ERROR in bookmarkOffLink');
                alert(response.payload.data.message);
            }
        })
        .catch(err => console.log("dispatch", err))
    }
    
    const onBookmarkOnFile = () => {
        
        console.log("onbm", props.fileId);
        Dispatch(bookmarkOnFile(props.folderId, props.fileId, props.userId))
        .then(response => { 
            console.log(response)
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in bookmarkOnLink");
            } else {
                console.log('ERROR in bookmarkOnLink');
                alert(response.payload.data.message);
            }
        })
        .catch(err => console.log("dispatch", err))
    }


    const downloadHandler = () => {
        // console.log(props.filepath);
        fetch(props.filepath, {method: 'GET'})
        .then(response => {
            console.log(response)
            return response.blob();
        })
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `${props.originalFileName}.${fileType}`
            document.body.appendChild(a); 
            a.click();  
            setTimeout(
              _ => { window.URL.revokeObjectURL(url); }, 
              60000); 
            a.remove(); 
          })
          .catch(err => {
            console.error('err: ', err);
          })
    }

    const [blueBorder, setBlueBorder] = useState('none');

    const onHover = (event) => {
        setBlueBorder("3px solid #267DFF");
    }
    const onNotHover = (event) => {
        setBlueBorder("none");
    }

    return ( 
            <div className={style.FileContainer} onMouseEnter={onHover} onMouseLeave={onNotHover} style={{ border : blueBorder}}>
                
                <button onClick={downloadHandler}>
                    <img src="/img/icon_down.svg" className={style.downImage}/>
                    {/* case 별로 다른 이미지 필요 */}
                </button>
                <div className={style.fileTitle}>{props.originalFileName}</div>

                <div className={style.fileType}>유형 : {fileType} 파일</div>
                <div className={style.fileVolume}>크기 : {fileVolume}</div>

                <button className={`${style.star_icon} ${style.button_flex}`}>
                {props.bookmarkId ? ( <img src="img/common_img/star_filled.svg" alt="star" className={style.twenty_size} onClick={onBookmarkOffFile}/>) : 
                        (<img src="img/common_img/star_line.svg" alt="star" className={style.twenty_size} onClick={onBookmarkOnFile} />)} 
                </button>

                <button className={`${style.trashbin_icon} ${style.button_flex}`}>
                    <img src = "img/common_img/trashbin.svg" className={style.twenty_size} onClick={onTrashHandler}/>
                </button>
                
            </div>
    )
}

export default FileUploadItem
