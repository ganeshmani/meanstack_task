
    
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Post } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
    constructor(
        private apiService : ApiService
    ){}

    get(): Observable<Post> {
        return this.apiService.get('posts')
          .pipe(map(data => data.response));
      }


      save(article): Observable<Post> {
        
          console.log(article);  
          return this.apiService.post('post', article)
            .pipe(map(data => data.response));
        
      }
    
      upvote(post_id): Observable<Post> {
        return this.apiService.post('post/upvote',{ post_id });
      }
}