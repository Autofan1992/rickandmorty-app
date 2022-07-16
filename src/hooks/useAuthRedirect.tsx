import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectIsAuth } from '../redux/selectors/auth-selectors'
import { useAppSelector } from '../redux/hooks'

const useAuthRedirect = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        !isAuth && navigate('/login')
    }, [isAuth, navigate])
}

export default useAuthRedirect