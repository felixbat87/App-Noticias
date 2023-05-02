import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {environment} from '../../environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators';

const apiKey= environment.apiKey;
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  
private ArticlesByCategoryAndPage:ArticlesByCategoryAndPage={}


  constructor(private http: HttpClient) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey:apiKey,
        country: 'us',
      }
    });
   }
 
   getTopHeadlines():Observable<Article[]>{
 
    return this.getTopHeadlinesByCategory('business');

    }
   
    getTopHeadlinesByCategory(category:string, loadMore:boolean = false):Observable<Article[]>{
     
       if(loadMore){
        return this.getArticlesByCategory(category);
       }

       if(this.ArticlesByCategoryAndPage[category]){
         return of(this.ArticlesByCategoryAndPage[category].articles);
       }

       return this.getArticlesByCategory(category);

       }

    private getArticlesByCategory(category:string):Observable<Article[]>{
     if(Object.keys(this.ArticlesByCategoryAndPage).includes(category)){
       //Ya existe
      // this.ArticlesByCategoryAndPage[category].page+=0;

     }else{
      this.ArticlesByCategoryAndPage[category]={
        page:0,
        articles:[]
      }
     }
   
     const page = this.ArticlesByCategoryAndPage[category].page +1;
     return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
     .pipe(
       map (({articles})=>{

        if(articles.length===0) return [];

       this.ArticlesByCategoryAndPage[category]={

        page:page,
        articles:[...this.ArticlesByCategoryAndPage[category].articles,...articles]

       }
        return this.ArticlesByCategoryAndPage[category].articles;
       })
     );

    }


  // getTopHeadlines():Observable<Article[]>{
  //  return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,{
  //   params:{ apiKey}
  //  }).pipe(
  //   map(({articles})=>articles)
  //  );
  // }



  // getTopHeadlinesByCategory(category:string):Observable<Article[]>{
  //   return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`,{
  //   params:{ apiKey}
  //  }).pipe(
  //   map(({articles})=>articles)
  //  );
  // }

}
