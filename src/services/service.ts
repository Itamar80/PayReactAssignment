import { AlbumDTO, PhotoDTO, UserDTO } from './../types/types';

export const getAlbums = async (): Promise<AlbumDTO[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums');
    return res.json();
}

export const getUsers = async (): Promise<UserDTO[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
}

export const getAlbumPhotos = async (albumId: number): Promise<PhotoDTO[]> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
    return res.json();
}