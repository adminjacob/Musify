import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article, Artist } from 'src/app/interfaces';
import { MusicService } from 'src/app/services/music.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  indicadorNotificaciones:boolean=false;
  indicadorArtistas:boolean=true;
  indicadorRecomendaciones:boolean=true;
  selectedSegment:string='notificaciones';
  similarArtists:Artist[]=[];


  get articles():Article[]{
    return this.storageService.getLocalArticles;
  }

  get artists():Artist[]{
    return this.storageService.getLocalArtists;
  }

  constructor(
    private storageService:StorageService,
    private actionSheetCtrl:ActionSheetController,
    private musicService:MusicService) {

  }

  segmentChanged(ev: any) {
    var tipo=ev.detail.value;
    console.log(tipo);
    if(tipo==='notificaciones'){
      this.indicadorNotificaciones=false;
      this.indicadorArtistas=true;
      this.indicadorRecomendaciones=true;
    }else if(tipo==='artistas'){
      this.indicadorNotificaciones=true;
      this.indicadorArtistas=false;
      this.indicadorRecomendaciones=true;
    }else if(tipo==='recomendaciones'){
      this.indicadorNotificaciones=true;
      this.indicadorArtistas=true;
      this.indicadorRecomendaciones=false;
      this.getSimilarArtists();
    }
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

  getSimilarArtists(){
    let artist=this.artists[0].name;
    this.musicService.getSimilarArtists(artist)
    .subscribe((res:any)=>{
      this.similarArtists=res.similarartists.artist;
      console.log(this.similarArtists);
    })
  }

}
