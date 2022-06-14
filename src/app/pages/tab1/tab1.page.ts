import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Para poder utilizar el view child en el ngoninit
  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll: IonInfiniteScroll; 

  constructor(private newsService:NewsService) {}
  
  public articles: Article[] = [];

  ngOnInit(){
    this.newsService.getTopHeadLines()
    .subscribe(articles=>{
      this.articles.push(...articles);
    })
  }

  loadData(){

    this.newsService.getTopHeadLinesByCategory('business',true)
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
