import Axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, PERSONAL_IMG } from './types'
import { TEAM_USER } from './types'
import { MY_FOLDER, TEAM_FOLDER, TEAM_REMOVE, TRASH_MYFOLDER, TRASH_TEAMFOLDER } from './types'
import { ADD_FILE, TRASH_FILE, BMOFF_FILE, BMON_FILE } from './types'
import { ADD_LINK, TRASH_LINK, BMOFF_LINK, BMON_LINK, CHANGE_LINK } from './types'
import { ADD_MEMO, CHANGE_MEMO, TRASH_MEMO, BMOFF_MEMO, BMON_MEMO } from './types'
import { TRASH_FOREVER, TRASH_FOREVER_ALL, TRASH_BACK } from './types'
import { BM_OFF } from './types'
import { SEARCH } from './types'


// api : 1
export function loginUser(dataToSubmit) {
    
    const request = Axios.post("/member/sign-in", dataToSubmit)
    .then(response => response.data)
    return {
        type : LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataToSubmit) {
    
    const request = Axios.post('/member/register', dataToSubmit)

    .then(response => response.data)
    return {
        type : REGISTER_USER,
        payload : request
    }
}

export function auth() {

    const request = Axios.get('/api/users/auth')    // get은 body가 필요 없음

    return {
        type : AUTH_USER,
        payload : request
    }
}

export function personalimgUser(dataToSubmit) {

    const userId = sessionStorage.getItem('userId');

    const request = Axios.patch(`/member/edit/profile/${userId}`, dataToSubmit)
    .then(response => response.data)

    return {
        type : PERSONAL_IMG,
        payload : request
    }
}


// api : 2
export function teamUser(dataToSubmit) {
    
    const request = Axios.post('/team', dataToSubmit);


    request.then(response => response.data)

    return {
        type : TEAM_USER,
        payload : request
    }
}

export function teamRemove(teamId, creatorId) {

    const request = Axios.delete(`/team/delete/${teamId}/${creatorId}`)
    .then(response => response.data)



    return {
        type : TEAM_REMOVE,
        payload : request
    }
}

// api : 3

export function MyFolder(dataToSubmit) {
    
    const request = Axios.post('/folder', dataToSubmit);


    request.then(response => response.data)

    return {
        type : MY_FOLDER,
        payload : request
    }
}

export function TeamFolder(dataToSubmit) {
    
    const request = Axios.post('/folder', dataToSubmit);


    request.then(response => response.data)

    return {
        type : TEAM_FOLDER,
        payload : request
    }
}

export function trashMyFolder(folderId, creatorId) {

    const request = Axios.patch(`/folder/${folderId}/${creatorId}`)
    // /folder/link/trash/:linkId/:memberId
    .then(response => response.data)

    return {
        type : TRASH_MYFOLDER,
        payload : request
    }

}

export function trashTeamFolder(folderId, creatorId) {

    const request = Axios.patch(`/folder/${folderId}/${creatorId}`)
    // /folder/link/trash/:linkId/:memberId
    .then(response => response.data)

    return {
        type : TRASH_TEAMFOLDER,
        payload : request
    }

}

// api : 4

export function addFile(dataToSubmit, config) {

    const request = Axios.post("/folder/file", dataToSubmit, config)
    .then(response => response.data)

    return {
        type : ADD_FILE,
        payload : request
    }
}


export function trashFile(fileId, memberId) {

    const request = Axios.patch(`/folder/file/trash/${fileId}/${memberId}`)
    // /folder/link/trash/:linkId/:memberId
    .then(response => response.data)

    return {
        type : TRASH_FILE,
        payload : request
    }

}

export function bookmarkOffFile(bookmarkId) {

    const request = Axios.delete(`/bookmark/${bookmarkId}`)
    .then(response => response.data)

    return {
        type : BMOFF_FILE,
        payload : request
    }
}

export function bookmarkOnFile(folderId, fileId, userId) {

    const request = Axios.post(`/folder/file/bookmark/${folderId}/${fileId}/${userId}`)
    
    .then(response => response.data)

    return {
        type : BMON_FILE,
        payload : request
    }
}

// api : 6

export function addLink(dataToSubmit) {

    const request = Axios.post("/folder/link", dataToSubmit)
    .then(response => response.data)

    return {
        type : ADD_LINK,
        payload : request
    }
}
// linkstorepage에 있음

export function trashLink(linkId, memberId) {

    const request = Axios.patch(`/folder/link/trash/${linkId}/${memberId}`)
    // /folder/link/trash/:linkId/:memberId
    .then(response => response.data)

    return {
        type : TRASH_LINK,
        payload : request
    }

}
// linkstorepage에 있음
// memberid 해결필요

// export function bookmarkOff(bookmarkId) {

//     const request = Axios.delete(`/bookmark/${bookmarkId}`)
//     .then(response => response.data)

//     return {
//         type : BM_OFF,
//         payload : request
//     }
// }

export function bookmarkOnLink(folderId, linkId, userId) {

    const request = Axios.post(`/folder/link/bookmark/${folderId}/${linkId}/${userId}`)
    
    .then(response => response.data)

    return {
        type : BMON_LINK,
        payload : request
    }
}

export function changeLink(dataToSubmit, linkId) {

    const request = Axios.patch(`/folder/link/${linkId}`, dataToSubmit)
    //console.log("link req", dataToSubmit)

    .then(response => response.data)

    return {
        type : CHANGE_LINK,
        payload : request
    }
}

// api : 7
export function addMemo(dataToSubmit) {
    const request = Axios.post(`/folder/memo`, dataToSubmit)
    .then(response => response.data)

    return {
        type : ADD_MEMO,
        payload : request
    }
}

export function changeMemo(dataToSubmit, memoId) {
    const request = Axios.patch(`/folder/memo/${memoId}`, dataToSubmit)
    .then(response => response.data)

    return {
        type : CHANGE_MEMO,
        payload : request
    }
}

export function trashMemo(memoId, memberId) {
    const request = Axios.patch(`/folder/memo/trash/${memoId}/${memberId}`)
    .then(response => response.data)

    return {
        type : TRASH_MEMO,
        payload : request
    }
}

export function bookmarkOffMemo(bookmarkId) {

    const request = Axios.delete(`/bookmark/${bookmarkId}`)
    // /bookmark/:bookmarkId
    .then(response => response.data)

    return {
        type : BMOFF_MEMO,
        payload : request
    }
}

export function bookmarkOnMemo(folderId, memoId, userId) {

    const request = Axios.post(`/folder/memo/bookmark/${folderId}/${memoId}/${userId}`)
    
    .then(response => response.data)

    return {
        type : BMON_MEMO,
        payload : request
    }
}

// api : 8

export function trashForeverAll(userId) {

    const request = Axios.delete(`/trash/${userId}`)
    .then(response => response.data)

    return {
        type : TRASH_FOREVER_ALL,
        payload : request
    }
}

export function trashBack(category, itemId, userId) {

    const request = Axios.patch(`/trash/restore/${category}/${itemId}/${userId}`)
    .then(response => response.data)

    return {
        type : TRASH_BACK,
        payload : request
    }
}

export function trashForever(category, itemId, userId) {

    const request = Axios.delete(`/trash/delete/${category}/${itemId}/${userId}`)
    .then(response => response.data)

    return {
        type : TRASH_FOREVER,
        payload : request
    }
}


export function bookmarkOff(bookmarkId) {

    const request = Axios.delete(`/bookmark/${bookmarkId}`)
    .then(response => response.data)

    return {
        type : BM_OFF,
        payload : request
    }
}

// api : 11

export function search(word, userId) {

    const request = Axios.get(`/search?word=${word}&memberId=${userId}`)  // get은 body가 필요 없음

        .then(response => response.data)
    return {
        type : SEARCH,
        payload : request
    }
}