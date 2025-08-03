import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { RoadmapViewerComponent } from './components/roadmap-viewer/roadmap-viewer.component';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { TaskReminderService } from './services/task-reminder.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <!-- Star Animation Background -->
    <div class="star-background">
      <div class="star" *ngFor="let star of stars; let i = index" [style.animation-delay.s]="star.delay" [style.animation-duration.s]="star.duration" [style.top.px]="star.top" [style.right.px]="star.right"></div>
    </div>
    
    <router-outlet></router-outlet>
  `,
})
export class App {
  stars = [
    { delay: 0, duration: 1, top: 0, right: 0 },
    { delay: 0.2, duration: 3, top: 0, right: 80 },
    { delay: 0.4, duration: 2, top: 80, right: 0 },
    { delay: 0.6, duration: 1.5, top: 0, right: 180 },
    { delay: 0.8, duration: 2.5, top: 0, right: 400 },
    { delay: 1, duration: 3, top: 0, right: 600 },
    { delay: 1.2, duration: 1.75, top: 300, right: 0 },
    { delay: 1.4, duration: 1.25, top: 0, right: 700 },
    { delay: 0.75, duration: 2.25, top: 0, right: 1000 },
    { delay: 2.75, duration: 2.75, top: 0, right: 450 },
    { delay: 1.8, duration: 2.1, top: 150, right: 200 },
    { delay: 2.2, duration: 1.8, top: 50, right: 800 },
    { delay: 0.3, duration: 2.8, top: 250, right: 300 },
    { delay: 1.6, duration: 1.3, top: 100, right: 900 },
    { delay: 2.4, duration: 2.6, top: 200, right: 100 },
    { delay: 3, duration: 2.2, top: 400, right: 500 },
    { delay: 1.1, duration: 2.9, top: 50, right: 1200 },
    { delay: 2.1, duration: 1.6, top: 350, right: 150 },
    { delay: 0.9, duration: 2.4, top: 120, right: 750 },
    { delay: 1.7, duration: 1.9, top: 280, right: 350 }
  ];

  constructor(private taskReminderService: TaskReminderService) {
    // Initialize task reminder service
    this.taskReminderService.requestNotificationPermission();
    
    // Start reminder service after a short delay to ensure proper initialization
    setTimeout(() => {
      this.taskReminderService.startReminderService();
    }, 1000);
  }
}

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' as const },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'edit-task/:id', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: 'roadmap/:id', component: RoadmapViewerComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/auth' }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, httpErrorInterceptor])),
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));