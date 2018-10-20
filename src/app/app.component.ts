import { Component } from '@angular/core'
import { TransportAdapterWebsocketService } from './common/service/transport-adapter/transport-adapter-websocket.service'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'EventualityPOCWeb'

  // Constructor
  constructor(private transportAdapterWebsocketService: TransportAdapterWebsocketService) {}
}
