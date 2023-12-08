import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationCreateComponent } from './location-create.component';
import { LocationService } from '../location.services';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AbonnementService } from '../../abonnement/abonnement.services';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AbonnementModule } from '../../abonnement/abonnement.module';

describe('LocationCreateComponent', () => {
  let component: LocationCreateComponent;
  let fixture: ComponentFixture<LocationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationCreateComponent],
      providers: [
        LocationService,
        HttpClient,
        HttpHandler,
        AbonnementService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
      ],
      imports: [FormsModule, AbonnementModule, NgMultiSelectDropDownModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
