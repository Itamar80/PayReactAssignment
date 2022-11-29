import { FC } from 'react';
import { AlbumPhoto } from '../../components/AlbumPhoto/AlbumPhoto';
import { PhotoDTO } from '../../types/types';
import './AlbumInfo.css'

type Props = {
    photos: PhotoDTO[];
    deletePhoto: (photoId: number) => void;
}


export const AlbumInfo: FC<Props> = ({ photos, deletePhoto }): JSX.Element => {
    return (
        <div className='album-info-container'>
            {photos.map(photo => <AlbumPhoto deletePhoto={deletePhoto} key={photo.id} photo={photo} />)}
        </div>
    )
}