import { FC } from 'react';
import './Error.css'

type Props = {
    text: string;
}


export const Error: FC<Props> = ({ text }): JSX.Element => {

    return (
        <div className='error-container'>
            {text}
        </div>
    )
}