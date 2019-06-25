import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/comment.model';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  /**
   * @description url of the comment API.
   */
  private commentUrl = `${environment.baseUrl}/comments`;

  constructor(private http: HttpClient) {}

  /**
   * @description get all comments.
   */
  getAllComments = (query: any): Observable<Comment[]> => {
    return this.http.get<Comment[]>(this.commentUrl, { params: query }).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get comment by id.
   */
  getCommentById = (commentid: string): Observable<Comment> => {
    const url = `${this.commentUrl}/${commentid}`;
    return this.http.get<Comment>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get comment by message id.
   */
  getCommentByMessageId = (messageId: string): Observable<Comment[]> => {
    const url = `${this.commentUrl}/get_by_messageid/${messageId}`;
    return this.http.get<Comment[]>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description create new comment.
   */
  createComment = (comment: Comment): Observable<Comment> => {
    return this.http.post<Comment>(this.commentUrl, comment).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description update comment by id.
   */
  updateCommentById(comment: Comment): Observable<Comment> {
    const url = `${this.commentUrl}/${comment._id}`;
    return this.http.put<Comment>(url, comment).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete comment by id.
   */
  deleteCommentById(commentid: string): Observable<{}> {
    const url = `${this.commentUrl}/${commentid}`;
    return this.http.delete<{}>(url).pipe(catchError((err) => observableHandleError(err)));
  }
}
