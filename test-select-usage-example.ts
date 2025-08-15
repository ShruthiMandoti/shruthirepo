// Example: How to integrate and use the TestSelectComponent in your application

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestSelectComponent, TestSelectOption } from './test-select.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [TestSelectComponent],
  template: `
    <div class="user-management">
      <h1>User Management System</h1>
      
      <!-- Example 1: Large variant with avatars and badges -->
      <section class="demo-section">
        <h2>Assign Team Lead</h2>
        <ava-test-select
          variant="large"
          label="Select Team Lead"
          placeholder="Choose a team lead"
          [showAvatar]="true"
          [showIcon]="false"
          [showBadge]="true"
          [options]="teamLeadOptions"
          [(ngModel)]="selectedTeamLead">
        </ava-test-select>
        <p>Selected: {{ selectedTeamLead }}</p>
      </section>

      <!-- Example 2: Medium variant with multiple selection -->
      <section class="demo-section">
        <h2>Select Team Members</h2>
        <ava-test-select
          variant="medium"
          label="Team Members"
          placeholder="Select multiple team members"
          [multiple]="true"
          [showAvatar]="true"
          [showIcon]="false"
          [showBadge]="false"
          [options]="teamMemberOptions"
          [(ngModel)]="selectedTeamMembers">
        </ava-test-select>
        <p>Selected: {{ selectedTeamMembers | json }}</p>
      </section>

      <!-- Example 3: Small variant with status icons -->
      <section class="demo-section">
        <h2>Set Project Status</h2>
        <ava-test-select
          variant="small"
          label="Project Status"
          placeholder="Select status"
          [showAvatar]="false"
          [showIcon]="true"
          [showBadge]="false"
          [options]="statusOptions"
          [(ngModel)]="selectedStatus">
        </ava-test-select>
        <p>Selected: {{ selectedStatus }}</p>
      </section>

      <!-- Example 4: Extra small variant with priority -->
      <section class="demo-section">
        <h2>Set Task Priority</h2>
        <ava-test-select
          variant="extra-small"
          label="Priority"
          placeholder="Select priority"
          [showAvatar]="false"
          [showIcon]="true"
          [showBadge]="false"
          [options]="priorityOptions"
          [(ngModel)]="selectedPriority">
        </ava-test-select>
        <p>Selected: {{ selectedPriority }}</p>
      </section>

      <!-- Example 5: Form integration with validation -->
      <section class="demo-section">
        <h2>Create New Project</h2>
        <form [formGroup]="projectForm" (ngSubmit)="createProject()">
          <div class="form-row">
            <ava-test-select
              variant="large"
              label="Project Manager *"
              placeholder="Select project manager"
              [required]="true"
              [error]="getFieldError('manager')"
              [showAvatar]="true"
              [showIcon]="false"
              [showBadge]="true"
              [options]="managerOptions"
              formControlName="manager">
            </ava-test-select>
          </div>

          <div class="form-row">
            <ava-test-select
              variant="medium"
              label="Development Team"
              placeholder="Select team members"
              [multiple]="true"
              [showAvatar]="true"
              [showIcon]="false"
              [showBadge]="false"
              [options]="developerOptions"
              formControlName="team">
            </ava-test-select>
          </div>

          <div class="form-row">
            <ava-test-select
              variant="small"
              label="Project Priority"
              placeholder="Select priority"
              [showAvatar]="false"
              [showIcon]="true"
              [showBadge]="false"
              [options]="priorityOptions"
              formControlName="priority">
            </ava-test-select>
          </div>

          <button type="submit" [disabled]="projectForm.invalid">
            Create Project
          </button>
        </form>
      </section>

      <!-- Example 6: Dynamic configuration -->
      <section class="demo-section">
        <h2>Dynamic Configuration Example</h2>
        <div class="controls">
          <label>
            <input type="checkbox" [(ngModel)]="dynamicConfig.showAvatar">
            Show Avatars
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="dynamicConfig.showIcon">
            Show Icons
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="dynamicConfig.showBadge">
            Show Badges
          </label>
          <label>
            Variant:
            <select [(ngModel)]="dynamicConfig.variant">
              <option value="large">Large</option>
              <option value="medium">Medium</option>
              <option value="small">Small</option>
              <option value="extra-small">Extra Small</option>
            </select>
          </label>
        </div>

        <ava-test-select
          [variant]="dynamicConfig.variant"
          label="Dynamic Select"
          placeholder="Dynamically configured"
          [showAvatar]="dynamicConfig.showAvatar"
          [showIcon]="dynamicConfig.showIcon"
          [showBadge]="dynamicConfig.showBadge"
          [options]="allFeaturesOptions"
          [(ngModel)]="dynamicSelectedValue">
        </ava-test-select>
      </section>
    </div>
  `,
  styles: [`
    .user-management {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .demo-section {
      margin-bottom: 40px;
      padding: 20px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
    }

    .form-row {
      margin-bottom: 20px;
    }

    .controls {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .controls label {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
    }

    button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
  `]
})
export class UserManagementComponent {
  // Form for project creation
  projectForm: FormGroup;

