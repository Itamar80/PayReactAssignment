import { FC } from 'react';
import './SelectedPhoto.css'

type Props = {
    selectedPhoto: string;
    setSelectedPhoto: (str: string) => void;
}


export const SelectedPhoto: FC<Props> = ({ selectedPhoto, setSelectedPhoto }): JSX.Element => {
    return (
        <div className='selected-photo-container'>
            <div className="screen"></div>
            <button className='close-button' onClick={() => setSelectedPhoto('')}>
                <span className='close-icon' />
            </button>
            <img src={selectedPhoto} alt='full-size' />
        </div>
    )
}