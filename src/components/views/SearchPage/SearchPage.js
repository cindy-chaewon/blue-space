/*import style from './SearchPage.module.css'
import React from 'react';
import axios from 'axios';

function SearchPage() {
    return (
        <div id={style.contents}>
            <div id={style.contents_wrap}>
                <div className={style.searchTitle}>
                    <span className={style.searchKey}>UMC</span>
                    에 대한 검색 결과
                </div>

                <div className = {style.container}>
                    <div className={style.searchInfoTitle}>
                        <div className={style.fileInfoTitle}>
                            파일명
                        </div>
                        <div className={style.uploaderInfoTitle}>
                            업로더
                        </div>
                        <div className={style.dateInfoTitle}>
                            날짜
                        </div>
                        <div className={style.sizeInfoTitle}>
                            파일 사이즈
                        </div>
                    </div>

                    <div className={style.searchInfo}>
                        <div className={style.fileInfo}>
                            <div className={style.fileIcon}>
                                <img src='img/fileIcon.png'></img>
                            </div>
                            <div className={style.fileName}>
                                UMC_Weekly Reports.docs
                            </div>
                        </div>
                        <div className={style.uploaderInfo}>
                            <img src='img/mainpage/userImage.png' className={style.uploaderImg}></img>
                        </div>
                        <div className={style.dateInfo}>
                            2022.07.16 - 12:42 AM
                        </div>
                        <div className={style.sizeInfo}>
                            20MB
                        </div>
                        <div className={style.searchIcons}>
                            <img src='img/bookmarkStar.png'></img>
                            <img src='img/bookmarkTrash.png' className={style.trashIcon}></img>
                        </div>
                        
                    </div>
            
                </div>
            </div>
        </div>
    )
}

export default SearchPage;*/

import style from './SearchPage.module.css'
import React, { useState, useEffect } from "react"
import axios from 'axios';
import {search} from "../../../_actions/user_action";
import { useDispatch } from 'react-redux';
import {Outlet} from "react-router";
import Axios from "axios";

let volume;
function getByte(volume) {
    if(volume<1000) {
        return `${volume} Byte`
    } else if(volume<1000**2) {
        return `${parseInt(volume/1000)} KB`
    } else if(volume<1000**3) {
        return `${parseInt(volume/1000**2)} MB`
    }
}

function SearchPage() {

    const [searchdatas, setSearhData] = useState([]);
    const [noLoop, setNoLoop] = useState(false);
    const userId = sessionStorage.getItem('userId');
    const srcWord = sessionStorage.getItem('srcWord');

    if(userId == "")
    {
        alert("로그인을 해주세요");
    
        document.location.href = '/login'
    }

    useEffect(() => {


            Axios.get(`/search?word=${srcWord}&memberId=${userId}`)
            .then((response) => {

                setSearhData(response.data.result)

                console.log('search useEffect response', response)
                console.log('response.data.result', response.data.result)
                console.log('searchuseEffect', searchdatas)
                // res = ...response;
            })
            .catch((err) => console.log('err in useEffect', err))
    },[noLoop]);


    return (
        <div id={style.contents}>
            <div id={style.contents_wrap}>
                <div className={style.searchTitle}>
                    <span className={style.searchKey}>{srcWord}</span>
                    에 대한 검색 결과
                </div>

                <div className = {style.container}>
                    <div className={style.searchInfoTitle}>
                        <div className={style.fileInfoTitle}>
                            파일명
                        </div>
                        <div className={style.uploaderInfoTitle}>
                            업로더
                        </div>
                        <div className={style.dateInfoTitle}>
                            날짜
                        </div>
                        <div className={style.sizeInfoTitle}>
                            파일 사이즈
                        </div>
                    </div>


                    {searchdatas.map((seardata)=>(
                        <div className={style.searchInfoTitle}>
                            <div className={style.fileInfoTitle}>
                                {seardata.getFilesResponse.originalFileName}
                            </div>
                            <div className={style.uploaderInfoTitle}>
                                {seardata.getFilesResponse.member_name}
                            </div>
                            <div className={style.dateInfoTitle}>
                                {seardata.getFilesResponse.lastModifiedDate}
                            </div>
                            <div className={style.sizeInfoTitle}>
                                {getByte(seardata.getFilesResponse.volume)}
                            </div>
                        </div>
                    ))}




                </div>
            </div>
        </div>
    )
}

export default SearchPage;