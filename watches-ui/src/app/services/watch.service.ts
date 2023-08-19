import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/user-info';
import { Watch } from '../models/watch';
import { WatchStyle } from '../models/watch-style';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  private url = 'Watch';
  private url2 = 'WatchStyle';
  private url3 = 'Login';
  private url4 = 'Register';

  constructor(private http: HttpClient, private router: Router) { }


  public getWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${environment.baseApiUrl}/${this.url}`);
  }

  public createWatch(watch: Watch, jwtToken: string): Observable<Watch[]> {
    jwtToken = jwtToken.slice(1, -1);
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${jwtToken}`
     });

    return this.http.post<Watch[]>(`${environment.baseApiUrl}/${this.url}`, watch, {headers});
  }

  public updateWatch(watch: Watch, id: number, jwtToken: string): Observable<Watch[]> {
    jwtToken = jwtToken.slice(1, -1);
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${jwtToken}`
     });

    return this.http.put<Watch[]>(`${environment.baseApiUrl}/${this.url}/${id}`, watch, {headers});
  }

  public deleteWatch(id: number, jwtToken: string): Observable<Watch[]> {
    jwtToken = jwtToken.slice(1, -1);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.delete<Watch[]>(`${environment.baseApiUrl}/${this.url}/${id}`, {headers});
  }


  public getWatchStyles(): Observable<WatchStyle[]> {
    return this.http.get<WatchStyle[]>(`${environment.baseApiUrl}/${this.url2}`);
  }


  public w?: Watch;
  public isEdit?: boolean;

  public getW(): Watch {
    return this.w!;
  }

  public setW(w: any) {
    this.w = w;
  }

  public getE(): boolean {
    return this.isEdit!;
  }

  public setE(isedit: boolean) {
    this.isEdit = isedit;
  }

  public register(info: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${environment.baseApiUrl}/Auth/${this.url4}`, info);
  }

  public login(info: UserInfo) {

    return this.http.post<any>(`${environment.baseApiUrl}/Auth/${this.url3}`, info)
    .pipe(
      tap(response => {
        localStorage.setItem('jwtToken', JSON.stringify(response.jwtToken));

        this.router.navigate(['/']);
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }


  public isLoggedIn?: boolean;

  public setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  public getIsLoggedIn(): boolean {
    return this.isLoggedIn!;
  }

}
