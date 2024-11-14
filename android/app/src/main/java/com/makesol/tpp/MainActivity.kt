package com.makesol.tpp
import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen 

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  // Override
  //  protected void onCreate(Bundle savedInstanceState) {
  //       SplashScreen.show(this);  // here
  //       super.onCreate(savedInstanceState);
  //   }
    override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this); // here
    super.onCreate(null);
    //super.onCreate(savedInstanceState);
  }
  override fun getMainComponentName(): String = "Trasnportportalen"

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */

   override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  // @Override
  // protected ReactActivityDelegate createReactActivityDelegate() {
  //   return new DefaultReactActivityDelegate(
  //       this,
  //       getMainComponentName(),
  //       // If you opted-in for the New Architecture, we enable the Fabric Renderer.
  //       DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
  //       // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
  //       DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
  //       );
  // }
}
