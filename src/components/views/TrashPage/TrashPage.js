import style from './TrashPage.module.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import TrashInfo from './TrashInfo'
import { trashForeverAll } from '../../../_actions/user_action'

function TrashPage() {


    const Dispatch = useDispatch();

    const userId = sessionStorage.getItem('userId')
    console.log(userId)
    
    const [trashFileListData, setTrashFileListData] = useState([]);
    const [noLoop, setNoLoop] = useState(false);

    const [redGround, setRedGround] = useState('#267DFF');

    const onHover = (event) => {
        setRedGround('#FF0000');
    }
    const onNotHover = (event) => {
        setRedGround('#267DFF');
    }

    useEffect(() => {
        axios.get(`/trash/${userId}`)
        // axios.get("/main/:memberId")
        .then((response) => {
            console.log("onEffect1 trash", response)
            return response.data.result
            // 여기
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
            setTrashFileListData(itemArr); 
        })
        .catch((err) => console.log("useEffect", err));
    }, [noLoop])

    
    const onTrashForeverAll = () => {
        Dispatch(trashForeverAll(userId))
        .then(response => {
            if(response.payload.isSuccess) {
                setNoLoop(!noLoop);
                console.log("Success in trashForeverAll");      
            } else {
                console.log("ERROR in trashForeverAll");
            }
        })
        .catch(err => console.log("dispatch", err))
        }
        
    return (
        <div id={style.contents}>
            <div id={style.contents_wrap}>
                    
                    <div className={style.trashTitle}>
                        휴지통 목록
                        <button className={style.trashAll} onClick={onTrashForeverAll} onMouseEnter={onHover} onMouseLeave={onNotHover} style={{ backgroundColor : redGround}}>
                            전체삭제
                        </button>
                    </div>

                    <div className = {style.trashContainer}>

                        <div className={style.trashInfoTitle}>
                            <div className={style.fileInfoTitle}>파일명</div>
                            <div className={style.uploaderInfoTitle}>업로더</div>
                            <div className={style.dateInfoTitle}>삭제날짜</div>
                            <div className={style.returnTitle}>복구하기</div>
                            <div className={style.deleteInfoTitle}>영구삭제</div>
                            <div className={style.sizeInfoTitle}>파일 사이즈</div>
                        </div>


                        {trashFileListData.map((trashFileData) => 
                                    <TrashInfo  category={trashFileData.category} userId={userId} noLoop = {noLoop} setNoLoop = {setNoLoop}
                                            info={trashFileData.info} modifiedStatusDate={trashFileData.modifiedStatusDate} />)}
                    </div>
            </div>
        </div>
    )
}

export default TrashPage;