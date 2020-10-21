package com.example.clickhit;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.example.clickhit.Auth.SignUp;
import com.example.clickhit.Model.Me;
import com.example.clickhit.Network.RetrofitInitialize;
import com.example.clickhit.Network.RetrofitInitializeAuth;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SplashScreen extends AppCompatActivity {

    private LottieAnimationView animation;
    RetrofitInitializeAuth initialize;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        animation = findViewById(R.id.anim);
        initialize = new RetrofitInitializeAuth();
        Call<Me> call = initialize.init(Prefs.getToken(this)).getProfile();

        call.enqueue(new Callback<Me>() {
            @Override
            public void onResponse(Call<Me> call, Response<Me> response) {
                if(!response.isSuccessful()){
                    Intent intent = new Intent(SplashScreen.this,SignUp.class);
                    startActivity(intent);
                    finish();
                }else{
                    Intent intent = new Intent(SplashScreen.this,MainActivity.class);
                    startActivity(intent);
                    finish();
                }
            }

            @Override
            public void onFailure(Call<Me> call, Throwable t) {
                Toast.makeText(SplashScreen.this,t.getMessage(),Toast.LENGTH_LONG).show();
            }
        });

    }
}