import { FC, useEffect } from 'react'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import { Pagination, Row, Typography } from 'antd'
import AutoCompleteForm from '../../components/Characters/AutoCompleteForm/AutoCompleteForm'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCharacters } from '../../redux/slices/characters-slice'
import {
    selectCharacters,
    selectCurrentPage,
    selectIsFetchingCharacters,
    selectPagesCount
} from '../../redux/selectors/characters-selectors'
import Preloader from '../../components/common/Preloader/Preloader'
import CharacterItem from '../../components/Characters/CharacterItem/CharacterItem'

const { Title } = Typography

const CharactersPage: FC = () => {
    const dispatch = useAppDispatch()
    const characters = useAppSelector(selectCharacters)
    const isFetching = useAppSelector(selectIsFetchingCharacters)
    const pagesCount = useAppSelector(selectPagesCount)
    const currentPage = useAppSelector(selectCurrentPage)

    useAuthRedirect()

    useEffect(() => {
        dispatch(fetchCharacters(currentPage))
    }, [dispatch, currentPage])

    const handlePageChange = (page: number) => {
        dispatch(fetchCharacters(page))
    }

    return <>
        <Title level={2} className="m-0 lh-lg text-center mb-3 mb-md-5">Characters</Title>
        <div className="my-4 text-center">
            <AutoCompleteForm/>
        </div>
        <div className="px-3">
            <Row gutter={[15, 15]}>
                {
                    isFetching
                        ? <Preloader/>
                        : characters.map(char => <CharacterItem key={char.id} {...char} />)
                }
            </Row>
        </div>
        <div className="mt-4 d-flex justify-content-center">
            <Pagination current={currentPage} onChange={handlePageChange} total={pagesCount} showSizeChanger={false}/>
        </div>
    </>
}

export default CharactersPage