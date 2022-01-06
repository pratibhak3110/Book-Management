import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Books } from '../books';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  bookForm!: FormGroup;
  id!: number;
  name!: string;
  author!: string;
  img!: string;
  description!: string;
  book!: Books;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public bookService: BookService
  ) { }

  ngOnInit(): void {

    this.bookForm= new FormGroup({
      id: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    this.id= this.route.snapshot.params['id'];
    this.bookService.findBook(this.id).subscribe((data: Books) => {
      this.bookForm.patchValue({
        id: data.id,
        img: data.img,
        name: data.name,
        author: data.author,
        description: data.description
        });
    });
  }

  backToHome(){
     this.router.navigate(['/index']);
  }
}
