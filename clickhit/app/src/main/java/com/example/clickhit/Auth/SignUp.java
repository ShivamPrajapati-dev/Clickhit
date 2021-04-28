package com.example.clickhit.Auth;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatTextView;

import com.example.clickhit.Network.NetworkCalls.AddConsumer;
import com.example.clickhit.R;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

import java.util.HashMap;

public class SignUp extends AppCompatActivity{

    private AppCompatTextView button;
    private Button next;
    private TextInputEditText username, password, confirm_password;
    private TextInputLayout textInputLayout_password, textInputLayout_username, textInputLayout_confirm_password;
    private HashMap<String,String> body;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        initAssets();

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(SignUp.this, Login.class));
                finish();
            }
        });


        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (TextUtils.isEmpty(username.getText().toString())) {
                    textInputLayout_username.setError("Enter your username");
                } else if (TextUtils.isEmpty(password.getText().toString())) {

                    textInputLayout_password.setError("Enter password");
                } else if (TextUtils.isEmpty(confirm_password.getText().toString())) {
                    textInputLayout_confirm_password.setError("Confirm password");
                } else if (!TextUtils.equals(password.getText().toString().trim(), confirm_password.getText().toString().trim())) {
                    textInputLayout_confirm_password.setError("Password not matched");
                } else {
                    body.put("username",username.getText().toString().trim());
                    body.put("password",confirm_password.getText().toString().trim());

                    //API call
                    AddConsumer.create(SignUp.this,body);

                }
            }
        });

        username.addTextChangedListener(new MyTextWatcher(username));
        password.addTextChangedListener(new MyTextWatcher(password));
        confirm_password.addTextChangedListener(new MyTextWatcher(confirm_password));

    }

    private void initAssets() {

        body = new HashMap<>();
        button = findViewById(R.id.login);
        next = findViewById(R.id.next);
        username = findViewById(R.id.user_name);
        password = findViewById(R.id.password);
        confirm_password = findViewById(R.id.confirm_password);
        textInputLayout_password = findViewById(R.id.TIL_password);
        textInputLayout_username = findViewById(R.id.TIL_username);
        textInputLayout_confirm_password = findViewById(R.id.TIL_confirm_password);

    }

    private class MyTextWatcher implements TextWatcher{
        private final View view;
        public MyTextWatcher(View view) {
            this.view = view;
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {

        }

        @Override
        public void afterTextChanged(Editable s) {
                if(view.getId() == R.id.user_name){
                    textInputLayout_username.setError(null);
                }else if(view.getId() == R.id.password){
                    textInputLayout_password.setError(null);
                }else if(view.getId() == R.id.confirm_password){
                    textInputLayout_confirm_password.setError(null);
                }
        }
    }

}