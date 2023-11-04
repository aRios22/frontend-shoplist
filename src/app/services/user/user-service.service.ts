import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {}

  login(administrador: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/login", administrador, {"observe": "response"}
    ).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;

      sessionStorage.setItem('token', body['token']);
      sessionStorage.setItem('username', body['usuario']);
      return body;
    }
    ));
  }

  logout()   {   
    sessionStorage.removeItem('token');  
    sessionStorage.removeItem('username'); 
    
  }  

  getToken(){
    return sessionStorage.getItem('token');
  }

  getUsername(){
    return sessionStorage.getItem('username');
  }

  setUsername(username:string){
    return sessionStorage.setItem('username', username);
  }

  isLoggedIn() {
    if (this.getToken() == null) {
      return false;
    }
    else {
      return true;
    }
  }
}
