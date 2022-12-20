import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWatchComponent } from './create-edit-watch.component';

describe('CreateEditWatchComponent', () => {
  let component: CreateEditWatchComponent;
  let fixture: ComponentFixture<CreateEditWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditWatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
