import React, { useState, useEffect} from 'react';
import TeamItem from './TeamItem';
import style from './TeamProfilePage.module.css'
import axios from "axios";
import { useDispatch } from 'react-redux';
import {teamRemove} from '../../../_actions/user_action'





function TeamProfilePage() {

    const teamId = sessionStorage.getItem('teamId');
    const creatorId = sessionStorage.getItem('creatorId');
    const teamName = sessionStorage.getItem('teamName');
    const [TeamListData, setTeamListData] = useState([]);
    const userId = sessionStorage.getItem('userId');

    if(userId == "")
    {
        alert("로그인을 해주세요");
    
        document.location.href = '/login'
    }

   

    useEffect(() => {
        axios.get(`/team/info/${teamId}`)
        .then((response) => {
            console.log("onEffect1", response)
            setTeamListData(response.data.result.teamMembers)
            sessionStorage.setItem('creatorId', response.data.result.creatorId)
            //alert(creatorId)
            
        })
        .catch((err) => console.log("useEffect", err));
    }, [])


    /*const removeClick =() => {
        
        axios.delete('/team/delete/${teamId}/${userId}')
        .then((response) => {
            console.log("onEffect", response)
        })
        .catch((err) => console.log("useEffect", err));
    }*/
    const Dispatch = useDispatch();
    
    const removeClick =  () => {
        
        Dispatch(teamRemove(teamId, creatorId ))
        .then(response =>{
            //console.log("teamRemove", response);
            
            if(response.payload.isSuccess) {

                console.log("확인111", response);
                document.location.href = '/'
            } else {
                console.log("확인222", response);
                alert(response.payload.message);
        
            }
        })
        

    }






    return (

        <div id={style.contents}>
            <div id={style.contents_wrap}>
                <button type="button" className={style.teamremove} onClick={removeClick}>팀 삭제하기</button>
                <div className={style.recent_file}>
                    <p id={style.teamnamereal}>{teamName}</p>
                    <p id={style.usernamereal}>팀원 목록</p>
                    <div className={style.team_list}>
                        <div className={style.teaminfo}>
                            <p className={style.team_title_member}>이름</p>
                            <p className={style.team_title_email}>이메일</p>
                        </div>
                    


                        {TeamListData.map((TeamData) => 
                        <TeamItem  email={TeamData.memberEmail} 
                                name={TeamData.memberName} />)}
                    
                    </div>        
                </div>
 
            </div>
        </div>
    
    )
}

export default TeamProfilePage