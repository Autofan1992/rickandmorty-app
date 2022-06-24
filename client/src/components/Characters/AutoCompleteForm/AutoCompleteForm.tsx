import { AutoComplete } from 'antd'
import { FC } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectFilteredCharacters } from '../../../redux/selectors/characters-selectors'
import { fetchFilteredCharacters } from '../../../redux/slices/characters-slice'
import { useNavigate } from 'react-router-dom'

const AutoCompleteForm: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const characters = useAppSelector(selectFilteredCharacters)

    const handleSearch = debounce((inputValue: string) => {
        dispatch(fetchFilteredCharacters(inputValue))
    }, 1000)

    const handleSelect = (value: string, { id }: { id: number }) => {
        navigate(`${id}`)
    }

    return <AutoComplete
        style={{ width: '100%', maxWidth: 400 }}
        options={characters}
        onSearch={handleSearch}
        onSelect={handleSelect}
        placeholder="Type character name to start searching"
        filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
    />
}

export default AutoCompleteForm