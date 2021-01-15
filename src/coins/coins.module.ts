import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class CoinsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;
    wsClients=[];

    constructor() {
        setInterval( ()=>{
            this.broadcast('chat',{
                coins: [
                    {name: "Bitcoin",symbol: "BTC",value: "40000",unit: "$"},
                    {name: "Etherum",symbol: "ETH",value: "1200",unit: "$"},
                    {name: "Bitcoin Satushi Vision",symbol: "BSV",value: "189",unit: "$"},
                    {name: "Tron",symbol: "TRX",value: "0.03232",unit: "$"}
                ]
            });
        },1000);
    }

    handleConnection(client: any) {
        this.wsClients.push(client);
    }

    handleDisconnect(client) {
        for (let i = 0; i < this.wsClients.length; i++) {
          if (this.wsClients[i] === client) {
            this.wsClients.splice(i, 1);
            break;
          }
        }
        this.broadcast('disconnect',{});
      }

      private broadcast(event, message: any) {
        const broadCastMessage = JSON.stringify(message);
        for (let c of this.wsClients) {
          c.send(event, broadCastMessage);
        }
      }

    //   @SubscribeMessage('chat')
    //   onChgEvent(client: any, payload: any) {
        
    //   }

}