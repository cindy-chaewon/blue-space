// import '../App.css';
import style from './MemoUpload.module.css'
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {changeMemo, trashMemo, bookmarkOffMemo, bookmarkOnMemo} from '../../../_actions/user_action'

function MemoPreview(props) {

    const Dispatch = useDispatch();

    const [titleInputData, setTitleInputData] = useState(props.name);

    const handleTitle = (event) => {
        setTitleInputData(event.currentTarget.value);
    }

    let divTitle = (titleInputData == "") ? "Untitled" : titleInputData

    const [contentInputData, setContentInputData] = useState(props.content);

    const handleContent = (event) => {
        setContentInputData(event.currentTarget.value);
    }

    let divContent = (contentInputData == "") ? "UnContented" : contentInputData

    const [editable, setEditable] = useState(false);
    const [blueBorder, setBlueBorder] = useState('none');

    const editOn = () => {
            setEditable(true)
            setBlueBorder("3px solid #267DFF")
    }
    // 더블클릭하면 input

    const ref = useRef(null);

      const clickOutsideInput = (e) => {
        if (editable === true && !ref.current.contains(e.target)) {
            setEditable(false)
            setBlueBorder("none")
            console.log("down by outdbclick")
            
            let requestMemo = {
                "name" : titleInputData,
                "content" : contentInputData,
                "memberId" : props.userId
            }
            // console.log(requestMemo);
            Dispatch(changeMemo(requestMemo, props.memoId))
            .then(response => {
                if(response.payload.isSuccess) {
                    props.setNoLoop(!props.noLoop);
                    console.log("Success in ChangeMemo");      
                } else {
                    console.log("ERROR in ChangeMemo");
                }
            })
            .catch(err => console.log("dispatch", err))
            
            // setEditable(false)
        };
      };

      useEffect(() => {
        window.addEventListener("click", clickOutsideInput, true);
      });
      

      const onTrashHandler = () => {
        
        Dispatch(trashMemo(props.memoId, props.userId))
        .then(response => {
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in TrashMemo");      
            } else {
                console.log("ERROR in TrashMemo");
            }
        })
        .catch(err => console.log("dispatch", err))
    }    

    const setToInput = (event) => {
        editOn();
    }

    const setToDiv = (event) => {

        if (editable === true) {
            setEditable(false)
            setBlueBorder("none")
            console.log("down by outdbclick")
            
            let requestMemo = {
                "name" : titleInputData,
                "content" : contentInputData,
                "memberId" : props.userId
            }
            // console.log(requestMemo);
            Dispatch(changeMemo(requestMemo, props.memoId))
            .then(response => {
                if(response.payload.isSuccess) {
                    props.setNoLoop(!props.noLoop);
                    console.log("Success in ChangeMemo");      
                } else {
                    console.log("ERROR in ChangeMemo");
                }
            })
            .catch(err => console.log("dispatch", err))
            
            // setEditable(false)
        };
      };



    const onBookmarkOffMemo = () => {
        Dispatch(bookmarkOffMemo(props.bookmarkId))
        .then(response => { 
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in bookmarkOff");
            } else {
                console.log('ERROR in bookmarkOff');
            }
        })
        .catch(err => console.log("dispatch bookmarkoff", err))
    }
    
    const onBookmarkOnMemo = () => {
        
        Dispatch(bookmarkOnMemo(props.folderId, props.memoId, props.userId))
        .then(response => { 
            console.log(response);
            if(response.payload.isSuccess) {
                props.setNoLoop(!props.noLoop);
                console.log("Success in bookmarkOn");
            } else {
                console.log('ERROR in bookmarkOn');
            }
        })
        .catch(err => console.log("dispatch", err))
    }

    return (

            <div className={style.MemoPreview}  style={{ border : blueBorder}} >
                <div onDoubleClick={editOn} ref={ref}>
                    <div className={style.TitleInput}>
                        {editable ? (<input type="text" placeholder="제목" name="title" value={titleInputData} onChange={handleTitle} className={style.MemoTitle} ></input>) :
                            (<div className={style.MemoTitle}>{divTitle}</div>)}
                        {/* <input type="text" placeholder="제목" name="title" className={style.MemoTitle} disabled></input> */}
                    </div>

                    <div className={style.TextInput}>
                        {editable ? (<textarea type="text" placeholder="본문" name="text" value={contentInputData} onChange={handleContent} className={style.MemoText} rows="6"></textarea>) : 
                            (<div className={style.MemoText}>{divContent}</div>)}
                        {/* <textarea type="text" placeholder="메모를 입력하세요..." name="text" className={style.MemoText} rows="6"></textarea> */}
                    </div>

                <div className={style.buttonContainer} >

                    {editable ? ( <button className={style.changeBtn} onClick={setToDiv}>완료</button>) : 
                        (<button src="img/common_img/star_line.svg" alt="star" className={style.changeBtn} onClick={setToInput}>수정</button>)} 

                    <img className={style.TrashIcon} src='/img/common_img/trashbin.svg' onClick={onTrashHandler}/>
                </div>

                </div>
                
            </div>


    );
}

export default MemoPreview;