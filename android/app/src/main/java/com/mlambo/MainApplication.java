package com.mlambo;

import cl.json.ShareApplication;
import cl.json.RNSharePackage;
import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
// import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.microsoft.codepush.react.CodePush;
import com.rnfs.RNFSPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.rn.full.screen.FullScreenModule; // add this import 
// import com.facebook.react.shell.MainReactPackage;
// import com.surajit.rnrg.RNRadialGradientPackage;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          // packages.add( new MainReactPackage(),
            // new RNFetchBlobPackage(),
          //  packages.add(new RNHTMLtoPDFPackage());
            // new PDFLibPackage(),
            // packages.add( new RNFSPackage());
          //  packages.add( new ImagePickerPackage());
          //  packages.add(  new VectorIconsPackage());
          // packages.add(  new RNRadialGradientPackage());
          //  packages.add( new SplashScreenReactPackage() );
           packages.add( new LinearGradientPackage());
            packages.add( new BlurViewPackage()); 
            // packages.add(new RNSharePackage()); 
          // packages.add( new FullScreenModule()); 
          return packages;
        }

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }


      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }


     @Override
     public String getFileProviderAuthority() {
            return BuildConfig.APPLICATION_ID + ".provider";
     }


  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        // MultiDex.install(this);

  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.mlambo.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
