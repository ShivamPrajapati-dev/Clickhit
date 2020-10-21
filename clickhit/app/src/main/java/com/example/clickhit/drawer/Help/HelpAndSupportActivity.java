package com.example.clickhit.drawer.Help;

import android.content.Intent;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatImageView;

import com.bumptech.glide.Glide;
import com.example.clickhit.R;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.android.material.textview.MaterialTextView;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class HelpAndSupportActivity extends AppCompatActivity implements View.OnClickListener {

    private static final int REQUEST_IMAGE_GET_ONE = 1;
    private static final int REQUEST_IMAGE_GET_TWO = 2;
    ArrayList<Uri> list;

    MaterialTextView ss1, ss2;
    AppCompatImageView image1, image2, close1, close2;
    MaterialButton button;
    TextInputEditText review;
    TextInputLayout textInputLayout;
    MaterialToolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_help_and_support);
        list = new ArrayList<>(2);
        ss1 = findViewById(R.id.ss1);
        ss2 = findViewById(R.id.ss2);
        button = findViewById(R.id.next);
        toolbar = findViewById(R.id.toolbar);
        ss1.setOnClickListener(this);
        ss2.setOnClickListener(this);
        button.setOnClickListener(this);
        image1 = findViewById(R.id.ssimage1);
        image2 = findViewById(R.id.ssimage2);
        close1 = findViewById(R.id.close1);
        close2 = findViewById(R.id.close2);
        review = findViewById(R.id.review_text);
        textInputLayout = findViewById(R.id.review);
        close1.setOnClickListener(this);
        close2.setOnClickListener(this);

        list.add(0, null);
        list.add(1, null);

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

    }

    @Override
    public void onClick(View v) {
        if (v == ss1) {
            selectImage(1);
        } else if (v == ss2) {
            selectImage(2);
        } else if (v == button) {
            //send email
            sendEmail();
        } else if (v == close1) {
            image1.setImageDrawable(null);
            list.set(0, null);
            ss1.setVisibility(View.VISIBLE);
            close1.setVisibility(View.GONE);
        } else if (v == close2) {
            image2.setImageDrawable(null);
            list.set(1, null);
            ss2.setVisibility(View.VISIBLE);
            close2.setVisibility(View.GONE);
        }
    }

    private void sendEmail() {

        String body = Objects.requireNonNull(review.getText()).toString();
        if (TextUtils.isEmpty(body)) {
            textInputLayout.setError("Required");
            return;
        }
        Intent intent = new Intent(Intent.ACTION_SEND_MULTIPLE);
        intent.setType("text/plain");
        intent.putExtra(Intent.EXTRA_EMAIL, new String[]{"nik.shivamprajapati@gmail.com"});
        intent.putExtra(Intent.EXTRA_SUBJECT, "Clickhit review");
        intent.putExtra(Intent.EXTRA_TEXT, body);
        intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, list);
        if (intent.resolveActivity(getPackageManager()) != null) {
            List<ResolveInfo> matches = getPackageManager().queryIntentActivities(intent, 0);
            for (ResolveInfo info : matches) {
                if (info.activityInfo.packageName.endsWith(".gm") || info.activityInfo.name.toLowerCase().contains("gmail")) {
                    intent.setClassName(info.activityInfo.packageName, info.activityInfo.name);
                }
            }
            startActivity(intent);
        }
    }

    private void selectImage(int which) {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        if (intent.resolveActivity(getPackageManager()) != null) {
            if (which == REQUEST_IMAGE_GET_ONE)
                startActivityForResult(intent, REQUEST_IMAGE_GET_ONE);
            else if (which == REQUEST_IMAGE_GET_TWO)
                startActivityForResult(intent, REQUEST_IMAGE_GET_TWO);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_IMAGE_GET_ONE && resultCode == RESULT_OK) {

            assert data != null;
            // Bitmap thumbnail = data.getParcelableExtra("data");
            Uri fullPhotoUri = data.getData();

            list.set(0, fullPhotoUri);
            Glide.with(HelpAndSupportActivity.this).load(fullPhotoUri).centerCrop().into(image1);
            ss1.setVisibility(View.INVISIBLE);
            close1.setVisibility(View.VISIBLE);

        } else if (requestCode == REQUEST_IMAGE_GET_TWO && resultCode == RESULT_OK) {
            assert data != null;
            //  Bitmap thumbnail = data.getParcelableExtra("data");
            Uri fullPhotoUri = data.getData();

            list.set(1, fullPhotoUri);
            Glide.with(HelpAndSupportActivity.this).load(fullPhotoUri).centerCrop().into(image2);
            ss2.setVisibility(View.INVISIBLE);
            close2.setVisibility(View.VISIBLE);
        }


    }
}