import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationListComponent } from './location-list.component';
import { LocationService } from '../location.services';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { UiModule } from '@client-side/ui';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationListComponent],
      providers: [
        LocationService,
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
      ],
      imports: [RouterModule, UiModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
