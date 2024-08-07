import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NewPasswordPageComponent } from './pages/new-password-page/new-password-page.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CitySearchPageComponent } from './pages/city-search-page/city-search-page.component';
import { MonumentSearchPageComponent } from './pages/monument-search-page/monument-search-page.component';
import { PoiPageComponent } from './pages/poi-page/poi-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { QuizzPageComponent } from './pages/quizz-page/quizz-page.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';
import { MeetPageComponent } from './pages/meet-page/meet-page.component';
import { BackofficePageComponent } from './pages/backoffice-page/backoffice-page.component';
import { PoisBackofficePageComponent } from './pages/pois-backoffice-page/pois-backoffice-page.component';
import { CommentsBackofficePageComponent } from './pages/comments-backoffice-page/comments-backoffice-page.component';
import { PostsBackofficePageComponent } from './pages/posts-backoffice-page/posts-backoffice-page.component';
import { PoisAccountsBackofficePageComponent } from './pages/pois-accounts-backoffice-page/pois-accounts-backoffice-page.component';
import { ConversationUserComponent } from './container/conversations/conversation-user/conversation-user.component';
import { ConversationMeetComponent } from './container/conversations/conversation-meet/conversation-meet.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    },
    {
        path: 'forgotPassword',
        component: ResetPasswordComponent,
    },
    {
        path: 'resetPassword',
        component: NewPasswordPageComponent,
    },
    {
        path: 'search',
        component: SearchPageComponent,
    },
    {
        path: 'search-city',
        component: CitySearchPageComponent,
    },
    {
        path: 'search-city/:searchTerm',
        component: MonumentSearchPageComponent,
    },
    {
        path: 'poi/:id',
        component: PoiPageComponent,
    },
    {
        path: 'quiz',
        component: QuizzPageComponent,
    },
    {
        path: 'quiz/:id',
        component: QuizzPageComponent,
    },
    {
        path: 'post/:id',
        component: PostPageComponent,
    },
    {
        path: 'ranking',
        component: RankingPageComponent,
    },
    {
        path: 'profil',
        component: ProfilPageComponent,
    },
    {
        path: 'shop',
        component: ShopPageComponent,
    },
    {
        path: 'basket',
        component: BasketPageComponent,
    },
    {
        path: 'conversations/:id',
        component: ConversationUserComponent,
    },
    {
        path: 'meets/conversations/:id',
        component: ConversationMeetComponent,
    },
    {
        path: 'meets/:id',
        component: MeetPageComponent,
    },
    {
        path: 'user/:id',
        component: UserPageComponent,
    },
    {
        path: 'feed',
        component: FeedPageComponent,
    },
    {
        path: 'backoffice/users',
        component: BackofficePageComponent,
    },
    {
        path: 'backoffice/pois-accounts',
        component: PoisAccountsBackofficePageComponent,
    },
    {
        path: 'backoffice/pois',
        component: PoisBackofficePageComponent,
    },
    {
        path: 'backoffice/comments',
        component: CommentsBackofficePageComponent,
    },
    {
        path: 'backoffice/posts',
        component: PostsBackofficePageComponent,
    },
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'auth',
    },
];
