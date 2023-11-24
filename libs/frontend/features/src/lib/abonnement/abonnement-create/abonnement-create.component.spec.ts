import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonnementCreateComponent } from './abonnement-create.component';

describe('AboutComponent', () => {
  let component: AbonnementCreateComponent;
  let fixture: ComponentFixture<AbonnementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbonnementCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
