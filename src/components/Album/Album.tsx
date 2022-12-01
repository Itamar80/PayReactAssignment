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
    const open = !!photos.length ? 'open' : '';
    const buttonState = !photos.length ? 'Open' : 'Close';
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
        if (photos?.length) {
            setError('')
            return setPhotos([])
        };
        return getPhotos()
    }

    const handleSort = (): void => {
        setError('')
        let sortedPhotos = [...photos];
        if (dragItem.current === null || dragOverItem.current === null) return;
        const [draggedItemContent] = sortedPhotos.splice(dragItem.current, ADJACENT_POSITION);
        if (dragOverItem.current === previusOverItem.current || !previusOverItem.current) {
            console.log('replace between items');
            sortedPhotos.splice(dragOverItem.current, 0, draggedItemContent);
            //TODO add logic to replace items
            dragItem.current = null;
            dragOverItem.current = null;
            return setPhotos(sortedPhotos)
        }
        if ((dragOverItem.current - previusOverItem.current) === ADJACENT_POSITION ||
            (previusOverItem.current - dragOverItem.current) === ADJACENT_POSITION) {
            console.log('they are ADJACENT');
            const isPrevuisAboveCurrent = previusOverItem.current > dragOverItem.current;
            const indexToReplace = isPrevuisAboveCurrent ? previusOverItem.current : dragOverItem.current;
            sortedPhotos.splice(indexToReplace, 0, draggedItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            return setPhotos(sortedPhotos)
        }
        console.log('they are not');
        return setError(DRAG_ERROR)
    }

    return (
        <div className={`album-container ${open}`}>
            <h3 className='album-title'>{album.title}</h3>
            {!!error && <Error text={error} />}
            {!!photos.length &&
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
            <div className="data">
                <p className='user-id'><span>ID: </span>{user?.id}</p>
                <p className='user-name'><span>Name: </span>{user?.name}</p>
                <p className='user-email'><span>Email: </span>{user?.email}</p>
            </div>
            <button className='cta' onClick={() => toggleInfo()}>{buttonState}</button>
        </div>
    )
}