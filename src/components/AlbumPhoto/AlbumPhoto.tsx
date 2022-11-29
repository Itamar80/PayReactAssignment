import { FC, useState } from 'react';
import { PhotoDTO } from '../../types/types';
import './AlbumPhoto.css'

type Props = {
    photo: PhotoDTO;
    deletePhoto: (photoId: number) => void;
}


export const AlbumPhoto: FC<Props> = ({ photo, deletePhoto }): JSX.Element => {
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        <div className='photo-container'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {isHover && <div className='thumbnail'>
                {photo.title}
            </div>}
            <button className='exit-button' onClick={() => deletePhoto(photo.id)}>x</button>
            <img src={photo.thumbnailUrl} alt={'thumbnail'} />
        </div>
    )
}