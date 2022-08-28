import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";
import { TEAM_USER } from "../_actions/types";
import { MY_FOLDER, TEAM_FOLDER, TEAM_REMOVE, TRASH_MYFOLDER, TRASH_TEAMFOLDER } from "../_actions/types";
import { ADD_FILE, TRASH_FILE, BMON_FILE } from "../_actions/types";
import { ADD_LINK, TRASH_LINK,  BMON_LINK, CHANGE_LINK } from "../_actions/types";
import { ADD_MEMO, CHANGE_MEMO, TRASH_MEMO, BMON_MEMO } from "../_actions/types";
import { TRASH_FOREVER, TRASH_FOREVER_ALL, TRASH_BACK } from "../_actions/types";
import { BM_OFF } from "../_actions/types";
import { SEARCH } from "../_actions/types";


export default function (state = {}, action) {
    switch (action.type) {
        // api : 1
        case LOGIN_USER :
            return {...state, loginSuccess : action.payload}
            break;

        case REGISTER_USER :
            return ({...state, ...action.payload})
            break;

        case AUTH_USER :
            return {...state, userData : action.payload}    // auth가 response하는 것 : userData json파일, 이걸 받아서 state에 변경 (새로 만듬)
            break;

        // api : 2
        case TEAM_USER :
            return {...state, teammakeSuccess : action.payload}
            break;

        //api 3
        case MY_FOLDER :
            return {...state, myfolderSuccess : action.payload}
            break;
        
        case TEAM_FOLDER :
            return {...state, teamfolderSuccess : action.payload}
            break;

        case TEAM_REMOVE :
            return {...state, teamremoveSuccess : action.payload}
            break;

        case TRASH_MYFOLDER :
            return {...state, trashmyfolderSuccess : action.payload}
            break;
        
        case TRASH_TEAMFOLDER :
            return {...state, trashteamfolderSuccess : action.payload}
            break;

        // api : 4
        case ADD_FILE :
            return ({...state, ...action.payload})
            break;

        case TRASH_FILE :
            return ({...state, ...action.payload})
            break;

        case BMON_FILE :
            return ({...state, ...action.payload})
            break;
    
        // api : 6
        case ADD_LINK :
            return ({...state, ...action.payload})
            break;

        case TRASH_LINK : 
            return ({...state, ...action.payload})
            break;

        case BMON_LINK : 
            return ({...state, ...action.payload})
            break;

        case CHANGE_LINK : 
            return ({...state, ...action.payload})
            break;

        // api : 7
        case ADD_MEMO : 
            return  ({...state, ...action.payload})
            break;

        case CHANGE_MEMO : 
            return  ({...state, ...action.payload})
            break;
        
        case TRASH_MEMO : 
            return  ({...state, ...action.payload})
            break;

        case BMON_MEMO : 
            return  ({...state, ...action.payload})
            break;


        // api : 8
        case TRASH_FOREVER_ALL : 
            return  ({...state, ...action.payload})
            break;

        case TRASH_BACK : 
            return  ({...state, ...action.payload})
            break;
        
        case TRASH_FOREVER : 
            return  ({...state, ...action.payload})
            break;

        // api : 9
        case BM_OFF :
            return ({...state, ...action.payload})
            break;
        default :
            return state;

        
    }
}