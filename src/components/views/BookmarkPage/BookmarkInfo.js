import React from 'react'
import style from './BookmarkPage.module.css'
import { useDispatch } from 'react-redux';
import { TimeForToday } from "../../../TimeforToday"
import { bookmarkOff } from '../../../_actions/user_action'

function BookmarkInfo(props) {
  
    // 링크 아니면 파일만 북마크를 할 수 있음

    // <BookmarkInfo  category={bookmarkFileData.category} bookmarkId={bookmarkFileData.bookmarkId} 
    //     userId={userId} noLoop = {noLoop} setNoLoop = {setNoLoop}
    //     info={bookmarkFileData.info}/>
  
    const Dispatch = useDispatch();

    let fileItemId;
    let fileItemName;
    let volume;
    let repImg;
    // let uploaderName = props.info.name;
    let path;

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
            volume = '-'
            path = props.info.url
            repImg = "img/file_logo/link_logo.svg";
            break;
        case "file" :
            fileItemId = props.info.fileId
            fileItemName = props.info.originalFileName
            volume = getByte(props.info.volume)
            path = props.info.filePath
            repImg = "img/file_logo/file_logo.svg";
            break;
    }

    let fromToday = TimeForToday(props.uploadDate);

    
    const downFile =(event) => {

        fetch(path, {method: 'GET'})
        .then(response => {
            console.log(response)
            return response.blob();
        })
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `${fileItemName}.${path.split(".").pop()}`
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
    
    const onBookmarkOff = () => {
        Dispatch(bookmarkOff(props.bookmarkId))
        .then(response => { 
            console.log(response)
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in bookmarkOffLink");
            } else {
                console.log('ERROR in bookmarkOffLink');
            }
        })
        .catch(err => console.log("dispatch", err))
    }

    return (
    
        <div className={style.bookmark_item}>

            <div className={style.file_type}>
                { (props.category == 'link') ? (<a href={path} target='_blank'><img src={repImg}/></a>) :
                (<button onClick={downFile}><img src={repImg}/></button>)}
                
            </div>
            
            <div className={style.file_name}>
                {fileItemName}
            </div>

            
            <div className={style.file_uploader}>{props.info.uploader}</div>
            
            <div className={style.file_date}>
                {fromToday}
            </div>
            <div className={style.file_size}>
                {volume}
            </div>
            
            <button className={style.bookmarkIcon} onClick={onBookmarkOff}>
                <img src='img/common_img/star_filled.svg'/>
            </button>
            
        </div>
  )
}

export default BookmarkInfo