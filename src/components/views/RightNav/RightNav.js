import React, { useState, useEffect } from "react"
import axios from "axios";
import { useDispatch } from 'react-redux';
import style from "./RightNav.module.css"
import {Outlet} from "react-router"
import {teamUser} from '../../../_actions/user_action'
import styled from './Modal.module.css'
import TeamBoard from './TeamBoard';

function RightNav() {
    
    const [teamListData, setTeamListData] = useState([]);
    const [noLoop, setNoLoop] = useState(false);
    const userId = sessionStorage.getItem('userId');

    if(userId == "")
    {
        alert("로그인을 해주세요");
    
        document.location.href = '/login'
    }

    useEffect(() => {
        
        
        axios.get(`http://3.37.214.20:8080/team/${userId}`)

        .then((response) => {   
            
            setTeamListData(response.data.result.teamInfoList)
            
        
            //.log('useEffect000', response)
            
           // sessionStorage.setItem('teamId', teamListData[teamListData.length-1].teamId);
            //console.log('useEffect111', teamListData[teamListData.length-1].teamId)

            
        })
        .catch((err) => console.log('err in useEffect', err))
    },[noLoop]);

    

    /*모달 열고 닫는 이벤트*/
    const closeModal = () => {
        handlePopup(false);
    };

    const [popup, handlePopup ] = useState(false);

    /*모달 관련*/
    const Dispatch = useDispatch();
    
    const [Name, setName] = useState("");
    const [emails, setEmails] = useState([]);
    const [inputEmail, setInputEmail] = useState('');
    const [nextId, setNextId] = useState('');
    
    const handleChange = e => setInputEmail(e.target.value);

    

    const handleClick = () => {
        const newList = emails.concat({
            
            id : nextId ,
            memberEmail : inputEmail
            
        });

        setNextId(nextId+1);
        setEmails(newList);
        setInputEmail('');
    }
    
    const handleDelete = id => {
        const newList = emails.filter(email => email.id !== id);
        setEmails(newList);
    };

    const emailList = emails.map((email) => 
        <div key={email.id}>
            <div className={styled.EmailListItem}>
                <button className={styled.removeemail} onClick={() => handleDelete(email.id)}>삭제</button>
                <div className={styled.text}>{email.memberEmail}</div>
            </div>
        </div>
    );


    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }


    /*팀 생성하기 데이터 보내는*/
    const onSubmitHandler =  (event) => {
        event.preventDefault();

        let body = {
            
            "creatorId" : sessionStorage.getItem('userId'),
            "teamName" : Name,
            "members": emails

        }
            
        Dispatch(teamUser(body))
        .then(response =>{

            //sessionStorage.setItem('teamName', response.payload.reault.teamName);


            if(response.payload.data.code === 1000) {

                console.log("확인111", response);
                setNoLoop(!noLoop);
                document.location.href = '/'
                
            } else {
                console.log("확인222", response);
                alert(response.payload.data.message);
        
            }
        })
        

    }

    return (
        <>
            <div id={style.side_right}>

                <div className = {style.team_make}>
                    <div  className = {style.team_img}>
                        <img src="/img/teamMember.png" />
                    </div>
                    <div className = {style.teamfolder_text}>
                        <p>팀</p>
                    </div>
                    
                    
                    

                    {/*모달시작*/}
                    <button className={style.img_button} onClick={() => { handlePopup(true); }}>
                        <img src='/img/common_img/plus_icon.svg' />
                    </button>
                    {popup && 
                    <div className={styled.popup} >
                        <div className={styled.popupdiv}>
                            <div className={styled.remove} >
                                <img src="/img/common_img/removeImg.png"  onClick={closeModal}/>
                            </div>
                            <div className={styled.nameuser}>
                                <p>팀폴더명</p>
                            </div>
                


                                <div className={styled.nameform}>
                                    <form onSubmit={onSubmitHandler}>
                                        <div id={styled.name}>
                                            <input type="name" name="name"  className={styled.nametxt} id={styled.nameInput} value={Name} onChange={onNameHandler}/>
                                        </div>
                                        <div id = {styled.buttonname}>
                                            <input type="submit" value="팀 생성하기" id={styled.namebtn} className={styled.namebtn}  />
                                        </div>

                                    </form>
                                </div>
                
                                <div className={styled.line}></div>

                

                                <div className={styled.emailuser}>
                                    <p>이메일로 팀원 초대하기</p>
                                </div>
                
             

                                <div className={styled.EmailTemplate}>
                                    <div className={styled.content}>
                                        <form className={styled.EmailInsert}>
                                            <input className={styled.EmailInsertinput}placeholder="이메일을 입력하세요" value={inputEmail} onChange={handleChange}/>
                                            <button type="button"onClick={handleClick} className={styled.EmailInsertbtn}>추가</button>
                                        </form>

                                        <div className={styled.EmailList}>
                                            {emailList}
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                    
                    } {/*모달 끝*/}
                
                        

                </div>

                <div className={style.TeamList}>
                    <TeamBoard teamListData = {teamListData} noloop = {[noLoop, setNoLoop]} />
                </div>
                
                
                

                





                
            </div>
            <Outlet/>
        </>
    )
}

export default RightNav;


        