import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserIncidentsPage } from './user-incidents.page';

describe('UserIncidentsPage', () => {
  let component: UserIncidentsPage;
  let fixture: ComponentFixture<UserIncidentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIncidentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
