package com.example.foodypie;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.ActivityOptions;
import android.content.Intent;
import android.graphics.Typeface;
import android.os.Bundle;
import android.util.Pair;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.airbnb.lottie.LottieAnimationView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final LottieAnimationView view = findViewById(R.id.animationView);
        Typeface typeface = Typeface.createFromAsset(getAssets(),"Rubik-Light.ttf");
        Typeface typeface1 = Typeface.createFromAsset(getAssets(),"Rubik-Regular.ttf");

        final TextView textView = findViewById(R.id.text1);
        TextView textView1 = findViewById(R.id.text2);
        textView.setTypeface(typeface1);
        textView1.setTypeface(typeface);

        final Button button = findViewById(R.id.login);
        button.setTypeface(typeface1);

        findViewById(R.id.login).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 ActivityOptions options = ActivityOptions.makeSceneTransitionAnimation(MainActivity.this,Pair.create((View)textView,getString(R.string.account_transition)),Pair.create((View)view,getString(R.string.login_transition)),Pair.create((View)button,getString(R.string.button_transition)));

                Intent intent = new Intent(MainActivity.this,OtpActivity.class) ;
                startActivity(intent,options.toBundle());
            }
        });
    }
}
