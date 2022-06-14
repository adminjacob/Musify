import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article, Artist } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[]=[];
  private _localArtists:Artist[]=[];

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalArticles(){
    return [...this._localArticles];
  }

  get getLocalArtists(){
    return [...this._localArtists];
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();
    this.loadArtists();
  }
  
  //For Articles
  async saveRemoveArticle(article:Article){

    const exists = this._localArticles.find(localArticle=>localArticle.title===article.title);

    if(exists){
      this._localArticles=this._localArticles.filter(localArticle=>localArticle.title!==article.title)
    }else{
      this._localArticles=[article,...this._localArticles];
    }
    this._storage.set('articles',this._localArticles);
  }

  async loadFavorites(){
    try{
      const articles=await this._storage.get('articles');
      this._localArticles=articles||[];
    }catch(error){
      console.log(error);
    }
  }
  

  articleInFavorites(article:Article){
    return !!this._localArticles.find(localArticle=>localArticle.title===article.title);
  }

  //For Artists
  async saveRemoveArtist(artist:Artist){

    const exists = this._localArtists.find(localArtist=>localArtist.name===artist.name);

    if(exists){
      this._localArtists=this._localArtists.filter(localArtist=>localArtist.name!==artist.name)
    }else{
      this._localArtists=[artist,...this._localArtists];
    }
    this._storage.set('artists',this._localArtists);
  }

  async loadArtists(){
    try{
      const artists=await this._storage.get('artists');
      this._localArtists=artists||[];
    }catch(error){
      console.log(error);
    }
  }
  

  artistInFavorites(artist:Artist){
    return !!this._localArtists.find(localArtist=>localArtist.name===artist.name);
  }
  
  


}