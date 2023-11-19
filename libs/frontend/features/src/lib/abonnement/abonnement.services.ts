import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AbonnementService {
  endpoint = 'http://localhost:3000/api/location';

  constructor(private readonly http: HttpClient) {}
}
