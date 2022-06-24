import { FC, useEffect } from 'react'
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
import './CharacterPage.scss'

const { Title } = Typography

const CharacterPage: FC = () => {
    const dispatch = useAppDispatch()
    const isFetching = useAppSelector(selectIsFetchingCharacters)
    const { id: charId = 1 } = useParams()
    const char = useAppSelector((state) => selectCharacter(state, +charId)) as CharacterType

    useAuthRedirect()

    useEffect(() => {
        dispatch(fetchCharacter(+charId))
    }, [dispatch, charId])

    const handleLikeOrDislike = (method: LikeDislikeEnum, id: number) => {
        dispatch(setLikeOrDislike({ method, id }))
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

    return <Row justify="center">
        <Col md={14} lg={10}>
            <Card
                className="character-card"
                actions={[
                    <LikeIcon
                        key="like"
                        onClick={() => handleLikeOrDislike(LikeDislikeEnum.Like, +charId)}
                    />,
                    <DislikeIcon
                        key="dislike"
                        onClick={() => handleLikeOrDislike(LikeDislikeEnum.Dislike, +charId)}
                    />
                ]}
            >
                <Row gutter={30} align="middle">
                    <Col md={8}>
                        <AvatarUploadForm imgUrl={char.image} handleSetAvatar={handleSetAvatar}/>
                    </Col>
                    <Col md={16}>
                        <Row>
                            <Col md={12}>
                                <div className="char-info">
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Name:</p>
                                        <Title level={3} type={'warning'}>{char.name}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Species:</p>
                                        <Title level={4}>{char.species}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Gender:</p>
                                        <Title level={4}>{char.gender}</Title>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="char-info text-md-end">
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Location:</p>
                                        <Title level={4}>{char.location.name}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Status:</p>
                                        <Title level={4}>{char.status}</Title>
                                    </div>
                                    <div className="info-line mb-3">
                                        <p className="mb-0">Created:</p>
                                        <Title
                                            level={4}>{createDate}</Title>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="info-line mt-5">
                    <p className="mb-0">Episodes:</p>
                    <Title level={5}>{char?.episode.join(', ')}</Title>
                </div>
            </Card>
        </Col>
    </Row>
}

export default CharacterPage