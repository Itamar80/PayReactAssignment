import { FC, useState } from 'react';
import { useQuery } from 'react-query'
import { Album } from '../../components/Album/Album';
import { Header } from '../../components/Header/Header';
import { getAlbums, getUsers } from '../../services/service';
import { AlbumDTO, PhotoDTO } from '../../types/types';
import { AlbumInfo } from '../AlbumInfo/AlbumInfo';
import './Home.css'


export const Home: FC = (): JSX.Element => {
    const { isLoading: isLoadingAlbums, error: errorAlbums, data: albums } = useQuery('albums', getAlbums);
    const { isLoading: isLoadingUsers, error: errorUsers, data: users } = useQuery('users', getUsers);
    const [photos, setPhotos] = useState<PhotoDTO[]>();
    const [error, setError] = useState<boolean>(false);

    if (errorAlbums || errorUsers || error) return <div>{'An error has occurred:'}</div>
    if (isLoadingUsers || isLoadingAlbums || !albums || !users) return <div>'Loading...'</div>;

    const deletePhoto = (photoId: number): void => {
        const updatedPhotos = photos?.filter(photo => photo.id !== photoId);
        setPhotos(updatedPhotos)
    }

    return (
        <>
            <Header />
            <div className='data-container'>
                {albums.map((album: AlbumDTO) => <Album setPhotos={setPhotos} setError={setError} key={album.id} user={users[album.userId]} album={album} />)}
                {!!photos && <AlbumInfo deletePhoto={deletePhoto} photos={photos} />}
        </div>
        </>
    )
}