package io.aidameta.wallet;

import com.facebook.react.ReactActivity;
import com.proyecto26.inappbrowser.RNInAppBrowserModule;

import io.branch.rnbranch.RNBranchModule;
import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "HomeOfAida";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBranchModule.enableLogging();
    RNBranchModule.getAutoInstance(this);
  }

  	// Override onStart, onNewIntent:
	@Override
	protected void onStart() {
		super.onStart();
    try {
      Intent intent = getIntent();
      RNBranchModule.initSession(intent.getData(), this);
      NativeIntent.SetIntentData(intent.getStringExtra("msg"), this);
      RNInAppBrowserModule.onStart(this);
    }
    catch (Exception e) {
      // Log.v("MainActivity", "Exception => " + e.getMessage());
    }
		finally  {
      
    }
	}

	@Override
	public void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
    setIntent(intent);
		// if (intent != null &&
		// 	intent.hasExtra("branch_force_new_session") && 
		// 	intent.getBooleanExtra("branch_force_new_session",false)) {
		// 		RNBranchModule.onNewIntent(intent);
		// }
	}
}
