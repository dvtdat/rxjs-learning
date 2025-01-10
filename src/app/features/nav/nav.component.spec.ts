import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

import { NavComponent } from './nav.component';
import { NavigationComponent } from '../../components/atoms/navigation/navigation.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, NavigationComponent, RouterLinkActive],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'test-id',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
