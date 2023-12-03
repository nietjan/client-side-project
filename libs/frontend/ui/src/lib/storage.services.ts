import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROLE } from '@client-side/shared/api';

@Injectable()
export class StorageService {
  private role$ = new BehaviorSubject<ROLE>(ROLE.USER);

  constructor() {
    //set if it is in storageRole
    let storageRole = localStorage.getItem('role');
    if (storageRole != null) this.role$.next(storageRole as ROLE);
  }

  setRole(role: ROLE) {
    this.role$.next(role);
    localStorage.setItem('role', role);
  }

  getRole(): Observable<ROLE> {
    return this.role$;
  }
}
