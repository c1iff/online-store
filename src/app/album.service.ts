import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AlbumService {

  albums: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.albums = angularFire.database.list('albums');
  }

  getAlbums() {
   return this.albums;
 }

 getAlbumById(albumId: string){
   return this.angularFire.database.object('/albums/' + albumId);
 }

 addAlbum(newAlbum: Album)
 {
   this.albums.push(newAlbum);
 }

 updateAlbum(localUpdatedAlbum)
 {
  var albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);

  albumEntryInFirebase.update({title: localUpdatedAlbum.title,
  artist: localUpdatedAlbum.artist,
  description: localUpdatedAlbum.description});
 }

 deleteAlbum(localAlbumToDelete) {
   var albumEntryInFirebase = this.getAlbumById(localAlbumToDelete.$key);
   albumEntryInFirebase.remove();

 }

}
