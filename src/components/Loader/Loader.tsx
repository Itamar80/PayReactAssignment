import { FC } from 'react';
import './Loader.css'

export const Loader: FC = (): JSX.Element => {
    return (
        <div className='loader-container'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}