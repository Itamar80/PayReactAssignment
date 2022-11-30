import { FC, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Photo } from '../../types/types';
import './ThumbnailImage.css'

type Props = {
    deletePhoto: (photoId: number) => void;
    setSelectedPhoto: (str: string) => void;
    handleSort: () => void;
    index: number;
    photo: Photo;
    dragItem: React.MutableRefObject<null | number>;
    dragOverItem: React.MutableRefObject<null | number>;
    previusOverItem: React.MutableRefObject<null | number>;
}


export const ThumbnailImage: FC<Props> = ({
    deletePhoto,
    setSelectedPhoto,
    handleSort,
    index,
    photo,
    dragItem,
    dragOverItem,
    previusOverItem
}): JSX.Element => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'div',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    const [isHover, setIsHover] = useState<boolean>(false);

    const onDeletePhoto = (e: React.MouseEvent<HTMLElement>) => {
        deletePhoto(photo.id);
        e.stopPropagation()
    }

    const setDragOverRefs = () => {
        previusOverItem.current = dragOverItem.current
        dragOverItem.current = index
    }

    return (
        <div className={`photo-container`}
            ref={drag}
            // TODO change style while dragging
            style={{ border: isDragging ? '5px solid pink' : '0px' }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onDragStart={() => dragItem.current = index}
            onDragEnter={() => setDragOverRefs()}
            onDragEnd={handleSort}
            onClick={() => setSelectedPhoto(photo.url)}
            onDragOver={(e) => e.preventDefault()}
        >
            {isHover && <div className='thumbnail'>
                {photo.title}
            </div>}
            {/* TODO make in the image */}
            <button className='exit-button' onClick={(e) => onDeletePhoto(e)}>x</button>
            <img src={photo.thumbnailUrl} alt={'thumbnail'} />
        </div>
    )
}