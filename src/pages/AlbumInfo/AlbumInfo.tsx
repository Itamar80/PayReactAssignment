import { FC, useEffect, useState } from 'react';
import { AlbumPhoto } from '../../components/AlbumPhoto/AlbumPhoto';
import { SelectedPhoto } from '../../components/SelectedPhoto/SelectedPhoto';
import { PhotoDTO } from '../../types/types';
import './AlbumInfo.css'

type Props = {
    photos: PhotoDTO[];
    deletePhoto: (photoId: number) => void;
}


export const AlbumInfo: FC<Props> = ({ photos, deletePhoto }): JSX.Element => {
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');

    return (
        <div className='album-info-container'>
            {photos.map(photo => <AlbumPhoto setSelectedPhoto={setSelectedPhoto} deletePhoto={deletePhoto} key={photo.id} photo={photo} />)}
            {selectedPhoto !== '' && <SelectedPhoto setSelectedPhoto={setSelectedPhoto} selectedPhoto={selectedPhoto} />}
        </div>
    )
}