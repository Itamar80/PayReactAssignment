import { ALBUMS, PHOTOS, USERS } from './../consts';
import { URL } from '../consts';
import { AlbumDTO, PhotoDTO, UserDTO } from './../types/types';

export const getAlbums = async (): Promise<AlbumDTO[]> => {
    const res = await fetch(`${URL}/${ALBUMS}`);
    return res.json();
}

export const getUsers = async (): Promise<UserDTO[]> => {
    const res = await fetch(`${URL}/${USERS}`);
    return res.json();
}

export const getAlbumPhotos = async (albumId: number): Promise<PhotoDTO[]> => {
    const res = await fetch(`${URL}/albums/${albumId}/${PHOTOS}`);
    return res.json();
}