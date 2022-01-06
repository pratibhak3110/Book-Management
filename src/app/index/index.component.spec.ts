import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { BookService } from '../book.service';

import { IndexComponent } from './index.component';

fdescribe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let bookService: BookService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientModule 
      ],
      providers: [
        {provide: Router, useValue: {navigate: () => {}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check "getAllBooks" method', () => {
    let spy= spyOn(bookService, 'getAllBooks').and.returnValue(of({}));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled(); 
  });

  it('Should call "addBook" method and navigate to "Create Component"', () => {
    let navigate= spyOn(router, 'navigate');
    component.addBook();
    expect(navigate).toHaveBeenCalled();
  });

  it('Should call "viewBook" method and navigate to "View Component"', () => {
    let navigate= spyOn(router, 'navigate');
    component.viewBook(0);
    expect(navigate).toHaveBeenCalled();
  });

  it('Should call "editBook" method and navigate to "Edit Component"', () => {
    let navigate= spyOn(router, 'navigate');
    component.editBook(0);
    expect(navigate).toHaveBeenCalled();
  });

  // it('Should check "deleteBook" method and navigate to index page', () => {
  //   let spy= spyOn(window, 'confirm');
  //   let navigate = spyOn(router, 'navigate');
  //   component.deleteBook(0);
  //   expect(spy).toHaveBeenCalled();
  //   expect(navigate).toHaveBeenCalled();
  // });
});