  // Selected values
  selectedTeamLead: any = null;
  selectedTeamMembers: any[] = [];
  selectedStatus: string = '';
  selectedPriority: string = '';
  dynamicSelectedValue: any = null;

  // Dynamic configuration
  dynamicConfig = {
    variant: 'large' as any,
    showAvatar: true,
    showIcon: true,
    showBadge: true
  };

  // Option data sets
  teamLeadOptions: TestSelectOption[] = [
    {
      value: 'lead1',
      label: 'Sarah Johnson',
      imageUrl: 'assets/users/sarah.png',
      role: 'Senior Engineering Manager',
      badgeState: 'high-priority',
      badgeCount: 5
    },
    {
      value: 'lead2',
      label: 'Michael Chen',
      imageUrl: 'assets/users/michael.png',
      role: 'Technical Lead',
      badgeState: 'medium-priority',
      badgeCount: 3
    },
    {
      value: 'lead3',
      label: 'Emily Rodriguez',
      imageUrl: 'assets/users/emily.png',
      role: 'Product Manager',
      badgeState: 'information',
      badgeCount: 2
    }
  ];

  teamMemberOptions: TestSelectOption[] = [
    {
      value: 'dev1',
      label: 'Alex Smith',
      imageUrl: 'assets/users/alex.png',
      role: 'Frontend Developer'
    },
    {
      value: 'dev2',
      label: 'Jamie Wilson',
      imageUrl: 'assets/users/jamie.png',
      role: 'Backend Developer'
    },
    {
      value: 'dev3',
      label: 'Chris Taylor',
      imageUrl: 'assets/users/chris.png',
      role: 'Full Stack Developer'
    },
    {
      value: 'dev4',
      label: 'Morgan Davis',
      imageUrl: 'assets/users/morgan.png',
      role: 'DevOps Engineer'
    }
  ];

  statusOptions: TestSelectOption[] = [
    {
      value: 'planning',
      label: 'Planning',
      icon: 'calendar',
      iconColor: '#3b82f6'
    },
    {
      value: 'in-progress',
      label: 'In Progress',
      icon: 'play-circle',
      iconColor: '#10b981'
    },
    {
      value: 'review',
      label: 'In Review',
      icon: 'eye',
      iconColor: '#f59e0b'
    },
    {
      value: 'completed',
      label: 'Completed',
      icon: 'check-circle',
      iconColor: '#22c55e'
    },
    {
      value: 'on-hold',
      label: 'On Hold',
      icon: 'pause-circle',
      iconColor: '#ef4444'
    }
  ];

  priorityOptions: TestSelectOption[] = [
    {
      value: 'low',
      label: 'Low',
      icon: 'arrow-down',
      iconColor: '#6b7280'
    },
    {
      value: 'medium',
      label: 'Medium',
      icon: 'minus',
      iconColor: '#f59e0b'
    },
    {
      value: 'high',
      label: 'High',
      icon: 'arrow-up',
      iconColor: '#ef4444'
    },
    {
      value: 'urgent',
      label: 'Urgent',
      icon: 'alert-triangle',
      iconColor: '#dc2626'
    }
  ];

