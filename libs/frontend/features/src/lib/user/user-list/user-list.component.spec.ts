import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { LocationService } from '../../location/location.services';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UserService } from '../user.services';
import { UiService } from 'libs/frontend/ui/src/lib/ui.services';
import { SpinnerComponent } from '@client-side/ui';
import { HttpClientModule } from '@angular/common/http';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, SpinnerComponent],
      providers: [
        LocationService,
        HttpClient,
        HttpHandler,
        UserService,
        UiService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
