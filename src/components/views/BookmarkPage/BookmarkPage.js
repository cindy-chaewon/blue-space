import style from './BookmarkPage.module.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import BookmarkInfo from './BookmarkInfo'

function BookmarkPage() {

    const Dispatch = useDispatch();

    const userId = sessionStorage.getItem('userId')

    const [bookmarkFileListData, seBookmarkFileListData] = useState([]);
    const [noLoop, setNoLoop] = useState(false);

    useEffect(() => {
        axios.get(`/bookmark/${userId}`)
        // axios.get("/main/:memberId")
        .then((response) => {
            console.log("onEffect1", response)
            return response.data.result
            // 여기
            })
        .then((itemArr) => {
            console.log("onEffect2", itemArr)

            itemArr.map((item) => {
                console.log('item',item);
                item.info = item[item.category]
                item[item.category] = null;
                for(let key in item) {
                    if(item[key] == null) {
                        delete item[key];
                    }
                }
            })

            console.log("newArr", itemArr);
            seBookmarkFileListData(itemArr); 
        })
        .catch((err) => console.log("useEffect", err));
    }, [noLoop])    



    return (
        <div id={style.contents}>
            <div id={style.contents_wrap}>

                <div className={style.bookmarkTitle}>
                    즐겨찾기 목록
                </div>

                <div className = {style.bookmarkContainer}>

                    <div className={style.bookmarkInfoTitle}>

                        <div className={style.fileInfoTitle}>파일명</div>
                        <div className={style.uploaderInfoTitle}>업로더</div>
                        <div className={style.dateInfoTitle}>날짜</div>
                        <div className={style.sizeInfoTitle}>파일 사이즈</div>

                    </div>

                    {bookmarkFileListData.map((bookmarkFileData) => 
                                <BookmarkInfo  category={bookmarkFileData.category} bookmarkId={bookmarkFileData.bookmarkId} 
                                                userId={userId} noLoop = {noLoop} setNoLoop = {setNoLoop}
                                                uploadDate={bookmarkFileData.uploadDate} info={bookmarkFileData.info}/>)}
                    
                </div>
            </div>
        </div>
    )
}

export default BookmarkPage;