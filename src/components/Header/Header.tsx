import { FC } from 'react';
import './Header.css'

type Props = {
}


export const Header: FC<Props> = (): JSX.Element => {
    return (
        <header className='header-container'>
            <h1>Pay.</h1>
        </header>
    )
}