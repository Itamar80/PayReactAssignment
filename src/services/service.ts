import { ALBUMS, PHOTOS, USERS } from './../consts';
import { URL } from '../consts';
import { Album, Photo, User } from './../types/types';

export const getAlbums = async (): Promise<Album[]> => {
    const res = await fetch(`${URL}/${ALBUMS}`);
    return res.json();
}

export const getUsers = async (): Promise<User[]> => {
    const res = await fetch(`${URL}/${USERS}`);
    return res.json();
}

export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
    const res = await fetch(`${URL}/${ALBUMS}/${albumId}/${PHOTOS}`);
    return res.json();
}