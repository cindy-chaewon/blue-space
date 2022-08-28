import style from './TeamProfilePage.module.css'

function TeamItem(props) {

    return (
        <div className={style.team_item}>
            <div className={style.teamwrapper}>
                <span className={style.team_name}>{props.name}</span>
                <span className={style.team_email}>{props.email}</span>
            </div>
        </div>
    
    )
}

export default TeamItem