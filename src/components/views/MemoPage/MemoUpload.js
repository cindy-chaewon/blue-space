// import '../App.css';
import style from './MemoUpload.module.css'
import MemoPreview from './MemoPreview';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addMemo} from '../../../_actions/user_action'
import Navbar from "../Navbar/Navbar"

function MemoUpload() {

    const Dispatch = useDispatch();

    const category = 'memo';
    
    const folderId = sessionStorage.getItem('folderId')
    const userId = sessionStorage.getItem('userId')
    console.log(123, folderId, userId)
    const [memoListData, setMemoListData] = useState([]);

    const [noLoop, setNoLoop] = useState(false);

    useEffect(() => {
        axios.get(`/folder/${folderId}/memos`)
        .then((response) => {
            setMemoListData(response.data.result)
            console.log('useEffect', memoListData)
            // res = ...response;
        })
        .catch((err) => console.log('err in useEffect', err))
    },[noLoop]);

    const onAddDetailDiv = () => {
      
        let newMemo = {
            "name" : "",
            "content" : "",
            "folderId" : folderId,
            "memberId" : userId
        }
        
        Dispatch(addMemo(newMemo))
        .then(response => {
            console.log(response);
            if(response.payload.isSuccess) {
                console.log("success in AddMemo")
                setNoLoop(!noLoop)
            } else {
                console.log("Error in AddMemo")
            }
        })
        .catch(err => console.log("dispatch", err))
    }

  return (
        <div id={style.contents}>
            <div id={style.contents_wrap}>


                    < Navbar category={category}/>

                    <div className={style.memoStore}>
                        <button className={style.MemoBtn} onClick={onAddDetailDiv}>
                            <img src="/img/memopage/uploadmemo.png" />
                            <div>
                                메모 작성하기
                            </div>
                        </button>


                        <div className={style.preview_container}>
                            <div></div>
                            {memoListData.map((memoData) => <MemoPreview key={memoData.memoId} memoId={memoData.memoId} name={memoData.name} 
                                content={memoData.content} bookmarkId={memoData.bookmarkId} 
                                userId={userId} folderId={folderId} noLoop = {noLoop} setNoLoop = {setNoLoop}/>)}
                        </div>
                    </div>

            </div>
        </div>

  );
}


export default MemoUpload;
