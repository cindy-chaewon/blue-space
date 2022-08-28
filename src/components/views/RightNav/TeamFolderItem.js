import React from 'react'
import style from "./RightNav.module.css"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {trashTeamFolder} from '../../../_actions/user_action'


function TeamFolderItem(props) {

  const Dispatch = useDispatch();

  const onTrashHandler = () => {
      
      Dispatch(trashTeamFolder(props.folderId, props.creatorId))
      .then(response => {
          if(response.payload.isSuccess) {
            console.log("팀 폴더 삭제 성공", response);
            props.setNoLoop(!props.noLoop);
            
                    
          } else {
              console.log("ERROR in TrashTeamFolder");
              alert(response.payload.message);
          }
      })
      .catch(err => console.log("dispatch", err))
  }    


  const getFolderId = () => {
    console.log(props.folderId)
    sessionStorage.setItem('folderId', props.folderId);
    sessionStorage.setItem('folderName', props.name);
    
  }



  return (
    <div className={style.MyFolderItem} >
        <Link to="/linkstore" className={style.textid} onClick={getFolderId}>{props.name}</Link>
        <button className={style.teamfoldertrash} onClick={onTrashHandler}>
            <img src="img/common_img/trashbin.svg" alt="trashbin" className={style.twenty_size}/>
        </button>
    </div>
  )
}

export default TeamFolderItem