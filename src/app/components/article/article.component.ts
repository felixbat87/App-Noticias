import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { Browser } from '@capacitor/browser';
import { ActionSheetButton, ActionSheetController, Platform, isPlatform } from '@ionic/angular';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
 
 @Input() article:Article | any;
 @Input() index:number | any;
 
  constructor(private platform:Platform, private actionSheetCtrl:ActionSheetController,private iab:InAppBrowser, private socialSharing:SocialSharing,private storageService:StorageService) { }

  ngOnInit() {}


openArticle(){

  if(this.platform.is('ios')||this.platform.is('android')){
    Browser.open({ url: this.article.url });
    return
  }

  window.open(this.article.url,'_blank');

  //ionic capacitor build android
}

async openMenu(){
  const articleInFavorite=this.storageService.isarticleInFavorites(this.article);
  const normalBtns:ActionSheetButton[]=[
    {
      text: articleInFavorite ? 'Remover Favorito':'Favoritos',
      icon: articleInFavorite ? 'heart':'heart-outline',
      handler:()=>this.OnToggleFavorite()
    },
    {
      text:'Cancelar',
      icon: 'close-outline',
      role: 'cancel',
    }
  ]

  const shareBtn: ActionSheetButton= {
    text:'Compartir',
    icon: 'share-outline',
    handler:()=>this.OnShareArticle()
  };

  if(this.platform.is('capacitor')){
   normalBtns.unshift(shareBtn);
  }

 const actionSheet= await this.actionSheetCtrl.create({
    header:'Opciones',
    buttons: normalBtns
    //[
      // {
      // text:'Compartir',
      // icon: 'share-outline',
      // handler:()=>this.OnShareArticle()
      // },
      // {
      //   text:'Favoritos',
      //   icon: 'heart-outline',
      //   handler:()=>this.OnToggleFavorite()
      // },
      // {
      //   text:'Cancelar',
      //   icon: 'close-outline',
      //   role: 'cancel',
      // }
   // ]
    
  });



  await actionSheet.present();

 }


 OnShareArticle(){
  let file:string='';
  const {title,source,url}=this.article;
  this.socialSharing.share(
    title,
    source,
    file,
    url
  );
 // console.log('Compartir Articulo')
 }


 OnToggleFavorite(){
 this.storageService.saveRemoveArticle(this.article);
 // console.log('Guardar Favorite');
 }


}
