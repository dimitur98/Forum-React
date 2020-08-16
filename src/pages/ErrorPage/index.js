import React from 'react'
import PageWrapper  from '../../components/pageWrapper'
import styles from './index.module.css'
const ErrorPage = () => {
    return(
        <PageWrapper>
            <div className={styles.center}>
            <h2>Something went wrong!</h2>
            <img className={styles.errorImg} src={require('../../images/error.jpg')}/>
            </div>
        </PageWrapper>
    )
}

export default ErrorPage