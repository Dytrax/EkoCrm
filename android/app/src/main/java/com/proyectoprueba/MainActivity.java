package com.proyectoprueba;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import android.content.Intent;
import android.os.Bundle;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //SplashScreen.show(this);  // here
        //setContentView(R.layout.layout_screen);
}
    @Override
    protected String getMainComponentName() {

        return "proyectoPrueba";
    }
}
