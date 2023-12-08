import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, ROLE } from '@client-side/shared/api';
import { UserService } from '../user.services';
import { ActivatedRoute, Router } from '@angular/router';

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
  isUpdating: boolean = false;

  maxDateOfBirth: string = '';
  minDateOfBirth: string = '';

  roles: string[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //set min and max date
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

    //if in param there is id, than it is a update
    this.route.paramMap?.subscribe((params) => {
      let id = params.get('id');
      if (id != null) {
        this.isUpdating = true;
        this.userService
          .singleUser(id)
          .subscribe((value) => (this.user = { ...this.user, ...value }));
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public onSubmit(): void {
    if (this.isUpdating) {
      var locationId = this.userService.updateUser(this.user);
    } else {
      var locationId = this.userService.createUser(this.user);
    }

    //redirect back to list
    if (locationId != null) this.router.navigateByUrl(`/location`);
  }
}
