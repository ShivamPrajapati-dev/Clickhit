package com.example.clickhit.ui.Post.Quotes;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Toast;

import com.example.clickhit.R;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

public class PostQuoteActivity extends AppCompatActivity {
    TextInputEditText quote;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_quote);
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        quote = findViewById(R.id.text1);
        toolbar.setNavigationOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        MaterialButton button = findViewById(R.id.next);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String text = quote.getText().toString();
                if(!TextUtils.isEmpty(text) && text.length()>2) {
                    Intent intent = new Intent(PostQuoteActivity.this, ShareQuotePostActivity.class);
                    intent.putExtra("quote",text);
                    startActivity(intent);
                }else{
                    Toast.makeText(PostQuoteActivity.this,"Too few characters",Toast.LENGTH_LONG).show();
                }
            }
        });

    }
}