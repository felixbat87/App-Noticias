import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { async } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { Article, NewsResponse} from '../../interfaces'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  @ViewChild(IonInfiniteScroll,{static:true})

  infiniteScroll: IonInfiniteScroll |any;

  constructor(private newsService:NewsService) {}
   public articles:Article[]=[];
  
  ngOnInit() {

   this.newsService.getTopHeadlines()
   .subscribe( articles =>this.articles.push(...articles));

  }



  loadData(){
   this.newsService.getTopHeadlinesByCategory('business', true).subscribe(
    articles=>{
     if(articles.length===this.articles.length){
      this.infiniteScroll.disabled=true;
      //event.target.disabled=true;
      return;
     }
      this.articles=articles;
      setTimeout(()=>{
        this.infiniteScroll.complete();
      },1000)
      //event.target.complete();
    }
   )
  // console.log(this.infiniteScroll);
  }

 
}
