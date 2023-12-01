import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonnementListComponent } from './abonnement-list.component';
import { AbonnementService } from '../abonnement.services';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { UiModule } from '@client-side/ui';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';

describe('AboutComponent', () => {
  let component: AbonnementListComponent;
  let fixture: ComponentFixture<AbonnementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbonnementListComponent],
      providers: [
        AbonnementService,
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
        StorageService,
      ],
      imports: [RouterModule, UiModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
