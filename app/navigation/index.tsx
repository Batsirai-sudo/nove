import React, {useEffect, useState} from 'react';
import {StatusBar, Linking, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {DarkModeProvider} from 'react-native-dark-mode';
import AuthStack from './AuthStack';
import {AuthProvider, CommonProvider} from '@context';
import FlashMessage from 'react-native-flash-message';
import {
  themeLight,
  themeDark,
  configLink,
  setupOnesignal,
  deepLinkConfig,
} from '@config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {DEEP_LINK as FIREBASE_DEEP_LINK} from '@env';
import {NetworkProvider} from 'react-native-offline';
import {MenuProvider} from 'react-native-popup-menu';

const NavContainer = () => {
  const [linking, setLinking] = useState({
    prefixes: [FIREBASE_DEEP_LINK],
    config: deepLinkConfig,
  });

  return (
    <DarkModeProvider>
      <NavigationContainer linking={linking} theme={themeLight}>
        <SafeAreaProvider>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <NetworkProvider>
            <AuthProvider>
              <CommonProvider>
                <MenuProvider>
                  <AuthStack />
                </MenuProvider>
              </CommonProvider>
            </AuthProvider>
          </NetworkProvider>
        </SafeAreaProvider>

        <FlashMessage position="top" />
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default NavContainer;

// const config = {
//   screens: {
//     AdminStack: {
//       initialRouteName: 'BottomTabStack',
//       screens: {
//         ThemeScreen: 'registration/:id',
//       },
//     },
//     Profile: 'user',
//     NotFound: '*',
//   },
// };
// useEffect(() => {
//   dynamicLinks()
//     .getInitialLink()
//     .then((link) => {
//       // dynamicLinks()
//       //   .resolveLink(link.url)
//       //   .then((response) => {
//       //     console.log(';response.url', response.url);
//       //   })
//       //   .catch((error) => {
//       //     console.log(error);
//       //   });
//       handleDynamicLink(link);
//     });
//   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
//   return () => unsubscribe();
// }, []);

// const handleDynamicLink = (link) => {
//   // console.log(
//   //   'Linking,',
//   //   Linking.addEventListener('url', (e) => {
//   //     console.log('called', e);
//   //   }),
//   // );
//   // // Linking.getInitialURL().then((d) => {
//   // //   console.log('initial', d);
//   // // });
//   // const config = {
//   //   screens: {
//   //     AdditionalInfor: 'registration/:id',
//   //   },
//   // };
//   // console.log(link);
//   // // const linking = {
//   // //   prefixes: ['https://mychat.com', 'mychat://'],
//   // //   config,
//   // // };
//   // setLinkings({
//   //   config,
//   // });
//   // // Handle dynamic link inside your own application
//   // // alert(link.url);
//   // // var splitUrl = link.url.split('/');
//   // console.log(configLink.getUrl(link));
//   // if (configLink.getUrl(link) === configLink.urlThirdIndex[0]) {
//   //   // ...navigate to your offers screen
//   //   // navigate(ROUTES.Walkthrough);
//   // }
// };
// console.log('linkingslinkingslinkings', linkings);
// const state = {
//   routes: [
//     {
//       name: 'Profile',
//       params: { id: 'user-wojciech', section: 'settings' },
//     },
//   ],
// };
// If you wanted to resolve /user/wojciech/settings to result in the params { id: 'user-wojciech' section: 'settings' }, you could make Profile's config to look like this:
// const config = {
//   screens: {
//     Profile: {
//       path: 'user/:id/:section',
//       parse: {
//         id: (id) => `user-${id}`,
//       },
//       stringify: {
//         id: (id) => id.replace(/^user-/, ''),
//       },
//     },
//   },
// };

//   Here, we have defined a route named NotFound and set it to match * aka everything. If the path didn't match user/:id or settings, it'll be matched by this route.

// So, a path like /library or /settings/notification will resolve to the following state object:

// const state = {
//   routes: [{ name: 'NotFound' }],
// };
// You can even go more specific, for example, say if you want to show a different screen for invalid paths under /settings, you can specify such a pattern under Settings:

// const config = {
//   screens: {
//     Home: {
//       initialRouteName: 'Feed',
//       screens: {
//         Profile: 'users/:id',
//         Settings: {
//           path: 'settings',
//           screens: {
//             InvalidSettings: '*',
//           },
//         },
//       },
//     },
//     NotFound: '*',
//   },
// };
// With this configuration, the path /settings/notification will resolve to the following state object:

// const state = {
//   routes: [
//     {
//       name: 'Home',
//       state: {
//         index: 1,
//         routes: [
//           { name: 'Feed' },
//           {
//             name: 'Settings',
//             state: {
//               routes: [{ name: 'InvalidSettings' }],
//             },
//           },
//         ],
//       },
//     },
//   ],
// };
// When doing server rendering, you'd also want to return correct status code for 404 errors. See server rendering docs for a guide on how to handle it.
// Rendering an initial route#
// Sometimes you want to ensure that a certain screen will always be present as the first screen in the navigator's state. You can use the initialRouteName property to specify the screen to use for the initial screen.

// In the above example, if you want the Feed screen to be the initial route in the navigator under Home, your config will look like this:

// const config = {
//   screens: {
//     Home: {
//       initialRouteName: 'Feed',
//       screens: {
//         Profile: 'users/:id',
//         Settings: 'settings',
//       },
//     },
//   },
// };
// const [linkings, setLinkings] = useState({});
// async function buildLink() {
//   const link = await dynamicLinks().buildLink({
//     link: 'https://invertase.io',
//     // domainUriPrefix is created in your Firebase console
//     domainUriPrefix: 'https://mlambo.page.link',
//     // optional set up which updates Firebase analytics campaign
//     // "banner". This also needs setting up before handhttps://mlambo.page.link/store-manage
//     analytics: {
//       campaign: 'banner',
//     },
//   });

//   return link;
// }
// buildLink();

// const config = {
//   screens: {
//     Walkthrough: {
//       path: 'id/:sponsorid',
//       parse: {
//         sponsorid: (sponsorid) => sponsorid,
//       },
//     },
//     SignIn: 'SignIn',
//   },
// };
// const config = {
//   screens: {
//     PolicySetup: 'registration/:id',
//   },
// };
// Marking params as optional#
// Sometimes a param may or may not be present in the URL depending on certain conditions. For example, in the above scenario, you may not always have the section parameter in the URL, i.e. both /user/wojciech/settings and /user/wojciech should go to the Profile screen, but the section param (with the value settings in this case) may or may not be present.

// In this case, you would need to mark the section param as optional. You can do it by adding the ? suffix after the param name:

// const config = {
//   screens: {
//     Profile: {
//       path: 'user/:id/:section?',
//       parse: {
//         id: (id) => `user-${id}`,
//       },
//       stringify: {
//         id: (id) => id.replace(/^user-/, ''),
//       },
//     },
//   },
// };

// Handling nested navigators#
// Sometimes you'll have the target navigator nested in other navigators which aren't part of the deep link. For example, let's say your navigation structure looks like this:

// function Home() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Profile" component={Profile} />
//       <Tab.Screen name="Feed" component={Feed} />
//     </Tab.Navigator>
//   );
// }

// function App() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Settings" component={Settings} />
//     </Stack.Navigator>
//   );
// }
// Here you have a stack navigator in the root, and inside the Home screen of the root stack, you have a tab navigator with various screens. With this structure, let's say you want the path /users/:id to go to the Profile screen. You can express the nested config like so:

// const config = {
//   screens: {
//     Home: {
//       screens: {
//         Profile: 'users/:id',
//       },
//     },
//   },
// };
// In this config, you specify that the Profile screen should be resolved for the users/:id pattern and it's nested inside the Home screen. Then parsing users/jane will result in the following state object:

// const state = {
//   routes: [
//     {
//       name: 'Home',
//       state: {
//         routes: [
//           {
//             name: 'Profile',
//             params: { id: 'jane' },
//           },
//         ],
//       },
//     },
//   ],
// };
// It's important to note that the state object must match the hierarchy of nested navigators. Otherwise the state will be discarded

//   Handling unmatched routes or 404#
// If your app is opened with an invalid URL, most of the times you'd want to show an error page with some information. On the web, this is commonly known as 404 - or page not found error.

// To handle this, you'll need to define a catch-all route that will be rendered if no other routes match the path. You can do it by specifying * for the path matching pattern.

// For example:

// const config = {
//   screens: {
//     Home: {
//       initialRouteName: 'Feed',
//       screens: {
//         Profile: 'users/:id',
//         Settings: 'settings',
//       },
//     },
//     NotFound: '*',
//   },
// };
// const config = {
//   screens: {
//     Home: {
//       initialRouteName: 'Feed',
//       screens: {
//         Profile: 'users/:id',
//         Settings: 'settings',
//       },
//     },
//     NotFound: '*',
//   },
// };
// const themeData = state.theme === 'dark' ? themeDark : themeLight;

// if (loading) {
//   return (
//     <View style={[styles.container, styles.horizontal]}>
//       <ActivityIndicator />
//     </View>
//   );
// }

// return (
//   <NavigationContainer theme={themeData}>
// console.log(themeLight);

// Matching exact paths#
// By default, paths defined for each screen are matched against the URL relative to their parent screen's path. Consider the following config:

// const config = {
//   screens: {
//     Home: {
//       path: 'feed',
//       screens: {
//         Profile: 'users/:id',
//       },
//     },
//   },
// };
// Here, you have a path property defined for the Home screen, as well as the child Profile screen. The profile screen specifies the path users/:id, but since it's nested inside a screen with the path feed, it'll try to match the pattern feed/users/:id.

// This will result in the URL /feed navigating to Home screen, and /feed/users/cal navigating to the Profile screen.

// In this case, it makes more sense to navigate to the Profile screen using a URL like /users/cal, rather than /feed/users/cal. To achieve this, you can override the relative matching behavior to exact matching:

// Here, you have a path property defined for the Home screen, as well as the child Profile screen. The profile screen specifies the path users/:id, but since it's nested inside a screen with the path feed, it'll try to match the pattern feed/users/:id.

// This will result in the URL /feed navigating to Home screen, and /feed/users/cal navigating to the Profile screen.

// In this case, it makes more sense to navigate to the Profile screen using a URL like /users/cal, rather than /feed/users/cal. To achieve this, you can override the relative matching behavior to exact matching:

// const config = {
//   screens: {
//     Home: {
//       path: 'feed',
//       screens: {
//         Profile: {
//           path: 'users/:id',
//           exact: true,
//         },
//       },
//     },
//   },
// };
// With exact property set to true, Profile will ignore the parent screen's path config and you'll be able to navigate to Profile using a URL like users/cal.

// Omitting a screen from path#
// Sometimes, you may not want to have the route name of a screen in the path. For example, let's say you have a Home screen and our navigation state looks like this:

// const state = {
//   routes: [{ name: 'Home' }],
// };
// When this state is serialized to a path with the following config, you'll get /home:

// const config = {
//   screens: {
//     Home: {
//       path: 'home',
//       screens: {
//         Profile: 'users/:id',
//       },
//     },
//   },
// };
// But it'll be nicer if the URL was just / when visiting the home screen. You can specify an empty string as path or not specify a path at all, and React Navigation won't add the screen to the path (think of it like adding empty string to the path, which doesn't change anything):

// const config = {
//   screens: {
//     Home: {
//       path: '',
//       screens: {
//         Profile: 'users/:id',
//       },
//     },
//   },
// };

// Serializing and parsing params#
// Since URLs are strings, any params you have for routes are also converted to strings when constructing the path.

// For example, say you have a state like following:

// const state = {
//   routes: [
//     {
//       name: 'Chat',
//       params: { at: 1589842744264 },
//     },
//   ];
// }
// It'll be converted to chat/1589842744264 with the following config:

// const config = {
//   screens: {
//     Chat: 'chat/:date',
//   },
// };
// When parsing this path, you'll get the following state:

// const state = {
//   routes: [
//     {
//       name: 'Chat',
//       params: { date: '1589842744264' },
//     },
//   ];
// }
// Here, the date param was parsed as a string because React Navigation doesn't know that it's supposed to be a timestamp, and hence number. You can customize it by providing a custom function to use for parsing:

// const config = {
//   screens: {
//     Chat: {
//       path: 'chat/:date',
//       parse: {
//         date: Number,
//       },
//     },
//   },
// };
// You can also provide a custom function to serialize the params. For example, let's say that you want to use a DD-MM-YYYY format in the path instead of a timestamp:

// const config = {
//   screens: {
//     Chat: {
//       path: 'chat/:date',
//       parse: {
//         date: (date) => new Date(date).getTime(),
//       },
//       stringify: {
//         date: (date) => {
//           const d = new Date(date);

//           return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
//         },
//       },
//     },
//   },
// };
// Depending on your requirements, you can use this functionality to parse and stringify more complex data.

// /user/@vergil/edit

// {
//   screens: {
//     Home: {
//       initialRouteName: 'Feed',
//       screens: {
//         Profile: {
//           path: 'user/:id',
//           parse: {
//             id: id => id.replace(/^@/, ''),
//           },
//           screens: {
//             Settings: 'edit',
//           },
//         },
//       },
//     },
//     NoMatch: '*',
//   }
// }

// Home
// Feed
// Profile
// id	:	"vergil"
// Settings

// await auth()
//                       .signInWithCredential(googleCredential)
//                       .then(async (response) => {
//                         const userData = {
//                           idToken: userObj.idToken,
//                           email: userObj.user.email,
//                           familyName: userObj.user.familyName,
//                           givenName: userObj.user.givenName,
//                           socialProviderId: userObj.user.id,
//                           fullName: userObj.user.name,
//                           photoURL: userObj.user.photo,
//                           providerId: response.additionalUserInfo.providerId,
//                           uid: response.user.uid,
//                           account: accountType,
//                           googleCredential,
//                         };
//                         await auth().signOut();

//                         const isInformationAvailable = await checkUserDetailInFirestore(
//                           response.user.uid,
//                           accountType,
//                         );

//                         // if (isInformationAvailable) {
//                         //   resolve(registrationRequest.USER_CAN_LOGIN_INSTEAD);
//                         // } else {
//                         //   getUserObject(userData);
//                         //   resolve(registrationRequest.USER_CAN_REGISTER);
//                         // }
//                       });
