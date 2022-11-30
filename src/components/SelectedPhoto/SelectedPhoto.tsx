import { FC } from 'react';
import './SelectedPhoto.css'

type Props = {
    selectedPhoto: string;
    setSelectedPhoto: (str: string) => void;
}


export const SelectedPhoto: FC<Props> = ({ selectedPhoto, setSelectedPhoto }): JSX.Element => {
    return (
        <div className='selected-photo-container'>
            <span onClick={() => setSelectedPhoto('')}>x</span>
            <img src={selectedPhoto} alt='full-size' />
        </div>
    )
}