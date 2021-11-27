
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-community/art
import com.reactnativecommunity.art.ARTPackage;
// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/blur
import com.cmcewen.blurview.BlurViewPackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/google-signin
import co.apptailor.googlesignin.RNGoogleSigninPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/progress-bar-android
import com.reactnativecommunity.androidprogressbar.RNCProgressBarPackage;
// @react-native-community/progress-view
import com.reactnativecommunity.progressview.RNCProgressViewPackage;
// @react-native-firebase/analytics
import io.invertase.firebase.analytics.ReactNativeFirebaseAnalyticsPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @react-native-firebase/dynamic-links
import io.invertase.firebase.dynamiclinks.ReactNativeFirebaseDynamicLinksPackage;
// @react-native-firebase/firestore
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
// @react-native-firebase/storage
import io.invertase.firebase.storage.ReactNativeFirebaseStoragePackage;
// appcenter
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
// appcenter-analytics
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
// appcenter-crashes
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-a-beep
import com.trietho.RNReactNativeABeepPackage;
// react-native-androw
import se.folof.androw.RNAndrowPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-cardview
import com.kishanjvaghela.cardview.RNCardViewPackage;
// react-native-charts-wrapper
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
// react-native-code-push
import com.microsoft.codepush.react.CodePush;
// react-native-collapsing-toolbar
import com.rncollapsingtoolbar.RNCollapsingToolbarPackage;
// react-native-config
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
// react-native-dark-mode
import com.codemotionapps.reactnativedarkmode.DarkModePackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-fbsdk
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-full-screen
import com.rn.full.screen.FullScreenModule;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-haptic-feedback
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
// react-native-html-to-pdf
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-image-resizer
import fr.bamlab.rnimageresizer.ImageResizerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-onesignal
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-pdf
import org.wonday.pdf.RCTPdfView;
// react-native-print
import com.christopherdro.RNPrint.RNPrintPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-spinkit
import com.react.rnspinkit.RNSpinkitPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-tone-android
import com.ToneAndroidPackage.ToneAndroidPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-version-check
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// realm
import io.realm.react.RealmReactPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ARTPackage(),
      new AsyncStoragePackage(),
      new BlurViewPackage(),
      new RNDateTimePickerPackage(),
      new RNGoogleSigninPackage(),
      new RNCMaskedViewPackage(),
      new NetInfoPackage(),
      new RNCProgressBarPackage(),
      new RNCProgressViewPackage(),
      new ReactNativeFirebaseAnalyticsPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new ReactNativeFirebaseDynamicLinksPackage(),
      new ReactNativeFirebaseFirestorePackage(),
      new ReactNativeFirebaseStoragePackage(),
      new AppCenterReactNativePackage(getApplication()),
      new AppCenterReactNativeAnalyticsPackage(getApplication(), getResources().getString(com.mlambo.R.string.appCenterAnalytics_whenToEnableAnalytics)),
      new AppCenterReactNativeCrashesPackage(getApplication(), getResources().getString(com.mlambo.R.string.appCenterCrashes_whenToSendCrashes)),
      new LottiePackage(),
      new RNReactNativeABeepPackage(),
      new RNAndrowPackage(),
      new RNCameraPackage(),
      new RNCardViewPackage(),
      new MPAndroidChartPackage(),
      new CodePush(getResources().getString(com.mlambo.R.string.CodePushDeploymentKey), getApplicationContext(), com.mlambo.BuildConfig.DEBUG),
      new RNCollapsingToolbarPackage(),
      new ReactNativeConfigPackage(),
      new DarkModePackage(),
      new FastImageViewPackage(),
      new FBSDKPackage(),
      new RNFSPackage(),
      new FullScreenModule(),
      new RNGestureHandlerPackage(),
      new RNReactNativeHapticFeedbackPackage(),
      new RNHTMLtoPDFPackage(),
      new ImagePickerPackage(),
      new ImageResizerPackage(),
      new LinearGradientPackage(),
      new ReactNativeOneSignalPackage(),
      new PagerViewPackage(),
      new RCTPdfView(),
      new RNPrintPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new RNSpinkitPackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new ToneAndroidPackage(),
      new VectorIconsPackage(),
      new RNVersionCheckPackage(),
      new RNCWebViewPackage(),
      new RealmReactPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
