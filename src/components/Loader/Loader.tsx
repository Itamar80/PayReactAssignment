import { FC } from 'react';
import './Loader.css'

type Props = {
}


export const Loader: FC<Props> = (): JSX.Element => {
    return (
        <div className='loader-container'>
            loader
        </div>
    )
}