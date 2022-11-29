import { FC } from 'react';
import { getAlbumPhotos } from '../../services/service';
import { AlbumDTO, PhotoDTO, UserDTO } from '../../types/types';
import './Album.css'

type Props = {
    album: AlbumDTO;
    user: UserDTO;
    setError: (boolean: boolean) => void;
    setPhotos: (photos: PhotoDTO[]) => void;
}


export const Album: FC<Props> = ({ album, user, setError, setPhotos }): JSX.Element => {

    const getPhotos = async (albumId: number): Promise<void> => {
        const fetchdPhotos = await getAlbumPhotos(albumId);
        if (!fetchdPhotos) setError(true);
        setPhotos(fetchdPhotos.slice(0, 12))
    }
    return (
        <div className='album-container'>
            <div className='user-name'>{album.title}</div>
            <div className='user-email'>{user?.id}</div>
            <div className='user-name'>{user?.name}</div>
            <div className='user-email'>{user?.email}</div>
            <div className='collapse-image' onClick={() => getPhotos(album.id)}>^</div>
        </div>
    )
}