import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';

import { BookService } from '../book.service';

import { EditComponent } from './edit.component';

fdescribe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let bookService: BookService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports:[
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
          {provide: BookService, useValue: {findBook: () => of({}),  updateBook: () => of({})}},
          {provide: Router, useValue: {navigate: ()=>{}}},
          {provide: ActivatedRoute, useValue: {snapshot: {params: {id: 0}}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    bookService= TestBed.inject(BookService);
    router= TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should contain default value to form', () =>{
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.bookForm.value).toEqual({img: undefined, name: undefined, author: undefined, description: undefined});
  });

  it('should check "findBook" method', () =>{
    let spy= spyOn(bookService, 'findBook').and.returnValue(of({img: 'abc/sdfg', name: 'abc', author: 'abc', description: 'abc'}));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled(); 
  });

  it('should check "updateBook" method and navigate to index page', () =>{
    let abc= spyOn(bookService, 'findBook').and.returnValue(of({img: 'abc/sdfg', name: 'abc', author: 'abc', description: 'abc'}));
     let spy= spyOn(bookService, 'updateBook').and.returnValue(of({}));
     let navigate= spyOn(router, 'navigate');
     component.saveChanges();
     expect(spy).toHaveBeenCalled();
     expect(navigate).toHaveBeenCalled();
  });
 
});
