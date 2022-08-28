import React, { useState, useEffect } from "react";
import TeamItem from './TeamItem'
import style from "./RightNav.module.css"


function TeamBoard({ teamListData, noloop }) {

    
    return (
        <div id={style.teamsBoard} >
            {teamListData.map((teamData) => <TeamItem name={teamData.teamName} teamId={teamData.teamId}  teamName={teamData.teamName} noLoop = {noloop[0]} setNoLoop = {noloop[1]}/>)}
        </div>
    
    )
}

export default TeamBoard