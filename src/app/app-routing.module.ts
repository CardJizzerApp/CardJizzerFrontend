import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./tabs/tabs.module').then((m) => m.TabsPageModule);
    }
  },
  { path: 'all-games', loadChildren: './all-games/all-games.module#AllGamesPageModule' },
  { path: 'current-game', loadChildren: './current-game/current-game.module#CurrentGamePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'your-decks', loadChildren: './your-decks/your-decks.module#YourDecksPageModule' },
  { path: 'create-game', loadChildren: './create-game/create-game.module#CreateGamePageModule' },
  { path: 'create-deck', loadChildren: './create-deck/create-deck.module#CreateDeckPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
