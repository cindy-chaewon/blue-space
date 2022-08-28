import React from "react";
import FileUploadItem from './FileUploadItem'
import style from './FileUpload.module.css';

function FileUploadBoard({fileListData, userId, folderId, noloop}) {
    // console.log("onBoard", fileListData);

    return (
        <div id={style.filesBoard}>
            {fileListData.map((fileData) => <FileUploadItem key={fileData.fileId} fileId={fileData.fileId} filepath={fileData.filePath} originalFileName={fileData.originalFileName} uploadDate={fileData.uploadDate} volume={fileData.volume} bookmarkId={fileData.bookmarkId} userId={userId} folderId={folderId} noLoop = {noloop[0]} setNoLoop = {noloop[1]} />)}
        </div>
    )
}

export default FileUploadBoard;