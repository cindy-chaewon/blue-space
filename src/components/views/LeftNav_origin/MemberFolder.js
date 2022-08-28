import React from 'react'
import style from './LeftNav.module.css'
import { Link } from "react-router-dom"
import MemberFolderItem from './MemberFolderItem'

function MemberFolder({ memberFolderData, noloop }) {
  
  return (
    <div id={style.sub_folder}>
        {memberFolderData.map((myfolderData) => <MemberFolderItem name={myfolderData.folderName}  folderId={myfolderData.folderId} creatorId={myfolderData.creatorId} noLoop = {noloop[0]} setNoLoop = {noloop[1]}/>)}
    </div>
  )
}

export default MemberFolder


//props.folderName

//name={myfolderData.folder_name}