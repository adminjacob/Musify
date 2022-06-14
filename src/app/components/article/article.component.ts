import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx'
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {


  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab:InAppBrowser, 
    private platform:Platform, 
    private actionSheetCtrl:ActionSheetController, 
    private socialSharing: SocialSharing,
    private storageService:StorageService,
  
    ) { }

  ngOnInit() {}

  openArticle(){

    if(this.platform.is('ios') || this.platform.is('android')){
      const browser=this.iab.create(this.article.url);
      browser.show();
      return;
    }else{
      window.open(this.article.url,'_blank');
    }
  }

  async onOpenMenu(){

    const articleInFavorite=this.storageService.articleInFavorites(this.article);

    const actionSheet= await this.actionSheetCtrl.create({
      header:'Opciones',
      buttons:[
        {
          text: 'Compartir',
          icon:'share-outline',
          handler:()=>this.onShareArticle()
        },
        {
          text: articleInFavorite ? 'Remover Favorito' : 'Favorito',
          icon: articleInFavorite ? 'heart' : 'heart-outline',
          handler:()=>this.onToggleFavorite()
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

  onShareArticle(){

    if(this.platform.is('capacitor')){
      this.socialSharing.share(
        this.article.title,
        this.article.source.name,
        null,
        this.article.url
      );
    }else{
      alert('No disponible para la web');
    }

    
  }

  onToggleFavorite(){
    this.storageService.saveRemoveArticle(this.article);
  }

}
