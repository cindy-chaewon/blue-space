import React from 'react'
import style from './LeftNav.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {trashMyFolder} from '../../../_actions/user_action'

function MemberFolderItem(props) {

  const Dispatch = useDispatch();

  const onTrashHandler = () => {
      
      Dispatch(trashMyFolder(props.folderId, props.creatorId))
      .then(response => {
          if(response.payload.isSuccess) {
            props.setNoLoop(!props.noLoop);
            console.log("내 폴더 삭제 성공", response);
              
                    
          } else {
              console.log("ERROR in TrashMyFolder");
              alert(response.payload.message);
          }
      })
      .catch(err => console.log("dispatch", err))
  }    

  let location = useLocation();

  let linkTolink = false;

  const getFolderId = () => {
    console.log(1234)
    console.log(props.folderId)
    sessionStorage.setItem('folderId', props.folderId);
    sessionStorage.setItem('folderName', props.name);
    if(location.pathname === '/linkstore') {
      linkTolink =true;
    }
  }
    
  return (
    <div className={style.MyFolderItem} >
        <Link to="/linkstore" state={{ linkTolink}} className={style.text} onClick={getFolderId}>{props.name}</Link>
        <button className={`${style.trashbin_icon} ${style.button_flex}`} onClick={onTrashHandler}>
            <img src="img/common_img/trashbin.svg" alt="trashbin" className={style.twenty_size}/>
        </button>
    </div>
  )
}

export default MemberFolderItem