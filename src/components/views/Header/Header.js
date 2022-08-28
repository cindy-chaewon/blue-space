import {React, useRef, useState} from "react";
import style from './Header.module.css'
import { Link } from "react-router-dom";
import {Outlet} from "react-router"
import Notice_contents from "./Notice_contents";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {loginUser, setSearchFiles} from "../../../_actions/user_action";
// import classNames from 'classnames';
// import useDetectClose from "../../hooks/UseDetectClose";
import {search} from '../../../_actions/user_action';

import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye } from "@fortawesome/free-solid-svg-icons";
import {memberRemove} from "../../../_actions/user_action";

function Header() {
    const Dispatch = useDispatch();
    const navigate = useNavigate();

    // const dropDownRef = useRef(null);
    // const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

    const [dropDown, setDropDown] = useState('none');





    const onClickBell = (event) => {
        setDropDown(dropDown === "block" ? "none" : "block")
    }
    const userId = sessionStorage.getItem('userId');


    const [Word, setWord] = useState("");


    const onWordHandler = (event) => {
        //alert(event.currentTarget.value);
        setWord(event.currentTarget.value);
        sessionStorage.setItem("srcWord",Word);
    }

    
    const onClickLogout=(event)=>{

            sessionStorage.setItem('userId', "");
            sessionStorage.setItem('memberName', "");
            navigate("/login")
    }













    // if (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/findpassword' || window.location.pathname === '/resetpassword') return null;


    return(
        <>
            <div id={style.header}>
    
                <div className={style.searching}>
                    <form name="frm">
                        <input  name="word" className={style.search_txt} id = "{style.wordInput}" type="text"  placeholder="Search Contents" onChange={onWordHandler} />

                        <Link to="/Search" className={style.search_button}>
                            {/* 링크 수정 : 세팅으로 */}
                            <img src="/img/searchLine.png"  />
                        </Link>

                    </form>            
                </div>
    
                <div className={style.gnb}>
             
    
                    {/*<div className={style.notice}>
                        <button className={style.bell_img} onClick={() => onClickBell()}>
                            <img src="/img/setupLine.png" />
                        </button>
    
                        <div className={style.notice_board} style={{display : dropDown}}>
    
                            < Notice_contents />
    
                        </div>
    
    </div>*/}

                    <div claaName={style.logoutbtn}>
                        <button className={style.logout} onClick={onClickLogout} >로그아웃</button>
                    </div>
 
                    <p className={style.user_name}>{sessionStorage.getItem('memberName')}</p>
                </div>
            </div>

            <Outlet />
        </>
    )

}

export default Header;







