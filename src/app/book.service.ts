import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Books } from './books';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public apiUrl= "http://localhost:3000/books/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  getAllBooks(): Observable<any>{
    return this.http.get(this.apiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findBook(id: number): Observable<any>{
     return this.http.get(this.apiUrl + id)
     .pipe(
       catchError(this.errorHandler)
     )
  }

  addNewBook(book: Books){
      return this.http.post(this.apiUrl, JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateBook(id: number, book: Books){
      return this.http.put(this.apiUrl + id, JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteBook(id: number) {
      return this.http.delete(this.apiUrl + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error:any){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
     errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }

    return (errorMessage);
  }
  
}
