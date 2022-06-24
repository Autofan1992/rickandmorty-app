import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadProps } from 'antd/es/upload/interface'
import { FC, useState } from 'react'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}

const AvatarUploadForm: FC<PropsType> = ({imgUrl = '', handleSetAvatar }) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>(imgUrl)

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false)
                setImageUrl(url)
                handleSetAvatar(url)
            })
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:5000/avatar"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> : uploadButton}
        </Upload>
    )
}

export default AvatarUploadForm

type PropsType = {
    imgUrl?: string
    handleSetAvatar: (url: string) => void
}