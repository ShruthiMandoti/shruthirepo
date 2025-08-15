import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../../../../play-comp-library/src/lib/components/select/select.component';
import { SelectOptionComponent } from '../../../../../play-comp-library/src/lib/components/select/select-option/select-option.component';
import { AvatarsComponent } from '../../../../../play-comp-library/src/lib/components/avatars/avatars.component';
import { ButtonComponent, CheckboxComponent, IconComponent } from '../../../../../play-comp-library/src/public-api';

export interface TestSelectOption {
  value: any;
  label: string;
  imageUrl?: string;
  icon?: string;
  iconColor?: string;
  role?: string;
  badgeState?: string;
  badgeCount?: number;
  disabled?: boolean;
}

export type TestSelectSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type TestSelectVariant = 'standard' | 'primary';

@Component({
  selector: 'ava-test-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectComponent,
    SelectOptionComponent,
    AvatarsComponent,
    IconComponent,
    CheckboxComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="test-select-wrapper" [attr.data-size]="size" [attr.data-variant]="variant">
      <ava-select
        [label]="label"
        [placeholder]="placeholder"
        [multiple]="multiple"
        [disabled]="disabled"
        [required]="required"
        [error]="error"
        [class]="getSelectClass()"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        (selectionChange)="onSelectionChange($event)">
        
        <ava-select-option 
          *ngFor="let option of options" 
          [value]="option.value"
          [disabled]="option.disabled">
          
          <div class="option-content" [class]="getOptionContentClass()">
            <!-- Avatar Display (if option has imageUrl) -->
            <ava-avatars 
              *ngIf="option.imageUrl"
              [size]="getAvatarSize()"
              [imageUrl]="option.imageUrl"
              [badgeState]="option.badgeState"
              [badgeCount]="option.badgeCount"
              class="option-avatar">
            </ava-avatars>
            
            <!-- Checkbox for multiple selection -->
            <ava-checkbox 
              *ngIf="multiple"
              variant="with-bg" 
              [isChecked]="isOptionSelected(option.value)"
              class="option-checkbox">
            </ava-checkbox>
            
            <!-- Icon Display (if option has icon and no imageUrl) -->
            <ava-icon 
              *ngIf="option.icon && !option.imageUrl"
              [iconName]="option.icon"
              [iconColor]="option.iconColor"
              [iconSize]="getIconSize()"
              class="option-icon">
            </ava-icon>
            
            <!-- Option Text Content -->
            <div class="option-text" [class]="getOptionTextClass()">
              <div class="option-label">{{ option.label }}</div>
              <div *ngIf="option.role" class="option-role">{{ option.role }}</div>
            </div>
          </div>
        </ava-select-option>
      </ava-select>
    </div>
  `,
  styleUrls: ['./test-select.component.scss']
})
export class TestSelectComponent implements ControlValueAccessor {
  @Input() size: TestSelectSize = 'md';
  @Input() variant: TestSelectVariant = 'standard';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() error: string = '';
  @Input() options: TestSelectOption[] = [];

  @Output() selectionChange = new EventEmitter<any>();

  value: any = this.multiple ? [] : null;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  onSelectionChange(event: any): void {
    this.selectionChange.emit(event);
  }

  isOptionSelected(optionValue: any): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(optionValue);
    }
    return this.value === optionValue;
  }

  getSelectClass(): string {
    return `test-select test-select--${this.size} test-select--${this.variant}`;
  }

  getOptionContentClass(): string {
    let classes = ['option-content'];
    
    if (this.multiple) classes.push('option-content--multiple');
    classes.push(`option-content--${this.size}`);
    
    return classes.join(' ');
  }

  getOptionTextClass(): string {
    return `option-text option-text--${this.size}`;
  }

  getAvatarSize(): string {
    switch (this.size) {
      case 'xl': return 'large';
      case 'lg': return 'large';
      case 'md': return 'medium';
      case 'sm': return 'small';
      case 'xs': return 'small';
      default: return 'medium';
    }
  }

  getIconSize(): string {
    switch (this.size) {
      case 'xl': return '20';
      case 'lg': return '18';
      case 'md': return '16';
      case 'sm': return '14';
      case 'xs': return '12';
      default: return '16';
    }
  }
}

// Demo Page Component (simplified)
@Component({
  selector: 'app-test-select-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TestSelectComponent
  ],
  templateUrl: './test-select.component.html',
  styleUrls: ['./test-select.component.scss']
})
export class TestSelectDemoComponent {
  // Selected values for each size and variant
  selectedValues = {
    xl: null,
    lg: null,
    md: null,
    sm: null,
    xs: null
  };

  selectedValuesPrimary = {
    xl: null,
    lg: null,
    md: null,
    sm: null,
    xs: null
  };

  selectedValuesDisabled = {
    xl: null,
    lg: null,
    md: null,
    sm: null,
    xs: null
  };

  selectedValuesIcon = {
    xl: null,
    lg: null,
    md: null,
    sm: null,
    xs: null
  };

  selectedValuesAvatar = {
    xl: null,
    lg: null,
    md: null,
    sm: null,
    xs: null
  };

  selectedValuesMultiple = {
    xl: [],
    lg: [],
    md: [],
    sm: [],
    xs: []
  };

  // Sample options for basic select
  sampleOptions: TestSelectOption[] = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
    { value: 4, label: 'Option 4' },
    { value: 5, label: 'Option 5' }
  ];

  // Options with icons
  iconOptions: TestSelectOption[] = [
    {
      value: 'home',
      label: 'Home',
      icon: 'home',
      iconColor: '#3b82f6'
    },
    {
      value: 'settings',
      label: 'Settings',
      icon: 'settings',
      iconColor: '#6b7280'
    },
    {
      value: 'profile',
      label: 'Profile',
      icon: 'user',
      iconColor: '#10b981'
    },
    {
      value: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      iconColor: '#f59e0b'
    }
  ];

  // Options with avatars
  avatarOptions: TestSelectOption[] = [
    {
      value: 1,
      label: 'John Doe',
      imageUrl: 'assets/1.png',
      role: 'Software Engineer',
      badgeState: 'high-priority',
      badgeCount: 3
    },
    {
      value: 2,
      label: 'Jane Smith',
      imageUrl: 'assets/1.png',
      role: 'Product Manager',
      badgeState: 'medium-priority',
      badgeCount: 1
    },
    {
      value: 3,
      label: 'Bob Johnson',
      imageUrl: 'assets/1.png',
      role: 'UX Designer',
      badgeState: 'low-priority',
      badgeCount: 2
    },
    {
      value: 4,
      label: 'Alice Brown',
      imageUrl: 'assets/1.png',
      role: 'Data Scientist',
      badgeState: 'information',
      badgeCount: 0
    }
  ];

  handleSelection(event: any): void {
    console.log('Selection changed:', event);
  }
}