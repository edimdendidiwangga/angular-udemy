import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Inject({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'https://myapps-2c658.firebaseio.com/posts.json?print=pretty&custom=key';
  headers = {
    headers: new HttpHeaders({'Custom-Header': 'Hello'}),
    params: new HttpParams().set('print', 'pretty')
  }
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    return this.http
      .post<{ name: string }>(this.baseUrl, postData, { observe: 'response' })
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams.append('custom', 'key');

    return this.http
      .get<{[key: string]: Post}>(this.baseUrl, { ...this.headers, params: { ...this.headers.params, ...searchParams } })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray
        }),
        catchError((errorRes) => {
          // Send to analytics server
          return throwError(errorRes)
        })
      )
      // .subscribe(responseData => {
      //   return responseData;
      // });
  }

  deletePosts() {
    return this.http
      .delete(this.baseUrl, { observe: 'events' })
      .pipe(
        tap(event => {
          console.log(event)
          if (event.type === HttpEventType.Sent) {
            console.log('Sent', event);
          }
          if (event.type === HttpEventType.Response) {
            console.log('Response', event.body);
          }
        })
      );
  }
}