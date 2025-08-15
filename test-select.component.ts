import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

export interface TestSelectConfig {
  showAvatar: boolean;
  showIcon: boolean;
  showBadge: boolean;
  options: TestSelectOption[];
}

export type TestSelectVariant = 'large' | 'medium' | 'small' | 'extra-small';

@Component({
  selector: 'ava-test-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent,
    SelectOptionComponent,
    AvatarsComponent,
    IconComponent,
    CheckboxComponent,
    ButtonComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="test-select-wrapper" [attr.data-variant]="variant">
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
            <!-- Avatar Display (Dynamic) -->
            <ava-avatars 
              *ngIf="showAvatar && option.imageUrl"
              [size]="getAvatarSize()"
              [imageUrl]="option.imageUrl"
              [badgeState]="showBadge ? option.badgeState : undefined"
              [badgeCount]="showBadge ? option.badgeCount : undefined"
              class="option-avatar">
            </ava-avatars>
            
            <!-- Checkbox for multiple selection -->
            <ava-checkbox 
              *ngIf="multiple"
              variant="with-bg" 
              [isChecked]="isOptionSelected(option.value)"
              class="option-checkbox">
            </ava-checkbox>
            
            <!-- Icon Display (Dynamic) -->
            <ava-icon 
              *ngIf="showIcon && option.icon && !showAvatar"
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
  @Input() variant: TestSelectVariant = 'medium';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() error: string = '';
  @Input() showAvatar: boolean = true;
  @Input() showIcon: boolean = true;
  @Input() showBadge: boolean = true;
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
    return `test-select test-select--${this.variant}`;
  }

  getOptionContentClass(): string {
    let classes = ['option-content'];
    
    if (this.showAvatar) classes.push('option-content--with-avatar');
    if (this.showIcon && !this.showAvatar) classes.push('option-content--with-icon');
    if (this.multiple) classes.push('option-content--multiple');
    
    classes.push(`option-content--${this.variant}`);
    
    return classes.join(' ');
  }

  getOptionTextClass(): string {
    return `option-text option-text--${this.variant}`;
  }

  getAvatarSize(): string {
    switch (this.variant) {
      case 'large': return 'large';
      case 'medium': return 'medium';
      case 'small': return 'small';
      case 'extra-small': return 'small';
      default: return 'medium';
    }
  }

  getIconSize(): string {
    switch (this.variant) {
      case 'large': return '20';
      case 'medium': return '18';
      case 'small': return '16';
      case 'extra-small': return '14';
      default: return '16';
    }
  }
}

// Demo Page Component
@Component({
  selector: 'app-test-select-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TestSelectComponent,
    ButtonComponent
  ],
  templateUrl: './test-select.component.html',
  styleUrls: ['./test-select.component.scss']
})
export class TestSelectDemoComponent {
  testForm: FormGroup;

  // Selected values for each variant
  selectedValues = {
    large: null,
    medium: null,
    small: null,
    extraSmall: null
  };

  selectedMultipleValues: any[] = [];
  customSelectedValue: any = null;

  // Configuration for each variant
  largeConfig: TestSelectConfig = {
    showAvatar: true,
    showIcon: true,
    showBadge: true,
    options: [
      {
        value: 1,
        label: 'John Doe',
        imageUrl: 'assets/1.png',
        icon: 'user',
        role: 'Software Engineer',
        badgeState: 'high-priority',
        badgeCount: 3
      },
      {
        value: 2,
        label: 'Jane Smith',
        imageUrl: 'assets/1.png',
        icon: 'user',
        role: 'Product Manager',
        badgeState: 'medium-priority',
        badgeCount: 1
      },
      {
        value: 3,
        label: 'Bob Johnson',
        imageUrl: 'assets/1.png',
        icon: 'user',
        role: 'UX Designer',
        badgeState: 'low-priority',
        badgeCount: 5
      },
      {
        value: 4,
        label: 'Alice Brown',
        imageUrl: 'assets/1.png',
        icon: 'user',
        role: 'Data Scientist',
        badgeState: 'information',
        badgeCount: 2
      }
    ]
  };

  mediumConfig: TestSelectConfig = {
    showAvatar: true,
    showIcon: false,
    showBadge: true,
    options: [
      {
        value: 'john',
        label: 'John Doe',
        imageUrl: 'assets/1.png',
        role: 'Senior Developer',
        badgeState: 'high-priority',
        badgeCount: 2
      },
      {
        value: 'jane',
        label: 'Jane Smith',
        imageUrl: 'assets/1.png',
        role: 'Team Lead',
        badgeState: 'medium-priority',
        badgeCount: 1
      },
      {
        value: 'bob',
        label: 'Bob Johnson',
        imageUrl: 'assets/1.png',
        role: 'Designer',
        badgeState: 'low-priority',
        badgeCount: 0
      }
    ]
  };

