import React from 'react'
import style from "./RightNav.module.css"
import TeamFolderItem from './TeamFolderItem'

function TeamFolderBoard({ teamFolderData, noloop }) {
  return (
    <div id={style.sub_folder}>
        {teamFolderData.map((teamfolderData) => <TeamFolderItem name={teamfolderData.folderName} creatorId={teamfolderData.creatorId} folderId={teamfolderData.folderId} noLoop = {noloop[0]} setNoLoop = {noloop[1]}/>)}
    </div>
    
  )
}

export default TeamFolderBoard