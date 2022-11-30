import { FC, MutableRefObject, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from 'react-query'
import { getAlbumPhotos } from '../../services/service';
import { ThumbnailImage } from '../ThumbnailImage/ThumbnailImage';
import { SelectedPhoto } from '../SelectedPhoto/SelectedPhoto';
import { Error } from '../Error/Error';
import { Album, Photo, User } from '../../types/types';
import { DRAG_ERROR, MAX_PHOTOS, PHOTOS, PHOTOS_ERROR, ADJACENT_POSITION } from '../../consts';
import './Album.css'

type Props = {
    album: Album;
    user: User;
}

export const AlbumComponent: FC<Props> = ({ album, user }): JSX.Element => {
    const { refetch } = useQuery([PHOTOS, album.id], () => getAlbumPhotos(album.id), {
        enabled: false
    });
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');
    const [error, setError] = useState<string | null>('');
    const dragItem = useRef(null) as MutableRefObject<number | null>;
    const dragOverItem = useRef(null) as MutableRefObject<number | null>;
    const previusOverItem = useRef(null) as MutableRefObject<number | null>;

    const getPhotos = async (): Promise<void> => {
        try {
            const { data: fetchdPhotos, error } = await refetch();
            if (!fetchdPhotos?.length || error) return setError(PHOTOS_ERROR);
            setError(null);
            setPhotos(fetchdPhotos.slice(0, MAX_PHOTOS))
        } catch (err) {
            setError(error)
        }
    }

    const deletePhoto = (photoId: number): void => {
        const updatedPhotos = photos?.filter(photo => photo.id !== photoId);
        setPhotos(updatedPhotos)
    }

    const toggleInfo = () => {
        if (photos?.length) return setPhotos([]);
        return getPhotos()
    }

    const handleSort = (): void => {
        setError('')
        let sortedPhotos = [...photos];
        if (!dragItem.current || !dragOverItem.current || !previusOverItem.current) return;
        if ((dragOverItem.current - previusOverItem.current) === ADJACENT_POSITION ||
            (previusOverItem.current - dragOverItem.current) === ADJACENT_POSITION) {
            const [draggedItemContent] = sortedPhotos.splice(dragItem.current, ADJACENT_POSITION);
            const isPrevuisAboveCurrent = previusOverItem.current > dragOverItem.current;
            const indexToReplace = isPrevuisAboveCurrent ? previusOverItem.current : dragOverItem.current;
            sortedPhotos.splice(indexToReplace, 0, draggedItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setPhotos(sortedPhotos)
            return
        }
        setError(DRAG_ERROR)
        return
    }

    return (
        <div className='album-container'>
            <div className='user-name'>{album.title}</div>
            <div className='user-email'>{user?.id}</div>
            <div className='user-name'>{user?.name}</div>
            <div className='user-email'>{user?.email}</div>
            <div className='collapse-image' onClick={() => toggleInfo()}>^</div>
            {!!error && <Error text={error} />}
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
                            previusOverItem={previusOverItem}
                            dragOverItem={dragOverItem}
                        />)}
                    </DndProvider>
                    {selectedPhoto !== '' && <SelectedPhoto setSelectedPhoto={setSelectedPhoto} selectedPhoto={selectedPhoto} />}
                </div>
            }

        </div>
    )
}