import OneSignal from 'react-native-onesignal';
import { Alert } from 'react-native'

const { log } = console

export default async () => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('da975c18-9671-492c-b195-5077afb436c4');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
        log('Prompt response:', response);
    });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
        (notifReceivedEvent) => {
            log(
                'OneSignal: notification will show in foreground:',
                notifReceivedEvent,
            );
            let notif = notifReceivedEvent.getNotification();

            const button1 = {
                text: 'Cancel',
                onPress: () => {
                    notifReceivedEvent.complete();
                },
                style: 'cancel',
            };

            const button2 = {
                text: 'Complete',
                onPress: () => {
                    notifReceivedEvent.complete(notif);
                },
            };

            Alert.alert('Complete notification?', 'Test', [button1, button2], {
                cancelable: true,
            });
        },
    );
    OneSignal.setNotificationOpenedHandler((notification) => {
        log('OneSignal: notification opened:', notification);
    });
    OneSignal.setInAppMessageClickHandler((event) => {
        log('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
        log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver((event) => {
        log('OneSignal: subscription changed:', event);
        // this.setState({ isSubscribed: event.to.isSubscribed})
    });
    OneSignal.addPermissionObserver((event) => {
        log('OneSignal: permission changed:', event);
    });

    const deviceState = await OneSignal.getDeviceState();

    // this.setState({
    //     isSubscribed : deviceState.isSubscribed
    // });
};