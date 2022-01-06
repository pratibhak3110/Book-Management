import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { BookService } from '../book.service';

import { CreateComponent } from './create.component';

fdescribe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let bookService: BookService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: BookService, useValue: {addNewBook: ()=> of({})}},
        {provide: Router, useValue: {navigate: ()=> {}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    bookService= TestBed.inject(BookService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain default value to form initially',() =>{
    expect(component.bookForm.value).toEqual({img: '', name: '', author: '', description: ''});
  });

  it('should add new movie and nevigate to index page',() =>{
    let spy= spyOn(bookService, 'addNewBook').and.returnValue(of({}));
    let navigation= spyOn(router, 'navigate');
    component.saveBook();
    expect(spy).toHaveBeenCalled();
    expect(navigation).toHaveBeenCalled();
  });


});
