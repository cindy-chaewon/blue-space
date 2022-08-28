import React from 'react'
import style from './TrashPage.module.css'
import { useDispatch } from 'react-redux';
import { TimeForToday } from "../../../TimeforToday"
import { trashForever, trashBack } from '../../../_actions/user_action'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faRefresh } from "@fortawesome/free-solid-svg-icons";

function TrashInfo(props) {

    const Dispatch = useDispatch();

    let fileItemId;
    let fileItemName;
    let volume;
    let repImg;
    let memberName;
    // let uploaderName = props.info.name;

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
            fileItemId = props.info.linkId
            fileItemName = props.info.name
            volume = null
            repImg = "img/file_logo/link_logo.svg";
            memberName = props.info.member_name
            break;
        case "memo" :
            fileItemId = props.info.memoId
            fileItemName = props.info.name
            volume = null
            repImg = "img/file_logo/memo_logo.svg";
            memberName = props.info.member_name
            break;
        case "file" :
            fileItemId = props.info.fileId
            fileItemName = props.info.originalFileName
            volume = getByte(props.info.volume)
            repImg = "img/file_logo/file_logo.svg";
            memberName = props.info.member_name
            break;
        case "folder" :
            fileItemId = props.info.folderId
            fileItemName = props.info.folderName
            volume = null
            repImg = "img/file_logo/image_logo.svg";
            memberName = props.info.member_name
    }

    if(!fileItemName) {
        fileItemName = "Untitled";
    }

    let fromToday = TimeForToday(props.modifiedStatusDate);

    const onTrashForever = (event) => {
        Dispatch(trashForever(props.category, fileItemId, props.userId))    
        .then(response => {
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in trashForever");      
            } else {
                console.log("ERROR in trashForever");
            }
        })
        .catch(err => console.log("dispatch", err))
    } 

    const onTrashBack = () => {
        Dispatch(trashBack(props.category, fileItemId, props.userId))
        .then(response => { 
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in trashBack");
            } else {
                console.log('ERROR in trashBack');
            }
        })
        .catch(err => console.log("dispatch", err))
    }

  return (
    
    <div className={style.file_item}>

        <div className={style.file_type}>
            <img src={repImg} />
        </div>
        <div className={style.file_name}>{fileItemName}</div>
        <div className={style.file_uploader}>{memberName}</div>
        <div className={style.file_date}>{fromToday}</div>
        <div className={style.file_size}>{volume}</div>

        <div className={style.returnIcon} onClick={onTrashBack}>
            <FontAwesomeIcon icon={faRefresh} className={style.trashIcon} />
        </div>
        
        <div className={style.trashForeverIcon} onClick={onTrashForever}>
            <img src='img/common_img/trashbin.svg' className={style.trashIcon}></img>
        </div>

    </div>
  )
}

export default TrashInfo