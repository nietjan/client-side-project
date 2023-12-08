import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonnementCreateComponent } from './abonnement-create.component';
import { AbonnementService } from '../abonnement.services';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AboutComponent', () => {
  let component: AbonnementCreateComponent;
  let fixture: ComponentFixture<AbonnementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbonnementCreateComponent],
      providers: [
        AbonnementService,
        HttpClientModule,
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
      ],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
