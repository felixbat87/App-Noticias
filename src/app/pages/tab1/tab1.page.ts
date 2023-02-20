import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { Article, NewsResponse} from '../../interfaces'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private newService:NewsService) {}
   public articles:Article[]=[];
  
  ngOnInit() {

   this.newService.getTopHeadlines()
   .subscribe( articles =>this.articles.push(...articles));

  }

 
}
