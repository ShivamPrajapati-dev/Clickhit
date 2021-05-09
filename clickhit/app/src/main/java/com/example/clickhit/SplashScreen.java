package com.example.clickhit;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.example.clickhit.Auth.SignUp;
import com.example.clickhit.Model.Me;
import com.example.clickhit.Network.RetrofitInitialize;
import com.example.clickhit.Network.RetrofitInitializeAuth;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SplashScreen extends AppCompatActivity {

    private LottieAnimationView animation;
    private HashMap<String, String> body;
    private static final String TAG = "SplashScreen";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        animation = findViewById(R.id.anim);
        body = new HashMap<>();
        //Reading token secret
        body.put("secret",Prefs.getTokenSecret(this));
        Call<Object> call = RetrofitInitializeAuth.getInstance(Prefs.getToken(this)).getUser(body);

        call.enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {
                Intent intent;
                if(!response.isSuccessful()){
                    intent = new Intent(SplashScreen.this, SignUp.class);
                }else{
                    intent = new Intent(SplashScreen.this, MainActivity.class);
                }
                startActivity(intent);
                finish();
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                Toast.makeText(SplashScreen.this,t.getMessage(),Toast.LENGTH_LONG).show();
            }
        });

    }
}