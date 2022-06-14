import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Artist } from 'src/app/interfaces';
import { MusicService } from 'src/app/services/music.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private musicService:MusicService, 
    private actionSheetCtrl:ActionSheetController,
    private storageService:StorageService
    
    ) { }

  res:any;
  topHeadArtists:any;

  ngOnInit() {
    this.musicService.getTopHeadArtist()
    .subscribe(res=>{
      this.res = res;
      console.log(this.res.artists.artist[0].image[0]['#text']);
      this.topHeadArtists=this.res.artists.artist;
    })
  }

  async onOpenMenu(artist:Artist){

    const articleInFavorite=this.storageService.artistInFavorites(artist);

    const actionSheet= await this.actionSheetCtrl.create({
      header:'Opciones',
      buttons:[
        {
          text: articleInFavorite ? 'Remover Favorito' : 'Favorito',
          icon: articleInFavorite ? 'heart' : 'heart-outline',
          handler:()=>this.onToggleFavorite(artist)
        },
        {
          text:'Cancelar',
          icon:'close-outline',
          role:'cancel'
        }
        
      ]
    });

    await actionSheet.present();
  }

  onToggleFavorite(artist:Artist){
    this.storageService.saveRemoveArtist(artist);
  }

}
