import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http:HttpClient) { }

  getTopHeadArtist(){
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=0e91b98df2d14076915c6caae3a432d7&format=json`)
  }

  getSimilarArtists(artist:string){
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=0e91b98df2d14076915c6caae3a432d7&format=json`);
  }
}
