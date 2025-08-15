# Test Select Component

A comprehensive, reusable select component that extends your existing `app-select` and `avatars` components with multiple size variants and dynamic features.

## Features

- **4 Size Variants**: Large, Medium, Small, Extra Small
- **Dynamic Components**: Toggle avatar, icon, and badge display
- **Form Integration**: Full reactive forms support with validation
- **Multiple Selection**: Checkbox-based multi-select functionality
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive Design**: Mobile-friendly with adaptive sizing

## Installation

Import the component in your module:

```typescript
import { TestSelectComponent } from './test-select.component';

@Component({
  imports: [TestSelectComponent, ...],
  // ...
})
```

## Basic Usage

```html
<ava-test-select
  variant="large"
  label="Select User"
  placeholder="Choose a user"
  [showAvatar]="true"
  [showIcon]="true"
  [showBadge]="true"
  [options]="userOptions"
  [(ngModel)]="selectedUser">
</ava-test-select>
```

## Variants

### Large Variant
- **Dimensions**: 280px width, 364px max height
- **Use Case**: Primary selections, detailed user interfaces
- **Avatar Size**: 40px
- **Font Size**: 15px (label), 13px (role)

```html
<ava-test-select
  variant="large"
  [options]="options"
  [(ngModel)]="value">
</ava-test-select>
```

### Medium Variant
- **Dimensions**: 233px width, 340px max height
- **Use Case**: Standard form fields, team selection
- **Avatar Size**: 36px
- **Font Size**: 14px (label), 12px (role)

```html
<ava-test-select
  variant="medium"
  [options]="options"
  [(ngModel)]="value">
</ava-test-select>
```

### Small Variant
- **Dimensions**: 233px width, 316px max height
- **Use Case**: Compact forms, status selection
- **Avatar Size**: 32px
- **Font Size**: 13px (label), 11px (role)

```html
<ava-test-select
  variant="small"
  [options]="options"
  [(ngModel)]="value">
</ava-test-select>
```

### Extra Small Variant
- **Dimensions**: 233px width, 264px max height
- **Use Case**: Dense interfaces, priority selection
- **Avatar Size**: 28px
- **Font Size**: 12px (label), 10px (role)

```html
<ava-test-select
  variant="extra-small"
  [options]="options"
  [(ngModel)]="value">
</ava-test-select>
```

## Dynamic Features

### Avatar Display
Toggle avatar display in options:

```html
<ava-test-select
  [showAvatar]="true"
  [options]="optionsWithImages"
  [(ngModel)]="value">
</ava-test-select>
```

### Icon Display
Toggle icon display (shows when avatar is disabled):

```html
<ava-test-select
  [showAvatar]="false"
  [showIcon]="true"
  [options]="optionsWithIcons"
  [(ngModel)]="value">
</ava-test-select>
```

### Badge Display
Toggle badge display on avatars:

```html
<ava-test-select
  [showAvatar]="true"
  [showBadge]="true"
  [options]="optionsWithBadges"
  [(ngModel)]="value">
</ava-test-select>
```

## Option Configuration

### Option Interface

```typescript
interface TestSelectOption {
  value: any;                 // Option value
  label: string;             // Display text
  imageUrl?: string;         // Avatar image URL
  icon?: string;             // Icon name
  iconColor?: string;        // Icon color
  role?: string;             // Subtitle text
  badgeState?: string;       // Badge color state
  badgeCount?: number;       // Badge number
  disabled?: boolean;        // Disable option
}
```

### Example Options

```typescript
const userOptions: TestSelectOption[] = [
  {
    value: 1,
    label: 'John Doe',
    imageUrl: 'assets/john.png',
    icon: 'user',
    role: 'Software Engineer',
    badgeState: 'high-priority',
    badgeCount: 3
  },
  {
    value: 2,
    label: 'Jane Smith',
    imageUrl: 'assets/jane.png',
    icon: 'user',
    role: 'Product Manager',
    badgeState: 'medium-priority',
    badgeCount: 1,
    disabled: false
  }
];
```

## Multiple Selection

Enable multiple selection with checkboxes:

```html
<ava-test-select
  variant="large"
  [multiple]="true"
  [showAvatar]="true"
  [options]="teamOptions"
  [(ngModel)]="selectedTeamMembers">
</ava-test-select>
```

```typescript
selectedTeamMembers: number[] = [1, 3]; // Array of selected values
```

## Form Integration

### Reactive Forms

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // ...
})
export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      status: [''],
      priority: ['']
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
    }
    return '';
  }
}
```

```html
<form [formGroup]="form">
  <ava-test-select
    variant="large"
    label="Required User"
    [required]="true"
    [error]="getFieldError('user')"
    [options]="userOptions"
    formControlName="user">
  </ava-test-select>
</form>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'large' \| 'medium' \| 'small' \| 'extra-small'` | `'medium'` | Size variant |
| `label` | `string` | `''` | Field label |
| `placeholder` | `string` | `''` | Placeholder text |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `disabled` | `boolean` | `false` | Disable the component |
| `required` | `boolean` | `false` | Mark as required |
| `error` | `string` | `''` | Error message |
| `showAvatar` | `boolean` | `true` | Show avatars in options |
| `showIcon` | `boolean` | `true` | Show icons in options |
| `showBadge` | `boolean` | `true` | Show badges on avatars |
| `options` | `TestSelectOption[]` | `[]` | Available options |

## Output Events

| Event | Type | Description |
|-------|------|-------------|
| `selectionChange` | `EventEmitter<any>` | Emitted when selection changes |

## CSS Classes

### Size-Specific Classes
- `.test-select--large`
- `.test-select--medium`
- `.test-select--small`
- `.test-select--extra-small`

### Content Classes
- `.option-content--with-avatar`
- `.option-content--with-icon`
- `.option-content--multiple`

## Customization

### Custom Styling

```scss
.test-select-wrapper[data-variant="large"] {
  .option-content {
    // Custom styles for large variant
    padding: 16px 20px;
  }
}
```

### Custom Option Template

The component automatically handles different configurations:

```html
<!-- Avatar + Badge + Text -->
<ava-test-select [showAvatar]="true" [showBadge]="true" [showIcon]="false">

<!-- Icon + Text only -->
<ava-test-select [showAvatar]="false" [showBadge]="false" [showIcon]="true">

<!-- Text only -->
<ava-test-select [showAvatar]="false" [showBadge]="false" [showIcon]="false">
```

## Accessibility

- Full keyboard navigation support
- ARIA labels and descriptions
- Screen reader compatibility
- Focus management
- High contrast support

### Keyboard Navigation
- `Tab` - Navigate to/from component
- `Enter/Space` - Open/close dropdown
- `↑/↓` - Navigate options
- `Enter` - Select option
- `Escape` - Close dropdown

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Examples

Check the demo component (`TestSelectDemoComponent`) for comprehensive usage examples including:

- All 4 size variants
- Dynamic feature toggling
- Multiple selection
- Form validation
- Custom configurations
- Error handling

## Dependencies

This component reuses and extends:
- `SelectComponent` from your component library
- `SelectOptionComponent` from your component library
- `AvatarsComponent` from your component library
- `IconComponent` from your component library
- `CheckboxComponent` from your component library

Make sure these components are available in your project.