import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, ROLE } from '@client-side/shared/api';
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
    role: ROLE.USER,
    iban: '',
    address: {
      street: '',
      homeNumber: '',
      postalCode: '',
      city: '',
      country: '',
    },
  };

  maxDateOfBirth: string = '';
  minDateOfBirth: string = '';

  roles: string[] = [];

  constructor(private userService: UserService) {
    let date = new Date();
    date.setFullYear(new Date().getFullYear() - 16);
    this.maxDateOfBirth = date.toISOString().split('T')[0];

    date.setFullYear(new Date().getFullYear() - 120);
    this.minDateOfBirth = date.toISOString().split('T')[0];

    console.log(this.minDateOfBirth, this.maxDateOfBirth);

    //fill roles array
    const stringKeys = Object.values(ROLE);
    stringKeys.forEach((key) => {
      this.roles.push(key.valueOf());
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onSubmit(): void {}
}