  managerOptions: TestSelectOption[] = [
    {
      value: 'pm1',
      label: 'David Kim',
      imageUrl: 'assets/users/david.png',
      role: 'Senior Project Manager',
      badgeState: 'high-priority',
      badgeCount: 8
    },
    {
      value: 'pm2',
      label: 'Lisa Zhang',
      imageUrl: 'assets/users/lisa.png',
      role: 'Project Manager',
      badgeState: 'medium-priority',
      badgeCount: 4
    }
  ];

  developerOptions: TestSelectOption[] = [
    ...this.teamMemberOptions,
    {
      value: 'dev5',
      label: 'Riley Johnson',
      imageUrl: 'assets/users/riley.png',
      role: 'UI/UX Designer'
    },
    {
      value: 'dev6',
      label: 'Jordan Lee',
      imageUrl: 'assets/users/jordan.png',
      role: 'QA Engineer'
    }
  ];

  allFeaturesOptions: TestSelectOption[] = [
    {
      value: 'option1',
      label: 'Complete Feature Option',
      imageUrl: 'assets/users/complete.png',
      icon: 'star',
      iconColor: '#fbbf24',
      role: 'All features enabled',
      badgeState: 'high-priority',
      badgeCount: 9
    },
    {
      value: 'option2',
      label: 'Standard Option',
      imageUrl: 'assets/users/standard.png',
      icon: 'circle',
      iconColor: '#3b82f6',
      role: 'Standard configuration',
      badgeState: 'medium-priority',
      badgeCount: 5
    },
    {
      value: 'option3',
      label: 'Minimal Option',
      imageUrl: 'assets/users/minimal.png',
      icon: 'square',
      iconColor: '#6b7280',
      role: 'Minimal features',
      badgeState: 'low-priority',
      badgeCount: 1
    }
  ];

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      manager: ['', Validators.required],
      team: [[], Validators.minLength(1)],
      priority: ['', Validators.required]
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.projectForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors?.['minlength']) {
        return `Please select at least ${field.errors['minlength'].requiredLength} item(s)`;
      }
    }
    return '';
  }

  createProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    console.log('Creating project with:', this.projectForm.value);
    
    // Here you would typically send the data to your API
    // this.projectService.createProject(this.projectForm.value);
    
    alert('Project created successfully!');
    this.projectForm.reset();
  }
}

// Example of a service that could provide options data
export class UserService {
  getUsers(): TestSelectOption[] {
    return [
      {
        value: 1,
        label: 'John Doe',
        imageUrl: 'assets/users/john.png',
        role: 'Software Engineer',
        badgeState: 'high-priority',
        badgeCount: 3
      },
      // ... more users
    ];
  }

  getTeamMembers(): TestSelectOption[] {
    return [
      {
        value: 'team1',
        label: 'Frontend Team',
        imageUrl: 'assets/teams/frontend.png',
        role: '5 members'
      },
      // ... more teams
    ];
  }

  getStatuses(): TestSelectOption[] {
    return [
      {
        value: 'active',
        label: 'Active',
        icon: 'check-circle',
        iconColor: 'green'
      },
      // ... more statuses
    ];
  }
}

// Example of how to integrate with a parent component
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <app-user-management></app-user-management>
      
      <!-- Quick select examples -->
      <div class="quick-selects">
        <ava-test-select
          variant="small"
          label="Quick Filter"
          [options]="filterOptions"
          [(ngModel)]="currentFilter">
        </ava-test-select>
        
        <ava-test-select
          variant="extra-small"
          label="View"
          [options]="viewOptions"
          [(ngModel)]="currentView">
        </ava-test-select>
      </div>
    </div>
  `
})
export class DashboardComponent {
  currentFilter: string = '';
  currentView: string = '';

  filterOptions: TestSelectOption[] = [
    { value: 'all', label: 'All Items', icon: 'list' },
    { value: 'active', label: 'Active Only', icon: 'check-circle', iconColor: 'green' },
    { value: 'pending', label: 'Pending', icon: 'clock', iconColor: 'orange' }
  ];

  viewOptions: TestSelectOption[] = [
    { value: 'grid', label: 'Grid', icon: 'grid' },
    { value: 'list', label: 'List', icon: 'list' },
    { value: 'table', label: 'Table', icon: 'table' }
  ];
}