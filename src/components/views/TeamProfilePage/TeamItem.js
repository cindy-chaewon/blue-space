import style from './TeamProfilePage.module.css'

function TeamItem(props) {

    return (
        <div className={style.team_item}>
                <div className={style.team_name}>{props.name}</div>
                <div className={style.team_email}>{props.email}</div>
        </div>
    
    )
}

export default TeamItem