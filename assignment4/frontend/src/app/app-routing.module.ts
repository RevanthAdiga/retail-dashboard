import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { SalesAnalysisComponent } from "./sales-analysis/sales-analysis.component";

const appRoutes: Routes = [
    {
        path: 'home',
        component: SalesAnalysisComponent,
        canActivate: [AuthGuard]
    },
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }