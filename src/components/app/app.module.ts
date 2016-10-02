import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import {
    SchemaFormModule,
    WidgetRegistry,
    DefaultWidgetRegistry } from 'angular2-schema-form';
import { HttpModule } from '@angular/http';

import { routing,
         appRoutingProviders } from './app.routes.ts';

// Components
import { AppWrapper } from './appwrapper.component';
import { App } from './app.component';
import { Header } from '../header/header.component';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs.component';
import { Toolbar } from '../toolbar/toolbar.component';
import { Footer } from '../footer/footer.component';
import { Navigation } from '../navigation/navigation.component';
import TitleTile from '../title-tile/title-tile.component';
import { ViewChooser } from '../views/chooser.component';
import { View } from '../views/base/base.component';
import { Edit } from '../views/edit/edit.component';
import { Add } from '../views/add/add.component';
import { Login } from '../views/login/login.component';
import { Logout } from '../views/logout/logout.component';
import { Logo } from '../logo/logo.component';
import { Search } from '../search/search.component';

// Services
import { AppState } from '../../services/app.service';
import { AuthUtils } from '../../injectors/authUtils';
import { ConfigurationService } from '../../services/configuration.service';
import { ObjectService } from '../../services/object.service';
import { ObjectUtility } from '../../injectors/object';
import { LoginService } from '../../services/login.service';
import { SearchService } from '../../services/search.service';

@NgModule({
    declarations: [
        AppWrapper,
        App,
        Header,
        Breadcrumbs,
        Toolbar,
        Footer,
        Navigation,
        TitleTile,
        ViewChooser,
        View,
        Edit,
        Add,
        Login,
        Logout,
        Logo,
        Search
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        HttpModule,
        SchemaFormModule,
        routing
    ],
    entryComponents: [
        View,
        Edit,
        Add,
        Login,
        Logout
    ],
    providers: [
        AppState,
        appRoutingProviders,
        AuthUtils,
        ConfigurationService,
        ObjectService,
        ObjectUtility,
        LoginService,
        SearchService,
        {provide: WidgetRegistry, useClass: DefaultWidgetRegistry}
    ],
    bootstrap: [AppWrapper],
})
export class AppModule {}