import { FC, memo, useEffect } from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectCharacter, selectIsFetchingCharacters } from '../../redux/selectors/characters-selectors'
import { fetchCharacter, setCharacterAvatar, setLikeOrDislike } from '../../redux/slices/characters-slice'
import { isEmpty } from 'lodash'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import Preloader from '../../components/common/Preloader/Preloader'
import { CharacterType, LikeDislikeEnum } from '../../types/character-types'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import AvatarUploadForm from '../../components/Login/AvatarUploadForm/AvatarUploadForm'
import styles from './Character.module.scss'

const { Title } = Typography

const Character: FC<PropsType> = memo(({ windowWidth }) => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(selectIsFetchingCharacters)
    const { id: charId = 1 } = useParams()
    const char = useAppSelector((state) => selectCharacter(state, +charId)) as CharacterType

    useAuthRedirect()

    useEffect(() => {
        dispatch(fetchCharacter(+charId))
    }, [dispatch, charId])

    const handleLikeOrDislike = (method: LikeDislikeEnum) => {
        dispatch(setLikeOrDislike({ method, id: +charId }))
    }

    const handleSetAvatar = (url: string) => {
        dispatch(setCharacterAvatar({ url, id: +charId }))
    }

    if (isFetching) {
        return <Preloader/>
    }

    if (isEmpty(char)) {
        return <div className="text-center">
            <Title>Character not found. Please try another id</Title>
            <Link to={'/'}>Go Home</Link>
        </div>
    }

    const createDate = new Date(char.created).toLocaleString()

    const LikeIcon = char.liked ? LikeFilled : LikeOutlined
    const DislikeIcon = char.disliked ? DislikeFilled : DislikeOutlined

    const titleLevel = windowWidth > 767 ? 4 : 5

    return <Row justify="center">
        <Col md={22} lg={16} xl={12} xxl={10}>
            <Card
                className={styles.characterCard}
                actions={[
                    <LikeIcon
                        key="like"
                        onClick={() => handleLikeOrDislike(LikeDislikeEnum.Like)}
                    />,
                    <DislikeIcon
                        key="dislike"
                        onClick={() => handleLikeOrDislike(LikeDislikeEnum.Dislike)}
                    />
                ]}
            >
                <Row gutter={15} align="middle">
                    <Col md={8}>
                        <div className={styles.forAvatar} data-icon="📷">
                            <AvatarUploadForm listType="picture" imgUrl={char.image} handleSetAvatar={handleSetAvatar}/>
                        </div>
                    </Col>
                    <Col xs={24} md={16} className="mt-3 mt-md-0">
                        <Row gutter={15}>
                            <Col xs={12}>
                                <div className="char-info">
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Name:</p>
                                        <Title level={titleLevel} type={'warning'}>{char.name}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Species:</p>
                                        <Title level={titleLevel}>{char.species}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Gender:</p>
                                        <Title level={titleLevel}>{char.gender}</Title>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="char-info text-md-end">
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Location:</p>
                                        <Title level={titleLevel}>{char.location.name}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Status:</p>
                                        <Title level={titleLevel}>{char.status}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Created:</p>
                                        <Title level={titleLevel}>{createDate}</Title>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="info-line mt-3 mt-md-5">
                    <p className="mb-0">Episodes:</p>
                    <Title level={5}>{char.episode.join(', ')}</Title>
                </div>
            </Card>
        </Col>
    </Row>
})

type PropsType = {
    windowWidth: number
}

export default Character