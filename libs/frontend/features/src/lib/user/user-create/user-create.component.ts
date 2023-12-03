import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, role } from '@client-side/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.services';

@Component({
  selector: 'client-side-project-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  user: IUser = {
    _id: '',
    name: '',
    dateOfBirith: '',
    sex: '',
    phoneNumber: '',
    eMail: '',
    password: '',
    role: role.USER,
    iban: '',
    address: {
      street: '',
      homeNumber: '',
      postalCode: '',
      city: '',
      country: '',
    },
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
