import { FC } from 'react'
import { Typography } from 'antd'
import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom'

const { Title } = Typography

const NotFound: FC = () => {
    return <div className={`${styles.notFound} ant-space ant-space-align-center text-center ant-row-center`}>
        <div>
            <Title>There's nothing here!</Title>
            <Link to="/">Go Home</Link>
        </div>
    </div>
}

export default NotFound