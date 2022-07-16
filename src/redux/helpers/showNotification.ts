import { notification } from 'antd'


export const showNotification = ({ type, title, desc }: PropsType) => {
    notification[type]({
        message: title,
        description: desc
    })
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

type PropsType = {
    type: NotificationType,
    title: string,
    desc?: string
}