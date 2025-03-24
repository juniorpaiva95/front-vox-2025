import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { By } from '@angular/platform-browser';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  const mockItems = [
    {
      label: 'Editar',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      color: 'text-yellow-600',
      action: () => {}
    },
    {
      label: 'Excluir',
      icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      color: 'text-red-600',
      action: () => {}
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.items = mockItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dropdown closed', () => {
    expect(component.isOpen).toBeFalse();
  });

  it('should toggle dropdown when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.isOpen).toBeTrue();

    button.triggerEventHandler('click', null);
    expect(component.isOpen).toBeFalse();
  });

  it('should render all items in dropdown', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('button[role="menuitem"]'));
    expect(items.length).toBe(mockItems.length);
  });

  it('should render items with correct labels', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('button[role="menuitem"]'));
    items.forEach((item, index) => {
      expect(item.nativeElement.textContent.trim()).toContain(mockItems[index].label);
    });
  });

  it('should render items with correct icons', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(By.css('button[role="menuitem"] svg path'));
    icons.forEach((icon, index) => {
      expect(icon.attributes['d']).toBe(mockItems[index].icon);
    });
  });

  it('should apply correct color classes to items', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('button[role="menuitem"]'));
    items.forEach((item, index) => {
      expect(item.classes[mockItems[index].color]).toBeTrue();
    });
  });

  it('should call item action when clicked', () => {
    const spy = jasmine.createSpy('action');
    component.items[0].action = spy;
    component.isOpen = true;
    fixture.detectChanges();

    const firstItem = fixture.debugElement.query(By.css('button[role="menuitem"]'));
    firstItem.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
  });

  it('should close dropdown after item is clicked', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const firstItem = fixture.debugElement.query(By.css('button[role="menuitem"]'));
    firstItem.triggerEventHandler('click', null);
    expect(component.isOpen).toBeFalse();
  });

  it('should emit itemSelected event when item is clicked', () => {
    const spy = jasmine.createSpy('itemSelected');
    component.itemSelected.subscribe(spy);
    component.isOpen = true;
    fixture.detectChanges();

    const firstItem = fixture.debugElement.query(By.css('button[role="menuitem"]'));
    firstItem.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(mockItems[0]);
  });

  it('should close dropdown when clicking outside', fakeAsync(() => {
    component.isOpen = true;
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));
    tick();

    expect(component.isOpen).toBeFalse();
  }));

  it('should handle items without icons', () => {
    const itemsWithoutIcons = [
      { label: 'Item 1', action: () => {} },
      { label: 'Item 2', action: () => {} }
    ];
    component.items = itemsWithoutIcons;
    component.isOpen = true;
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(By.css('button[role="menuitem"] svg'));
    expect(icons.length).toBe(0);
  });

  it('should handle items without color', () => {
    const itemsWithoutColor = [
      { label: 'Item 1', action: () => {} },
      { label: 'Item 2', action: () => {} }
    ];
    component.items = itemsWithoutColor;
    component.isOpen = true;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('button[role="menuitem"]'));
    items.forEach(item => {
      expect(item.classes['text-gray-700']).toBeTrue();
    });
  });
}); 