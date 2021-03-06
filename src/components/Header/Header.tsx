import { FC } from 'react'
import { Badge, Button, Col, Layout, Popover, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/avatar.svg'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAuthAvatarUrl, selectAuthUserName, selectIsAuth } from '../../redux/selectors/auth-selectors'
import styles from './Header.module.scss'
import { logout } from '../../redux/slices/auth-slice'
import { selectLikedCharacters } from '../../redux/selectors/characters-selectors'

const { Title } = Typography
const { Header: HeaderANT } = Layout

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    const userName = useAppSelector(selectAuthUserName)
    const avatarUrl = useAppSelector(selectAuthAvatarUrl)
    const likedChars = useAppSelector(selectLikedCharacters)

    const handleLogout = () => dispatch(logout())

    return <HeaderANT className={`${styles.header} d-flex align-items-center`}>
        <Row justify="space-between" align="middle" gutter={30} className={`${styles.headerRow} flex-fill`}>
            <Col className="flex-fill">
                <div className="d-md-flex justify-content-between">
                    <Title type="warning" level={2} className={`${styles.title} m-0`}>
                        <Link to="" className="text-reset">Rick and morty</Link>
                    </Title>
                    {
                        isAuth && likedChars.length > 0 &&
                        <Badge className={`${styles.likesBadge} mt-2`} count={likedChars.length}>
                            <Popover content={likedChars.map(char => <p key={char.id}>{char.name}</p>)}>
                                <Button size="small">Liked characters</Button>
                            </Popover>
                        </Badge>
                    }
                </div>
            </Col>
            <Col className="align-self-end align-self-md-center">
                {
                    isAuth && <Space align="start">
                        <img src={avatarUrl ?? avatar} alt="avatar" width="50px"/>
                        <div className="text-center">
                            <p className={`${styles.loginTxt} mb-1 pt-1`}>{userName}</p>
                            <Button size="small" type="primary" onClick={handleLogout}>Logout</Button>
                        </div>
                    </Space>
                }
            </Col>
        </Row>
    </HeaderANT>
}

export default Header