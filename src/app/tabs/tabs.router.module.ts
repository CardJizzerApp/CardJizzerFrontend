import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'all-games',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../all-games/all-games.module').then(m => m.AllGamesPageModule)
          }
        ]
      },
      {
        path: 'current-game',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../current-game/current-game.module').then(m => m.CurrentGamePageModule)
          }
        ]
      },
      {
        path: 'your-decks',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../your-decks/your-decks.module').then(m => m.YourDecksPageModule)
          }
        ]
      },
      {
        path: 'create-game',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../create-game/create-game.module').then(m => m.CreateGamePageModule)
          }
        ]
      },
      {
        path: 'create-deck',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../create-deck/create-deck.module').then(m => m.CreateDeckPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/all-games',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/all-games',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
