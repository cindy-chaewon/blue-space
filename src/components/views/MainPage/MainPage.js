import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from "./MainPage.module.css";
import FileItem from "./FileItem.js";

// item[item.category]
// info = item[item.category]


function MainPage () {

    const userId = sessionStorage.getItem('userId')
    console.log(userId)
    
    const [recentFileListData, setRecentFileListData] = useState([]);
    

    useEffect(() => {
        axios.get(`/main/${userId}`)
        // axios.get("/main/:memberId")
        .then((response) => {
            console.log("onEffect1", response)
            return response.data.result.allItemList
            })
        .then((itemArr) => {
            console.log("onEffect2", itemArr)

            itemArr.map((item) => {
                item.info = item[item.category]
                item[item.category] = null;
                for(let key in item) {
                    if(item[key] == null) {
                        delete item[key];
                    }
                }
            })

            console.log("newArr", itemArr);
            setRecentFileListData(itemArr); 
        })
        .catch((err) => console.log("useEffect", err));
    }, [])

    
    return(
        <div id={style.contents}>
            <div id={style.contents_wrap}>

                    <div className={style.recent_file}>
                            <p className={style.recent_file_title}>최근파일 리스트</p>

                            <div className={style.recent_file_list}>

                                <div className={style.file_property}>
                                    <div className={style.file_title_type}>파일명</div>
                                    <div className={style.file_title_uploader}>업로더</div>
                                    <div className={style.file_title_date}>날짜</div>
                                    <div className={style.file_title_size}>파일 사이즈</div>
                                    <div className={style.file_title_location}>파일 위치</div>
                                </div>
                                {recentFileListData.map((recentFileData) => 
                                <FileItem  category={recentFileData.category} 
                                        info={recentFileData.info} lastModifiedDate={recentFileData.lastModifiedDate} />)}
                                
                            </div>
                    </div>
            </div>
        </div>
    )
}


export default MainPage;

// 정보 동적으로 받기 (map 사용하기)