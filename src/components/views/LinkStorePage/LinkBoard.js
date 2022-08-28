import React from "react";
import LinkItem from './LinkItem'
import style from './LinkStorePage.module.css';

function LinkBoard({ linkListData, userId, folderId, noloop }) {
    // linkListData.map((linkData) => console.log('board', typeof(linkData)));
    // linkListData.map((linkData) => linkData.map((element) => console.log(element)));
    // console.log("onBoard", linkListData);

    // console.log("여기는 LinkBoard", linkListData);
    // linkListData.map((linkData) => console.log("123", linkData));
    // console.log(noloop);
    return (
        <div id={style.linksBoard}>
            {linkListData.map((linkData) => <LinkItem key={linkData.linkId} linkId={linkData.linkId} link={linkData.url} name={linkData.name} uploadDate={linkData.uploadDate} bookmarkId={linkData.bookmarkId} userId={userId} folderId={folderId} noLoop = {noloop[0]} setNoLoop = {noloop[1]}/>)}
        </div>
    )
}

export default LinkBoard;