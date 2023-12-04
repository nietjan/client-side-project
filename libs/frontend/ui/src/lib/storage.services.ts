import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROLE } from '@client-side/shared/api';

@Injectable()
export class StorageService {
  private role$ = new BehaviorSubject<ROLE>(ROLE.USER);
  private userId$ = new BehaviorSubject<string | null>(null);

  constructor() {
    //set if it is in storageRole
    let storageRole = localStorage.getItem('role');
    if (storageRole != null) this.role$.next(storageRole as ROLE);

    this.userId$.next(localStorage.getItem('id'));
  }

  setRole(role: ROLE) {
    this.role$.next(role);
    localStorage.setItem('role', role);
  }

  getRole(): Observable<ROLE> {
    return this.role$;
  }

  setUserId(id: string | null) {
    this.userId$.next(id);
    if (id == null) localStorage.removeItem('id');
    else localStorage.setItem('id', id);
  }

  getUserId(): Observable<string | null> {
    return this.userId$;
  }
}
