import { FC } from 'react';
import { PhotoDTO } from '../../types/types';
import './AlbumPhoto.css'

type Props = {
    photo: PhotoDTO;
    deletePhoto: (photoId: number) => void;
}


export const AlbumPhoto: FC<Props> = ({ photo, deletePhoto }): JSX.Element => {
    return (
        <div className='photo-container'>
            <button className='exit-button' onClick={() => deletePhoto(photo.id)}>x</button>
            <img src={photo.thumbnailUrl} alt={'thumbnail'} />
        </div>
    )
}