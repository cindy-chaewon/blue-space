import React, { useState, useEffect } from "react";
import axios from 'axios';
import MemberFolder from './MemberFolder'
import { useDispatch } from 'react-redux';
import style from './LeftNav.module.css'
import styled from './ModalLeft.module.css'
import {Outlet} from "react-router"
import {MyFolder} from '../../../_actions/user_action'
import { Link } from "react-router-dom";


function LeftNav() {

    
    

    const [memberFolderData, setMemberFolderData] = useState([]);
    const [noLoop, setNoLoop] = useState(false);
    const userId = sessionStorage.getItem('userId');
    

    useEffect(() => {
        axios.get(`http://3.37.214.20:8080/folder/member/${userId}`)
        .then((response) => {
            setMemberFolderData(response.data.result)
            console.log('useEffect', response)
        })
        .catch((err) => console.log('err in useEffect', err))
    },[noLoop]);
    // 페이지 로딩

    // wrap을 씌우면 안됨(?) : 색깔 변경이 좌우 양끝까지 해야함
    const [isOpen, setIsOpen] = useState(false);
  
    const [arrowOn, setArrowOn] = useState(false);
    // 화살표
    const [textColor, setTextColor] = useState('#4f4f4f');

    const [boxBackColor, setBoxBackColor] = useState('#fff');

    const [plusVisible, setPlusVisible] = useState('hidden');
    
    const toggleMenu = () => {
        setIsOpen(isOpen => !isOpen); // on,off 개념 boolean
    }
    
    const arrowVisible = () => {
        setArrowOn(arrowOn => !arrowOn);
    }

    const onClickHandler = () => {
        arrowVisible();
        setTextColor(textColor === "#4f4f4f" ? "#267DFF" : "#4f4f4f")
        setBoxBackColor(boxBackColor === "#fff" ? "#F6F9FD" : "#fff")
        toggleMenu();
    }

    const closeModal = () => {
        handlePopup(false);
    };

    const [popup, handlePopup ] = useState(false);

    /*모달 관련*/
    const Dispatch = useDispatch();
    
    const [Name, setName] = useState("");

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }



    /*팀 생성하기 데이터 보내는*/
    const onSubmitHandler =  (event) => {
        event.preventDefault();
        
    
        let body = {
            
            "folder_case" : "member",
            "id" :sessionStorage.getItem('userId'),
            "folder_name" : Name,
            "creatorId":sessionStorage.getItem('userId')
    
    
        }
                
        Dispatch(MyFolder(body))
        .then(response =>{
            //폴더 아이디
            sessionStorage.setItem('folderId', response.payload.data.result.folderId);
            console.log('useEffectfolderId1',response.payload.data.result.folderId )
    
            if(response.payload.data.code === 1000) {
    
                console.log("확인111", response);
                setNoLoop(!noLoop);
                    
            } else {
                console.log("확인222", response);
                alert(response.payload.data.message);
            
            }
        })
            
    
    }

    // if (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/findpassword' || window.location.pathname === '/resetpassword') return null;
    



    return (
        <>
            <div id={style.side_left}>
                {/* <img className = {style.left_line} src="/img/leftLineGray.png" /> */}

                <Link to='/' className = {style.helper_logo}>
                    <img className={style.logo_img} src="/img/logoRectangle.png" />
                    <div className = {style.helper_text}>
                        <p>과제헬퍼</p>
                    </div>
                </Link>
            
                <div className={style.menu_wrap}>
                    <div className={style.myfolder} style={{backgroundColor:boxBackColor}}>

                        <div className={style.myfolder_btn} onClick={()=>onClickHandler()}>

                            <img src="/img/downarrow_navright.svg" className={style.down_arrow}/>
                            {/* 이게 아래 화살표 */}

                            <img className={style.menu_img} src = "/img/homeLine.png" />
                            {/* fontawesome */}

                            <div className = {style.menu_title} style={{color:textColor}}><p>내 폴더</p></div>
                            {/* 이게 팀 폴더 이름 */}

                        </div>
                        <button>
                            <img src="/img/common_img/plus_icon.svg" className={style.add_folder} onClick={() => { handlePopup(true);} }/>
                        </button>
                        {popup && 
                        <div className={styled.popup} >
                            <div className={styled.popupdiv}>
                                <div className={styled.remove} >
                                    <img src="/img/common_img/removeImg.png"  onClick={closeModal}/>
                                </div>
                                <div className={styled.nameuser}>
                                    <p>내폴더명</p>
                                </div>
                                <div className={styled.nameform}>
                                    <form onSubmit={onSubmitHandler}>
                                        <div id={styled.name}>
                                            <input type="name" name="name"  className={styled.nametxt} id={styled.nameInput} value={Name} onChange={onNameHandler}/>
                                        </div>
                                        <div id = {styled.buttonname}>
                                            <input type="submit" value="폴더 생성하기" id={styled.namebtn} className={styled.namebtn} />
                                        </div>

                                    </form>
                                </div>
                            </div>
                 
                        </div>
                        
                        
                        
                        }

                    </div>
                        <div className={style.sub_folderlist} id={isOpen ? style.show_menu : style.hide_menu}>

                            <MemberFolder memberFolderData={memberFolderData} noloop = {[noLoop, setNoLoop]} />

                        </div>
                        
                        <Link to='/bookmark' className={style.favorites}>               

                            <img className={style.menu_img} src = "/img/common_img/star_line.svg" />
                            {/* fontawesome */}

                            <div className = {style.menu_title}>
                                <p>즐겨찾기</p>
                            </div>
                            {/* 이게 팀 폴더 이름 */}

                    </Link> 

                    <Link to='/trash' className={style.trashbin}>

                            

                            <img className={style.menu_img} src = "/img/common_img/trashbin.svg" />
                            {/* fontawesome */}

                            <div className = {style.menu_title}>
                                <p>휴지통</p>
                            </div>
                            {/* 이게 팀 폴더 이름 */}

                    </Link>
                    
                    
                </div>

            </div>
            <Outlet/>
        </>
        )
    }

export default LeftNav;

{/* <span className={style.down_arrow} id={arrowOn ? style.show_arrow : style.hide_arrow}></span> */}