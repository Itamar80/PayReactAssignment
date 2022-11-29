import { FC } from 'react';
import { AlbumPhoto } from '../../components/AlbumPhoto/AlbumPhoto';
import { PhotoDTO } from '../../types/types';
import './AlbumInfo.css'

type Props = {
    photos: PhotoDTO[]
}


export const AlbumInfo: FC<Props> = ({ photos }): JSX.Element => {

    return (
        <div className='container'>
            {photos.map(photo => <AlbumPhoto photo={photo} />)}
        </div>
    )
}