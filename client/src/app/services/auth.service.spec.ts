// client/src/app/services/auth.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { createFakeToken, createFakeUser } from '../testing/factories';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // All module imports go here.
      imports: [
        HttpClientTestingModule
      ],
      // All components are declared here.
      declarations: [],
      // All services are referenced here.
      providers: [
        AuthService
      ]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should allow a user to sign up for a new account', () => {

    const userData = createFakeUser();
    const photo = new File(['photo'], userData.photo, {type: 'image/jpeg'});

    // Execute the function under test
    authService.signUp(
      userData.username,
      userData.first_name,
      userData.last_name,
      'pAssw0rd!',
      userData.group,
      photo
    ).subscribe(user => {
      expect(user).toBe(userData);
    });

    
    const request = httpMock.expectOne('/api/sign_up/');
    request.flush(userData);
  });

  it('should allow user to login to an existing account', () => {
    const userData = createFakeUser();
    const tokenData = createFakeToken(userData);

    // A successful login should write data to local storage
    localStorage.clear();

    // Execute the function under test;
    authService.logIn(
      userData.username, 'pAssw0rd!'
    ).subscribe(user => {
      expect(user).toBe(tokenData);
    });
    const request = httpMock.expectOne('/api/log_in/');
    request.flush(tokenData);
  
    // Confirm that the expected data was written to local storage.
    expect(localStorage.getItem('taxi.auth')).toBe(JSON.stringify(tokenData));
  });

  it('should allow a user to log out', () => {
    const tokenData = {};

    localStorage.setItem('taxi.auth', JSON.stringify(tokenData));

    authService.logOut();

    expect(localStorage.getItem('taxi.auth')).toBeNull();
  });

  it('should determine whether a user is logged in', () => {
    localStorage.clear();
    expect(AuthService.getUser()).toBeFalsy();
  
    localStorage.setItem('taxi.auth', JSON.stringify(
      createFakeToken(createFakeUser())
    ));
    expect(AuthService.getUser()).toBeTruthy();
  });
    
  afterEach(() => {
    httpMock.verify();
  });
});