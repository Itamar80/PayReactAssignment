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
        console.log(`🚀 ~ file: Home.tsx:16 ~ getAlbumPhotos ~ fetchdPhotos`, fetchdPhotos);
        setPhotos(fetchdPhotos)
    }
    return (
        <div className='album-container'>
            <div className='user-name'>{user?.name}</div>
            <div className='user-email'>{user?.email}</div>
            <div className='collapse-image' onClick={() => getPhotos(album.id)}>^</div>
            {!!photos && <AlbumInfo photos={photos} />}
        </div>
    )
}