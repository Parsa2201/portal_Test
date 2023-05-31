import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NewsRepositoryService } from '../services/news-repository.service';
import { NewsList } from '../model/news-list';
import { DomSanitizer } from '@angular/platform-browser';
declare const navigator: Navigator;

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {
 
readonly isWebShareSupported: boolean=navigator && navigator.share ? true : false;
newsList=this._newsRepository.getNewsList;
  constructor(private readonly _newsRepository: NewsRepositoryService) {}

  share(title: string, url: string) {
    navigator.share({
      title: title,
      text:`برای خواندن خبر '${title}' برای خواندن ادامه مطلب روی لینک بزن!`,
      url: url
    })
      .catch((error) => console.log('Error sharing:', error));
  }
  
  }

