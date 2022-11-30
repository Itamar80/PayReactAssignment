import { FC, MutableRefObject, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getAlbumPhotos } from '../../services/service';
import { AlbumDTO, PhotoDTO, UserDTO } from '../../types/types';
import { ThumbnailImage } from '../ThumbnailImage/ThumbnailImage';
import { SelectedPhoto } from '../SelectedPhoto/SelectedPhoto';
import './Album.css'

type Props = {
    album: AlbumDTO;
    user: UserDTO;
    setError: (boolean: boolean) => void;
}


export const Album: FC<Props> = ({ album, user, setError }): JSX.Element => {
    const [photos, setPhotos] = useState<PhotoDTO[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');
    const dragItem = useRef(null) as MutableRefObject<number | null>;
    const dragOverItem = useRef(null) as MutableRefObject<number | null>;

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

    const handleSort = () => {
        let sortedPhotos = [...photos];
        if (!dragItem.current || !dragOverItem.current) return;
        const draggedItemContent = sortedPhotos.splice(dragItem.current, 1)[0];
        sortedPhotos.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setPhotos(sortedPhotos)
    }

    return (
        <div className='album-container'>
            <div className='user-name'>{album.title}</div>
            <div className='user-email'>{user?.id}</div>
            <div className='user-name'>{user?.name}</div>
            <div className='user-email'>{user?.email}</div>
            <div className='collapse-image' onClick={() => toggleInfo()}>^</div>
            {!!photos &&
                <div className='album-info-container'>
                    <DndProvider backend={HTML5Backend}>
                        {photos.map((photo, index) => <ThumbnailImage
                            key={photo.id}
                            handleSort={handleSort}
                            setSelectedPhoto={setSelectedPhoto}
                            deletePhoto={deletePhoto}
                            photo={photo}
                            index={index}
                            dragItem={dragItem}
                            dragOverItem={dragOverItem}
                        />)}
                    </DndProvider>
                    {selectedPhoto !== '' && <SelectedPhoto setSelectedPhoto={setSelectedPhoto} selectedPhoto={selectedPhoto} />}
                </div>
            }

        </div>
    )
}