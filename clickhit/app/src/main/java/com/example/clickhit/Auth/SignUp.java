package com.example.clickhit.Auth;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatTextView;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;

import com.example.clickhit.R;
import com.google.android.material.textfield.TextInputEditText;

public class SignUp extends AppCompatActivity {

    private AppCompatTextView button;
    private Button next;
    private TextInputEditText username,password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
         button = findViewById(R.id.login);
         next = findViewById(R.id.next);
         username = findViewById(R.id.username);
         password = findViewById(R.id.password);

         button.setOnClickListener(new View.OnClickListener() {
             @Override
             public void onClick(View v) {
                 startActivity(new Intent(SignUp.this,Login.class));
                 finish();
             }
         });
         next.setOnClickListener(new View.OnClickListener() {
             @Override
             public void onClick(View v) {
                 startActivity(new Intent(SignUp.this,UserInfo.class));

             }
         });

         username.addTextChangedListener(new TextWatcher() {
             @Override
             public void beforeTextChanged(CharSequence s, int start, int count, int after) {

             }

             @Override
             public void onTextChanged(CharSequence s, int start, int before, int count) {

             }

             @Override
             public void afterTextChanged(Editable s) {

             }
         });


    }
}