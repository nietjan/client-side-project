import { Injectable } from '@angular/core';
import { StorageService } from '../storage.services';
import { Subscription } from 'rxjs';
import { ROLE } from '@client-side/shared/api';

@Injectable({ providedIn: 'root' })
export class EmployeeGuard {
  canActivate() {
    const role = localStorage.getItem('role');
    if (role == ROLE.EMPLOYEE) {
      return true;
    }
    return false;
  }
}
