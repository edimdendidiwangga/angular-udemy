import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Inject({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'https://myapps-2c658.firebaseio.com/posts.json';
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    return this.http
    .post<{ name: string }>(this.baseUrl, postData)
    // .subscribe(responseData => {
    //   console.log(responseData);
    // });
  }

  fetchPosts() {
    return this.http
      .get<{[key: string]: Post}>(this.baseUrl)
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray
        })
      )
      // .subscribe(responseData => {
      //   return responseData;
      // });
  }

  deletePosts() {
    return this.http.delete(this.baseUrl);
  }
}