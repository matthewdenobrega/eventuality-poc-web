import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { ChannelDecision, ChannelPerception } from './common/service/channel/channel.service'
import { TransportAdapterWebsocketService } from './common/service/transport-adapter/transport-adapter-websocket.service'
import { UpdateProfileComponent } from './person-profile-context/update-profile/update-profile.component'

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, UpdateProfileComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [
    ChannelDecision, ChannelPerception,
    TransportAdapterWebsocketService
  ]
})
export class AppModule { }
