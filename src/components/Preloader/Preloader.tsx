import { Spin } from 'antd'
import styles from './Preloader.module.scss'

const Preloader = () => {
    return <div className={styles.preloader}>
        <Spin size="large"/>
    </div>
}

export default Preloader

