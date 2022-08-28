import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./MainPage.module.css";
import { TimeForToday } from "../../../TimeforToday"

function FileItem(props) {
    
    let togo;
    let fileItemName;
    let volume;
    let repImg;

    console.log("info", props.info.folder_name);

    function getByte(volume) {
        if(volume<1000) {
            return `${volume} Byte`
        } else if(volume<1000**2) {
            return `${parseInt(volume/1000)} KB`
        } else if(volume<1000**3) {
            return `${parseInt(volume/1000**2)} MB`
        }
    }

    switch(props.category) {
        case "link" :
            fileItemName = props.info.name
            togo = "linkstore"
            volume = null
            repImg = "img/file_logo/link_logo.svg";
            break;
        case "memo" :
            fileItemName = props.info.name
            togo = "memostore"
            volume = null
            repImg = "img/file_logo/memo_logo.svg";
            break;
        case "file" :
            fileItemName = props.info.originalFileName
            togo = "filestore"
            volume = getByte(props.info.volume)
            repImg = "img/file_logo/file_logo.svg";
            break;
    }
    console.log(volume);

    let fromToday = TimeForToday(props.lastModifiedDate);
    console.log(fromToday);

    const getFolderId = (event) => {
        sessionStorage.setItem('folderId', props.info.folderId);
        sessionStorage.setItem('folderName', props.info.folder_name)
    }

    return (
        
        <div className={style.file_item}>
            <Link to={`/${togo}`} style={{width : "100%", height : "100%"}} onClick={getFolderId}>
                    <div className={style.file_type}>
                        <img src={repImg} alt="linkIcon"/>
                    </div>
                    <div className={style.file_name}>{fileItemName}</div>
                    <div className={style.file_uploader}>{props.info.member_name}</div>
                    <div className={style.file_date}>{fromToday}</div>
                    <div className={style.file_size}>{volume}</div>

                    <div className={style.file_folder}>{props.info.folder_name}</div>
            </Link>
            
        </div>
        
    )
}

export default FileItem;