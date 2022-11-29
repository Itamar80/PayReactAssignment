import { FC } from 'react';
import { PhotoDTO } from '../../types/types';
import './AlbumPhoto.css'

type Props = {
    photo: PhotoDTO;
}


export const AlbumPhoto: FC<Props> = ({ photo }): JSX.Element => {
    return (
        <div className='photo-container'>
            {photo.thumbnailUrl}
        </div>
    )
}