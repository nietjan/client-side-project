import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@client-side/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-side-project-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  userId: string | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //get locationId and if null return to /location
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    if (this.userId == null) this.router.navigateByUrl('/location');
  }

  ngOnInit(): void {
    this.subscription = this.userService
      .singleUser(this.userId!)
      .subscribe((result) => {
        console.log(`result: ${result}`);
        this.user = result;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
