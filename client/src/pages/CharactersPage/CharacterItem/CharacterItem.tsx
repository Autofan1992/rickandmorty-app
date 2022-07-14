import { CharacterStatusEnum, CharacterType } from '../../../types/character-types'
import styles from '../Characters.module.scss'
import { Button, Col } from 'antd'
import { Link } from 'react-router-dom'
import { FC } from 'react'

const CharacterItem: FC<CharacterType> = (char) => {
    const statusClass = char.status === CharacterStatusEnum.Alive ? styles.alive
        : char.status === CharacterStatusEnum.Dead ? styles.dead
            : ``

    return <Col key={char.id} md={8} lg={12} xxl={8}>
        <div className={`${styles.characterCard} d-flex flex-column flex-lg-row`}>
            <div className={styles.cardImg}>
                <img src={char.image} alt={char.name}/>
            </div>
            <div className={`${styles.cardContent} d-flex flex-column p-3`}>
                <h2 className="text-reset">{char.name}</h2>
                <p className="d-flex align-items-center mb-3">
                    <span className={`${styles.status} ${statusClass}`}></span>
                    <span>{char.status}</span>
                    <span className="px-1">-</span>
                    <span>{char.gender}</span>
                </p>
                <div className="info-line">
                    <p className="text-white-50 mb-1">Last known location:</p>
                    <p className="fw-bold fs-6">{char.location.name}</p>
                </div>
                <div className="mt-auto">
                    <Button>
                        <Link to={`${char.id}`}>Visit character's page</Link>
                    </Button>
                </div>
            </div>
        </div>
    </Col>
}

export default CharacterItem