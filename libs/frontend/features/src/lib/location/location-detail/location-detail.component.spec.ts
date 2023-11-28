import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationDetailComponent } from './location-detail.component';
import { LocationService } from '../location.services';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '@client-side/ui';

describe('LocationDetailComponent', () => {
  let component: LocationDetailComponent;
  let fixture: ComponentFixture<LocationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationDetailComponent],
      providers: [
        {
          ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
        LocationService,
        HttpClientModule,
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, UiModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function Of(arg0: { id: number }) {
  throw new Error('Function not implemented.');
}
