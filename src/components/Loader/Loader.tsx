import { FC } from 'react';
import './Loader.css'

type Props = {
}


export const Loader: FC<Props> = (): JSX.Element => {
    return (
        <div className='loader-container'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}