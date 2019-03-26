import { Injectable } from '@angular/core';
import { Contrato } from './contrato';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private contratosUrl = '/api/v1';
  nct: Number;
  key: String;
  constructor(
    private http: HttpClient
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    /*this.messageService.add(`HeroService: ${message}`);*/
    console.log(`HeroService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setApikey(token) {
    alert(token);

    window.localStorage.setItem('token', token);

  }


  getApikey() {

    return window.localStorage.getItem('token');

  }

  getContratos(key): Observable<Contrato[]> {
    const url = `${this.contratosUrl}/contratos?apikey=${key}`;
    return this.http.get<Contrato[]>(url)
      .pipe(
        tap(() => this.log('fetched contratos')),
        catchError(this.handleError('getContratos', []))
      );
  }

  getContrato(id: string, key): any {
    const url = `${this.contratosUrl}/contratos/${id}?apikey=${key}`;
    return this.http.get<Contrato>(url)
      .pipe(
        tap(() => this.log('fetched contratos')),
        catchError(this.handleError('getContratos', []))
      );
  }

  getContrato2(contrato: Number, key) {
    return this.http.get(this.contratosUrl + '/contratos/' + contrato + '?apikey=' + key);
  }



  addContrato(contrato: Contrato, key): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.contratosUrl}/contratos?apikey=${key}`;
    return this.http.post(url, contrato, { responseType: 'text', headers: headers })
      .pipe(
        tap(() => this.log(`add contrato NoContrato =${contrato.NoContrato}`)),
        catchError(this.handleError('addContrato', []))
      );
  }

  updateContrato(contrato: Contrato, key): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.contratosUrl}/contratos/${contrato.NoContrato}?apikey=${key}`;
    return this.http.put(url, contrato, { responseType: 'text', headers: headers })
      .pipe(
        tap(() => this.log(`updated contrato NoContrato=${contrato.NoContrato}`)),
        catchError(this.handleError('updateContrato', []))
      );
  }


  deleteContrato(contrato: Contrato, key): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.contratosUrl}/contratos/${contrato.NoCandidato}?apikey=${key}`;
    return this.http.delete(url, { responseType: 'text', headers: headers })
      .pipe(
        tap(() => this.log(`delete contrato NoCandidato=${contrato.NoCandidato}`)),
        catchError(this.handleError('deleteContrato', []))
      );
  }

  updateContrato2(name, contrato: Contrato, key) {
    return this.http.put(this.contratosUrl + '/contratos/' + name + '?apikey=' + key, contrato);
  }

  deleteContrato2(contrato: Contrato, key) {
    return this.http.delete(this.contratosUrl + '/contratos/' + contrato.NoContrato + '?apikey=' + key);
  }

}
