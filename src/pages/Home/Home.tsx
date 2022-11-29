import { FC } from 'react';
import { useQuery } from 'react-query'
import { getAlbums, getUsers } from '../../services/service';
import { AlbumDTO, UserDTO } from '../../types/types';
import './Home.css'


export const Home: FC = (): JSX.Element => {
    const { isLoading: isLoadingAlbums, error: errorAlbums, data: albums } = useQuery('albums', getAlbums);
    const { isLoading: isLoadingUsers, error: errorUsers, data: users } = useQuery('users', getUsers);


    if (errorAlbums || errorUsers) return <div>{'An error has occurred:'}</div>
    if (isLoadingUsers || isLoadingAlbums || !albums || !users) return <div>'Loading...'</div>;


    return (
        <div className='container'>
            {albums.map((album: AlbumDTO) => {
                const user = users.find((user: UserDTO) => user.id === album.userId);
                return (
                    <div className='album' key={album.id}>
                        <div className='user-name'>{user?.name}</div>
                        <div className='user-email'>{user?.email}</div>
                        <div className='collapse-image'>^</div>
                    </div>
                )
            })}
        </div>
    )
}