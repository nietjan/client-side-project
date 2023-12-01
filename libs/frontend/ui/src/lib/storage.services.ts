import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { role } from '@client-side/shared/api';

@Injectable()
export class StorageService {
  private role$ = new BehaviorSubject<role>(role.USER);

  constructor() {
    //set if it is in storageRole
    let storageRole = localStorage.getItem('role');
    if (storageRole != null) this.role$.next(storageRole as role);
  }

  setRole(role: role) {
    this.role$.next(role);
    localStorage.setItem('role', role);
  }

  getRole(): Observable<role> {
    return this.role$;
  }
}
