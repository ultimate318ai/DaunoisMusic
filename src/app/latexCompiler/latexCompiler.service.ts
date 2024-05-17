import { Injectable } from '@angular/core';
import { JsonMusicVariable, LatexCode } from '../services/latexMapping';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LatexCompilerService {
  private readonly ipAddress = 'http://localhost:8080';

  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.ipAddress,
    }),
  };
  constructor(private httpClient: HttpClient) {}

  compileToLatex(json: Record<JsonMusicVariable, LatexCode>) {
    this.httpClient
      .post(`${this.ipAddress}/latex`, { json: json }, this._options)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.warn(error),
      });
  }
}
