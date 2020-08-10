import React from 'react'
import styles from './index.module.css'
import {Link} from 'react-router-dom'
const Footer = () =>{
    return(
        <div>
            <footer className={styles.footer}>
                <div className={styles.center}>
                <h4 className={styles.text}>DForum</h4>
                <Link  to='/Privacy'>Privacy</Link>
                <img className={styles["left-logo"]} src={require('../../images/fb.png')}/>
                <img className={styles['right-logo']} src={require('../../images/fb.png')}/>
                </div>
            </footer>
        </div>
    )
}

export default Footer