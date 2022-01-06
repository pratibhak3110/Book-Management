import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Books } from '../books';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  bookArray: Books[]=[];
  constructor(
    public router: Router,
    public bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data: Books[]) => {
      this.bookArray= data;
      console.log(this.bookArray);
    });

  }

  addBook(){
    this.router.navigate(['/create']);
  }

  viewBook(id: number){
    this.router.navigate(['/view/' + id.toString()]);
  }

  editBook(id: number){
    this.router.navigate(['/edit/' + id.toString()]);
  }

  deleteBook(id: number){
    let answer= window.confirm('Are you sure you want to delete');
    if(answer){
      this.bookService.deleteBook(id).subscribe(res =>{
      this.bookArray= this.bookArray.filter(item => item.id !== id);
      console.log("Book deleted Successfully");
      });
    } else{
      this.router.navigate(['/index']);
  }
  }
}
