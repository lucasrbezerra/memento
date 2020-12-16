import PushNotification from 'react-native-push-notification';

const showNotificationRoutine = (id, title, message, date) => {
  console.log('routine inserted:', id, date);

  PushNotification.localNotificationSchedule({
    id: `${id}`,
    title: title,
    message: message,
    date: date,
    vibrate: true,
    vibration: 3500,
    color: '#543846',
    repeatType: 'week',
  });
};

const showNotificationDate = (id, title, message, date) => {
  console.log('schudeled inserted:', id, date);
  PushNotification.localNotificationSchedule({
    id: `${id}`,
    title: title,
    message: message,
    date: date,
    vibrate: true,
    vibration: 3500,
    color: '#543846'
  });
};

const handleCancel = (id) => {
  PushNotification.cancelLocalNotifications({ id: `${id}` });
  console.log('Notificação de id:', id, 'cancelada!');
};

const handleCancelAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
  console.log('Todas as notificações locais foram canceladas!');
};

export {
  showNotificationRoutine,
  showNotificationDate,
  handleCancel,
  handleCancelAllNotification,
};
