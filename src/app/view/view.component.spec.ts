import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { BookService } from '../book.service';

import { ViewComponent } from './view.component';

fdescribe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let bookService: BookService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
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
    expect(component.bookForm.value).toEqual({id:'', img: '', name: '', author: '', description: ''});
  });

  it('should check "findBook" method', () =>{
    let spy= spyOn(bookService, 'findBook').and.returnValue(of({img: 'https://abc.com', name: 'abc', author: 'abc', description: 'abc'}));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled(); 
  });

});
