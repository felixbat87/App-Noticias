import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
 
  @ViewChild(IonInfiniteScroll,{static:true})
  infiniteScroll: IonInfiniteScroll |any;

  public categories:string[] =[
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];
  public selectedCategory:string=this.categories[0];
  public articles:Article[]=[];

  constructor(private newsService:NewsService) {}

  ngOnInit(){
    //console.log(this.infiniteScroll)
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles=>{
    this.articles=[...articles];
    });
  }


  segmentChanged(event:Event){
    this.selectedCategory=(event as CustomEvent).detail.value;
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles=>{
      this.articles=[...articles];
      });
    // console.log(event.detail.value);
  }


  loadData(){
   this.newsService.getTopHeadlinesByCategory(this.selectedCategory, true).subscribe(
    articles=>{
     if(articles.length===this.articles.length){
      this.infiniteScroll.disabled=true;
      //event.target.disabled=true;
      return;
     }
      this.articles=articles;
      this.infiniteScroll.complete();
      //event.target.complete();
    }
   )
   //console.log(this.infiniteScroll);
  }

 

}
