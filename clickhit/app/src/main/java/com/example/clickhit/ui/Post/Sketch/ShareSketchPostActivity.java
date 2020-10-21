package com.example.clickhit.ui.Post.Sketch;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatImageView;

import com.bumptech.glide.Glide;
import com.example.clickhit.R;

public class ShareSketchPostActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share_sketch_post);
        Intent intent = getIntent();
        String uri = intent.getStringExtra("uri");
        AppCompatImageView imageView = findViewById(R.id.main_image);

        Glide.with(this).load(uri).placeholder(R.drawable.placeholder).centerCrop().into(imageView);

    }
}