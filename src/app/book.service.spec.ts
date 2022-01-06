
import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Books } from './books';

fdescribe('BookService', () => {
  let bookService: BookService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
      providers: [ BookService ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    bookService = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController); 
  });

  it('should be created', () => {
    expect(bookService).toBeTruthy();
  });

  it('Should retrive books from API via GET ', () => {
    const dummyBooks: Books[]= [
      { id: 1, img: 'https://abc.com', name: 'Abc', author: 'Abc', description: 'Abc'},
      { id: 1, img: 'https://abc.com', name: 'Abc', author: 'Abc', description: 'Abc'}
    ];

    bookService.getAllBooks().subscribe(books =>{
      expect(books.length).toBe(2);
      expect(books).toEqual(dummyBooks);
    });

    const request = httpMock.expectOne(`${bookService.apiUrl}`);
    expect(request.request.method).toBe('GET');
    
    request.flush(dummyBooks);
  });

  it('Should find books by ID from API via GET ', () => {
    const dummyBooks: Books[]= [
      { id: 1, img: 'https://abc.com', name: 'Abc', author: 'Abc', description: 'Abc'},
      { id: 1, img: 'https://abc.com', name: 'Abc', author: 'Abc', description: 'Abc'}
    ];

    bookService.findBook(1).subscribe(books =>{
      expect(books.length).toBe(2);
      expect(books).toEqual(dummyBooks);
    });

    const request = httpMock.expectOne(`${bookService.apiUrl}1`);
    expect(request.request.method).toBe('GET');
    
    request.flush(dummyBooks);
  });

  // it('Should add book to API via POST', () =>{
  
  // })
  

});
