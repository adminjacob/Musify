import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, Artist } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  //Para poder utilizar el view child en el ngoninit
  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll: IonInfiniteScroll; 

  public categories: string[]=['ariana grande','harry styles','shakira','porter','Arctic Monkeys','Bad Bunny','Caifanes'];
  public selectedCategory: string=this.categories[0];
  public articles: Article[]=[];
  public selectedArtist:string=this.artists[0].name;

  get artists():Artist[]{
    return this.storageService.getLocalArtists;
  }
  

  constructor(private newsService:NewsService, private storageService:StorageService) {
  }

  ngOnInit(): void {
    this.newsService.getTopHeadLinesByCategory(this.selectedArtist)
    .subscribe(articles=>{
      this.articles=[...articles];
    });
  }

  segmentChanged(event:Event){

    this.selectedArtist=(event as CustomEvent).detail.value;
    this.newsService.getTopHeadLinesByCategory(this.selectedArtist)
    .subscribe(articles=>{
      this.articles=[...articles];
    });    
  }

  loadData(){

    this.newsService.getTopHeadLinesByCategory(this.selectedArtist,true)
    .subscribe(articles=>{
      if(articles.length===this.articles.length){
        this.infiniteScroll.disabled=true;
        //event.target.disabled=true;
        return;
      }
      this.articles=articles;
      console.log(articles);
      this.infiniteScroll.complete();
      //event.target.complete();  
    })

  }  

}
