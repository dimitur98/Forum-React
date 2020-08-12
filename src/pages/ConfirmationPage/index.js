import React,{useEffect,useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import styles from './index.module.css'
const ConfirmationPage = () => {
    const params = useParams()
    const [err, setErr] = useState(false)
    const confirmEmail = async() => {
        const promise = await fetch(`http://localhost:9999/api/user/confirm/${params.uuid}/${params.userId}`)
        const res = await promise.json()
        console.log(res)
        if(res.status === 401){
            setErr(true)
        }
    }

    useEffect(() => {
        confirmEmail()
    },[])
    if(err){
        return(
            <PageWrapper>
                <div className={styles.center}>
                    Confirmation email is not valid!
                </div>
            </PageWrapper>
        )
    }
    return(
        <PageWrapper title='Confirm your email - DForum'>
            <div className={styles.center}>
                Congratulations! You just confirmed your email. Please <Link to='/Login'>log in</Link> to your account.
            </div>
        </PageWrapper>
    )
}

export default ConfirmationPage