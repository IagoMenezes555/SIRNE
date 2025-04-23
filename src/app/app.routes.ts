import { Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FooterComponent,
    children: [
      {
        path: 'menu',
        loadComponent: () => import('./pages/menu/menu.page').then((m) => m.MenuPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'task',
        loadComponent: () => import('./pages/task/task.page').then((m) => m.TaskPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog.page').then((m) => m.BlogPage),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
