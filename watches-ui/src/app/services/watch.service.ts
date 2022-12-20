import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Watch } from '../models/watch';
import { WatchStyle } from '../models/watch-style';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  private url = 'Watch';
  private url2 = 'WatchStyle';

  constructor(private http: HttpClient) { }


  public getWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${environment.baseApiUrl}/${this.url}`);
  }

  public createWatch(watch: Watch): Observable<Watch[]> {
    return this.http.post<Watch[]>(`${environment.baseApiUrl}/${this.url}`, watch);
  }

  public updateWatch(watch: Watch, id: number): Observable<Watch[]> {
    return this.http.put<Watch[]>(`${environment.baseApiUrl}/${this.url}/${id}`, watch);
  }

  public deleteWatch(id: number): Observable<Watch[]> {
    return this.http.delete<Watch[]>(`${environment.baseApiUrl}/${this.url}/${id}`);
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
}
