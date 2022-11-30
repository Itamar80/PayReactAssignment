import { FC, useState } from 'react';
import { PhotoDTO } from '../../types/types';
import './AlbumPhoto.css'
import { useDrag } from 'react-dnd';

type Props = {
    photo: PhotoDTO;
    deletePhoto: (photoId: number) => void;
    setSelectedPhoto: (str: string) => void;
    index: number;
    handleSort: () => void;
    dragItem: React.MutableRefObject<any>;
    dragOverItem: React.MutableRefObject<any>;
}


export const AlbumPhoto: FC<Props> = ({
    photo,
    index,
    deletePhoto,
    setSelectedPhoto,
    handleSort,
    dragItem,
    dragOverItem
}): JSX.Element => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'div',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className={`photo-container`}
            ref={drag}
            // TODO change style while dragging
            style={{ border: isDragging ? '5px solid pink' : '0px' }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onDragStart={(e) => dragItem.current = index}
            onDragEnter={(e) => dragOverItem.current = index}
            onDragEnd={handleSort}
            onClick={() => setSelectedPhoto(photo.url)}
            onDragOver={(e) => e.preventDefault()}
        >
            {isHover && <div className='thumbnail'>
                {photo.title}
            </div>}
            {/* TODO make in the image */}
            <button className='exit-button' onClick={() => deletePhoto(photo.id)}>x</button>
            <img src={photo.thumbnailUrl} alt={'thumbnail'} />
        </div>
    )
}