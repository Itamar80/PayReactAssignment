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
    previusOverItem,
}): JSX.Element => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'div',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    const [draggingIntoBorder, setDraggingIntoBorder] = useState<string>('');
    const [isHover, setIsHover] = useState<boolean>(false);
    const draggingBorder = isDragging ? 'dragging-border' : '';
    const onDeletePhoto = (e: React.MouseEvent<HTMLElement>) => {
        deletePhoto(photo.id);
        e.stopPropagation()
    }

    const setDragOverRefs = () => {
        if (dragItem.current === index || dragOverItem.current === index) return;
        previusOverItem.current = dragOverItem.current
        dragOverItem.current = index
        if ((index === previusOverItem.current || index === dragOverItem.current) && index !== dragItem.current) {
            setDraggingIntoBorder('dragging-into-border')
            setTimeout(() => {
                setDraggingIntoBorder('')
            }, 1000)
        }
    }

    const onDragStart = () => {
        setDraggingIntoBorder('')
        setIsHover(false)
        dragItem.current = index
    }

    const onDragEnd = () => {
        handleSort()
    }

    return (
        <div className={`photo-container ${draggingBorder} ${draggingIntoBorder}`}
            ref={drag}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onDragStart={() => onDragStart()}
            onDragEnter={() => setDragOverRefs()}
            onDragEnd={() => onDragEnd()}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => setSelectedPhoto(photo.url)}
        >
            {isHover && <div className='thumbnail'>
                {photo.title}
            </div>}
            <button className='close-button' onClick={(e) => onDeletePhoto(e)}>
                <span className='close-icon' />
            </button>
            <img src={photo.thumbnailUrl} alt={'thumbnail'} />
        </div>
    )
}