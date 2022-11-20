
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @ramp-network/react-native-sdk
import com.reactnativerampsdk.RampSdkPackage;
// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/cameraroll
import com.reactnativecommunity.cameraroll.CameraRollPackage;
// @react-native-community/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @yidun/captcha-plugin-rn
import com.netease.captcha.RNCaptchaPackage;
// appcenter
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
// appcenter-analytics
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
// appcenter-crashes
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-aes-crypto
import com.tectiv3.aes.RCTAesPackage;
// react-native-branch
import io.branch.rnbranch.RNBranchPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-file-selector
import ui.fileselector.RNFileSelectorPackage;
// react-native-fingerprint-scanner
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-get-random-values
import org.linusu.RNGetRandomValuesPackage;
// react-native-i18n
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-inappbrowser-reborn
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-os
import com.peel.react.rnos.RNOSModule;
// react-native-randombytes
import com.bitgo.randombytes.RandomBytesPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-restart
import com.reactnativerestart.RestartPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-view-shot
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

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
      new RampSdkPackage(),
      new AsyncStoragePackage(),
      new CameraRollPackage(),
      new ClipboardPackage(),
      new RNCaptchaPackage(),
      new AppCenterReactNativePackage(getApplication()),
      new AppCenterReactNativeAnalyticsPackage(getApplication(), getResources().getString(io.aidameta.wallet.R.string.appCenterAnalytics_whenToEnableAnalytics)),
      new AppCenterReactNativeCrashesPackage(getApplication(), getResources().getString(io.aidameta.wallet.R.string.appCenterCrashes_whenToSendCrashes)),
      new LottiePackage(),
      new RCTAesPackage(),
      new RNBranchPackage(),
      new RNCameraPackage(),
      new RNDeviceInfo(),
      new RNFileSelectorPackage(),
      new ReactNativeFingerprintScannerPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new RNI18nPackage(),
      new PickerPackage(),
      new RNInAppBrowserPackage(),
      new LinearGradientPackage(),
      new RNOSModule(),
      new RandomBytesPackage(),
      new ReanimatedPackage(),
      new RestartPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new RNViewShotPackage(),
      new RNCWebViewPackage()
    ));
  }
}
