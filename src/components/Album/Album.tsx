import { FC, useState } from 'react';
import { AlbumInfo } from '../../pages/AlbumInfo/AlbumInfo';
import { getAlbumPhotos } from '../../services/service';
import { AlbumDTO, PhotoDTO, UserDTO } from '../../types/types';
import './Album.css'

type Props = {
    album: AlbumDTO;
    user: UserDTO;
    setError: (boolean: boolean) => void;
}


export const Album: FC<Props> = ({ album, user, setError }): JSX.Element => {
    const [photos, setPhotos] = useState<PhotoDTO[]>();

    const getPhotos = async (albumId: number): Promise<void> => {
        const fetchdPhotos = await getAlbumPhotos(albumId);
        if (!fetchdPhotos) setError(true);
        setPhotos(fetchdPhotos.slice(0, 12))
    }

    const deletePhoto = (photoId: number): void => {
        const updatedPhotos = photos?.filter(photo => photo.id !== photoId);
        setPhotos(updatedPhotos)
    }

    const toggleInfo = () => {
        if (photos?.length) return setPhotos([]);
        return getPhotos(album.id)
    }

    return (
        <div className='album-container'>
            <div className='user-name'>{album.title}</div>
            <div className='user-email'>{user?.id}</div>
            <div className='user-name'>{user?.name}</div>
            <div className='user-email'>{user?.email}</div>
            <div className='collapse-image' onClick={() => toggleInfo()}>^</div>
            {!!photos && <AlbumInfo deletePhoto={deletePhoto} photos={photos} />}
        </div>
    )
}