  smallConfig: TestSelectConfig = {
    showAvatar: false,
    showIcon: true,
    showBadge: false,
    options: [
      {
        value: 'active',
        label: 'Active',
        icon: 'circle-check',
        iconColor: 'green'
      },
      {
        value: 'inactive',
        label: 'Inactive',
        icon: 'x-circle',
        iconColor: 'red'
      },
      {
        value: 'pending',
        label: 'Pending',
        icon: 'clock',
        iconColor: 'orange'
      },
      {
        value: 'suspended',
        label: 'Suspended',
        icon: 'pause',
        iconColor: 'gray'
      }
    ]
  };

  extraSmallConfig: TestSelectConfig = {
    showAvatar: false,
    showIcon: true,
    showBadge: false,
    options: [
      {
        value: 'low',
        label: 'Low Priority',
        icon: 'chevron-down',
        iconColor: 'blue'
      },
      {
        value: 'medium',
        label: 'Medium Priority',
        icon: 'minus',
        iconColor: 'orange'
      },
      {
        value: 'high',
        label: 'High Priority',
        icon: 'arrow-up',
        iconColor: 'red'
      },
      {
        value: 'critical',
        label: 'Critical',
        icon: 'alert-triangle',
        iconColor: 'red'
      }
    ]
  };

  // Custom configuration
  customConfig = {
    variant: 'large' as TestSelectVariant,
    showAvatar: true,
    showIcon: true,
    showBadge: true,
    multiple: false,
    disabled: false
  };

  // Additional option sets
  multiSelectOptions: TestSelectOption[] = [
    {
      value: 1,
      label: 'John Doe',
      imageUrl: 'assets/1.png',
      role: 'Developer',
      badgeState: 'high-priority',
      badgeCount: 3
    },
    {
      value: 2,
      label: 'Jane Smith',
      imageUrl: 'assets/1.png',
      role: 'Manager',
      badgeState: 'medium-priority',
      badgeCount: 1
    },
    {
      value: 3,
      label: 'Bob Johnson',
      imageUrl: 'assets/1.png',
      role: 'Designer',
      badgeState: 'low-priority',
      badgeCount: 2
    }
  ];

  formOptions: TestSelectOption[] = [
    {
      value: 'user1',
      label: 'User 1',
      imageUrl: 'assets/1.png',
      icon: 'user'
    },
    {
      value: 'user2',
      label: 'User 2',
      imageUrl: 'assets/1.png',
      icon: 'user'
    }
  ];

  statusOptions: TestSelectOption[] = [
    {
      value: 'active',
      label: 'Active',
      icon: 'circle-check',
      iconColor: 'green'
    },
    {
      value: 'inactive',
      label: 'Inactive',
      icon: 'x-circle',
      iconColor: 'red'
    }
  ];

  priorityOptions: TestSelectOption[] = [
    {
      value: 'high',
      label: 'High',
      imageUrl: 'assets/1.png',
      badgeState: 'high-priority',
      badgeCount: 1
    },
    {
      value: 'low',
      label: 'Low',
      imageUrl: 'assets/1.png',
      badgeState: 'low-priority',
      badgeCount: 0
    }
  ];

  customOptions: TestSelectOption[] = [
    {
      value: 1,
      label: 'Option 1',
      imageUrl: 'assets/1.png',
      icon: 'star',
      iconColor: 'gold',
      role: 'Custom Role',
      badgeState: 'high-priority',
      badgeCount: 5
    },
    {
      value: 2,
      label: 'Option 2',
      imageUrl: 'assets/1.png',
      icon: 'heart',
      iconColor: 'red',
      role: 'Another Role',
      badgeState: 'medium-priority',
      badgeCount: 2
    }
  ];

  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      user: ['', Validators.required],
      status: [''],
      priority: [{ value: '', disabled: true }]
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.testForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
    }
    return '';
  }

  submitForm(): void {
    if (this.testForm.invalid) {
      this.testForm.markAllAsTouched();
      return;
    }
    console.log('Form submitted:', this.testForm.value);
  }

  resetForm(): void {
    this.testForm.reset();
  }

  getGeneratedCode(): string {
    const config = this.customConfig;
    return `<ava-test-select
  variant="${config.variant}"
  label="Custom Select"
  placeholder="Custom configured select"
  [multiple]="${config.multiple}"
  [disabled]="${config.disabled}"
  [showAvatar]="${config.showAvatar}"
  [showIcon]="${config.showIcon}"
  [showBadge]="${config.showBadge}"
  [options]="options"
  [(ngModel)]="selectedValue">
</ava-test-select>`;
  }
}