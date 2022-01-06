import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  bookForm!: FormGroup;

  constructor(
    public router: Router,
    public bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookForm= new FormGroup({
      img: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }
  
  saveBook(){
    console.log(this.bookForm.value);
    this.bookService.addNewBook(this.bookForm.value).subscribe((response) => {
      console.log("Book added successfully");
      this.router.navigate(['/index']);
    })
  }

  cancleBook(){
     this.router.navigate(['/index']);
  }

}
