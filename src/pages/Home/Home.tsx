import { FC, useState } from 'react';
import { useQuery } from 'react-query'
import { getAlbums, getUsers } from '../../services/service';
import { AlbumComponent } from '../../components/Album/Album';
import { Header } from '../../components/Header/Header';
import { Error } from '../../components/Error/Error';
import { Loader } from '../../components/Loader/Loader';
import { ALBUMS, USERS } from '../../consts';
import { Album } from '../../types/types';
import './Home.css'


export const Home: FC = (): JSX.Element => {
    const { isLoading: isLoadingAlbums, error: errorAlbums, data: albums } = useQuery(ALBUMS, getAlbums);
    const { isLoading: isLoadingUsers, error: errorUsers, data: users } = useQuery(USERS, getUsers);
    const [activeAlbumId, setActiveAlbumId] = useState<number | null>(null);
    if (errorAlbums || errorUsers) return <Error text={'Couldnt get items'} />
    if (isLoadingUsers || isLoadingAlbums || !albums || !users) return <Loader />;

    return (
        <>
            <Header />
            <main className='data-container'>
                {albums.map((album: Album) => <AlbumComponent setActiveAlbumId={setActiveAlbumId} activeAlbumId={activeAlbumId} key={album.id} user={users[album.userId]} album={album} />)}
            </main>
        </>
    )
}