import React, { useState, useEffect, useRef } from 'react';
import FileUploadBoard from './FileUploadBoard';
import style from './FileUpload.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addFile } from '../../../_actions/user_action'
import Navbar from "../Navbar/Navbar"


const FileUploadPage = () => {
    
    const Dispatch = useDispatch();

    const category = 'file';

    const folderId = sessionStorage.getItem('folderId')
    const userId = sessionStorage.getItem('userId') 

    
    
    const inputRef=useRef();

    const [fileListData, setFileListData] = useState([]);
    const [noLoop, setNoLoop] = useState(false);
    const [File, setFile] = useState("");

    useEffect(() => {
        axios.get(`/folder/${folderId}/files`)
        .then((response) => {
            console.log("on useEffect_file", response.data)
            setFileListData(response.data.result)
            // 받은 (기존에 서버에 저장되어 있던) response를 linklist에 저장함
            // console.log('여기는 useEffect', linkListData);
        })
        .catch((err) => console.log('err in useEffect', err))
  },[noLoop]);


    // const [FileList, setFileList] = useState([]);

    // const fileInput = useRef();


    const onFileHandler = (event) => {
        console.log(event.target.files);
        setFile(event.target.files)
    }

    const onSubmit = (event) => {
        console.log("File", File[0]);

        event.preventDefault();

        const formData = new FormData();
        formData.append('folderId', folderId)
        formData.append('memberId', userId)
        formData.append('multipartFile', File[0])

        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        }

        Dispatch(addFile(formData, config))
        .then(response => {
            console.log(response)
            if(response.payload.isSuccess) {
                console.log("Success in AddFile")
                setNoLoop(!noLoop);

            } else {
                console.log("ERROR in AddFile")
                alert(response.payload.data.message);
            }
        })
        .catch(err => console.log("dispatch", err))
        inputRef.current.value = "";   
    }


    return(
        <div id={style.contents}>
            <div id={style.contents_wrap}>

                    < Navbar category={category}/>

                    <div id={style.fileAdd}> 
                        <form onSubmit={onSubmit} className={style.upload_input} encType="multipart/form-data">
                        
                            <input type="file" id="file" onChange={onFileHandler} className={style.fileInput} ref={inputRef}/>
                            <button type="submit" className={style.fileBtn}>파일 업로드</button>
                            
                            <div className = {style.fileimg}>
                                <img src = "/img/filepage/filechoice.png" />
                            </div>
                        </form>
                        
                        <FileUploadBoard fileListData = {fileListData} userId={userId} folderId={folderId} noloop = {[noLoop, setNoLoop]}/>

                    </div>


            </div>
        </div>
    )   
}


export default FileUploadPage;

