import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
const { PushNotifications, Modals } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private router: Router) { }

  public initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {

    PushNotifications.requestPermission().then((permission) => {
      if(permission.granted){
        PushNotifications.register();
      }else{}
    });    

    //En caso de éxito, deberíamos poder recibir notificaciones
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        //alert('Push registration success, token: ' + token.value);
        console.log('Push success, token: ' + token.value)
      });

    //En caso de error, muestra el error
    PushNotifications.addListener('registrationError',
      (error: any) => {
        //alert('Push registration success, token: ' + JSON.stringify(error));
        console.log('Push registration success, token: ' + JSON.stringify(error))
      }
    );

    // Muéstranos la notificacion si la aplicación está abierta en nuestro dispositivo
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        const data = notification.data;
        alert(data.message)
        console.log('Push received: ' + JSON.stringify(notification.data));
      }
    );

    // Se llama al tocar la notificacion
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Push action performed: ' + JSON.stringify(notification));
        if (data.message) {
          alert(data.message);
        }
      }
    );  
  }
}
