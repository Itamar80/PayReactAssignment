import { FC } from 'react';
import { useQuery } from 'react-query'
import { AlbumComponent } from '../../components/Album/Album';
import { Header } from '../../components/Header/Header';
import { ALBUMS, USERS } from '../../consts';
import { getAlbums, getUsers } from '../../services/service';
import { Album } from '../../types/types';
import { Error } from '../../components/Error/Error';
import './Home.css'
import { Loader } from '../../components/Loader/Loader';


export const Home: FC = (): JSX.Element => {
    const { isLoading: isLoadingAlbums, error: errorAlbums, data: albums } = useQuery(ALBUMS, getAlbums);
    const { isLoading: isLoadingUsers, error: errorUsers, data: users } = useQuery(USERS, getUsers);

    if (errorAlbums || errorUsers) return <Error text={'Couldnt get items'} />
    if (isLoadingUsers || isLoadingAlbums || !albums || !users) return <Loader />;

    return (
        <>
            <Header />
            <div className='data-container'>
                {albums.map((album: Album) => <AlbumComponent key={album.id} user={users[album.userId]} album={album} />)}
        </div>
        </>
    )
}