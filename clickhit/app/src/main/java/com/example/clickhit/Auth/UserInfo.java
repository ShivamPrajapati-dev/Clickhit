package com.example.clickhit.Auth;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;

import com.example.clickhit.MainActivity;
import com.example.clickhit.R;
import com.google.android.material.datepicker.MaterialDatePicker;
import com.google.android.material.datepicker.MaterialPickerOnPositiveButtonClickListener;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.theartofdev.edmodo.cropper.CropImage;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.Objects;

import de.hdodenhof.circleimageview.CircleImageView;

public class UserInfo extends AppCompatActivity {

    TextInputEditText dob;
    MaterialDatePicker builder;
    FloatingActionButton floatingActionButton;
    CircleImageView imageView;
    TextInputLayout textInputLayout_username;
    Button next;
    TextInputEditText username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_info);
        builder = MaterialDatePicker.Builder.datePicker().build();
        dob = findViewById(R.id.date);
        textInputLayout_username = findViewById(R.id.TIL_username);
        next = findViewById(R.id.next);
        imageView = findViewById(R.id.dp);
        floatingActionButton = findViewById(R.id.fab);
        username = findViewById(R.id.user_name);
        dob.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                builder.show(getSupportFragmentManager(), "dob");

            }
        });

        dob.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                builder.show(getSupportFragmentManager(), "dob");
            }
        });

        builder.addOnPositiveButtonClickListener(new MaterialPickerOnPositiveButtonClickListener() {
            @Override
            public void onPositiveButtonClick(Object selection) {
                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.US);
                dob.setText(String.valueOf(sdf.format(selection)));
            }
        });

        floatingActionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                CropImage.activity().start(UserInfo.this);
            }
        });

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(TextUtils.isEmpty(username.getText().toString())){
                    textInputLayout_username.setError("Enter your name");
                }else{
                    startActivity(new Intent(UserInfo.this,MainActivity.class));
                    finish();
                }
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
                textInputLayout_username.setError(null);
            }
        });

    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode != RESULT_CANCELED) {

            if (resultCode == RESULT_OK) {
                if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
                    CropImage.ActivityResult result = CropImage.getActivityResult(data);
                    Uri resultUri = Objects.requireNonNull(result).getUri();
                    try {
                        Bitmap bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), resultUri);
                        imageView.setImageBitmap(bitmap);

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}