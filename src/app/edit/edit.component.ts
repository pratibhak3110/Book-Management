import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Books } from '../books';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  bookForm!: FormGroup;
  id!: number;
  img: string = "";
  name: string = "";
  author: string = "";
  description: string= "";
  book!: Books;

  constructor(
    public router: Router,
    public bookService: BookService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bookForm= new FormGroup({
      img: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    
    this.id= this.route.snapshot.params['id'];
    this.bookService.findBook(this.id).subscribe((data: Books)=>{
      //this.book= data;
      this.bookForm.patchValue({
      img: data.img,
      name: data.name,
      author: data.author,
      description: data.description
      });
    });
  }

  saveChanges(){
    console.log(this.bookForm.value);
    this.bookService.updateBook(this.id, this.bookForm.value).subscribe(res => {
      console.log("Book updated successfully");
      this.router.navigate(['/index']);
    })
  }

  cancleChanges(){
    this.router.navigate(['/index']);
  }

}
