package io.aidameta.wallet;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;

import io.aidameta.wallet.MainActivity;

class NativeIntent extends ReactContextBaseJavaModule {
    public NativeIntent(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public static String _IntentData = "";
    public static MainActivity _MainActivity;

    public static void SetIntentData(String data, MainActivity activity) {
        _IntentData = data;
        _MainActivity = activity;
    }

    @Override
    public String getName() {
        return "NativeIntent";
    }

    @ReactMethod
    public void GetIntent(Promise promise) {
        promise.resolve(_IntentData);
    }

    @ReactMethod
    public void ResetIntent(String data) {
        _IntentData = data;
    }

    @ReactMethod
    public void SetIntentResult(String returnData) {
        Intent intent = new Intent();
        Bundle bundle = new Bundle();
        bundle.putString("result", returnData);
        intent.putExtras(bundle);
        _MainActivity.setResult(Activity.RESULT_OK, intent);
        _MainActivity.finish();
    }
}