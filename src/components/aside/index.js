import React from 'react'
import {Link} from 'react-router-dom'
import styles from './index.module.css'

const Aside = () => {
    return(
        <aside className={styles.asideMain} style={{visibility: 'visible'}}>
            <div className={styles.blockAccount}>
            <div className={styles.blockTitle}> My Account </div>
                <div className={styles.blockContent}>
                    <ul>
                        <li><Link to='/Account'>All posts</Link></li>
                        <li><Link to='/ChangePassword'>Change password</Link></li>                                    
                        <li><Link to='/ChangeAvatar'>Change avatar</Link></li>                                    
                    </ul>
                </div>
            </div>

        </aside>
    )
}

export default Aside