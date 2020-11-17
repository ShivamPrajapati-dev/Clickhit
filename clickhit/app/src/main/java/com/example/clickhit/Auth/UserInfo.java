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
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.clickhit.MainActivity;
import com.example.clickhit.Network.RetrofitInitialize;
import com.example.clickhit.Prefs;
import com.example.clickhit.R;
import com.google.android.material.datepicker.MaterialDatePicker;
import com.google.android.material.datepicker.MaterialPickerOnPositiveButtonClickListener;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;
import com.theartofdev.edmodo.cropper.CropImage;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Objects;

import de.hdodenhof.circleimageview.CircleImageView;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserInfo extends AppCompatActivity {

    private TextInputEditText dob;
    private MaterialDatePicker builder;
    private FloatingActionButton floatingActionButton;
    private CircleImageView imageView;
    private TextInputLayout textInputLayout_username;
    private Button next;
    private TextInputEditText username;
    private RetrofitInitialize retrofitInitialize;
    private String path;

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
        retrofitInitialize = new RetrofitInitialize();

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

                    signup();

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

    private void signup() {
        HashMap<String,String> map = new HashMap<>();
        map.put("userId",getIntent().getStringExtra("username"));
        map.put("name",username.getText().toString().trim());
        map.put("password",getIntent().getStringExtra("password"));

        JSONObject json = new JSONObject(map);
        String body = json.toString();
        File file = new File(path);
        RequestBody requestBody = RequestBody.create(MediaType.parse("image/*"),file);
        MultipartBody.Part part = MultipartBody.Part.createFormData("pic",file.getName(),requestBody);
        MultipartBody.Part userId = MultipartBody.Part.createFormData("userId", Objects.requireNonNull(getIntent().getStringExtra("username")));
        MultipartBody.Part name = MultipartBody.Part.createFormData("name",username.getText().toString().trim());
        MultipartBody.Part password = MultipartBody.Part.createFormData("password", Objects.requireNonNull(getIntent().getStringExtra("password")));
        Call<Object> call = retrofitInitialize.init().addUser(userId,name,password,part);
        call.enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call call, Response response) {
                if(response.code() == 200){

                    String json = new Gson().toJson(response.body());
                    JSONObject jsons = null;
                    try {
                        jsons = new JSONObject(json);
                        Prefs.saveToken(UserInfo.this,jsons.getString("token"));

                        startActivity(new Intent(UserInfo.this,MainActivity.class));
                        finish();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }else{
                    Toast.makeText(UserInfo.this,String.valueOf(response.code()),Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                Toast.makeText(UserInfo.this,t.getMessage(),Toast.LENGTH_LONG).show();
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
                    //Toast.makeText(UserInfo.this,resultUri.getPath(),Toast.LENGTH_LONG).show();
                    path = resultUri.getPath();
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