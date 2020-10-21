package com.example.clickhit.drawer.Settings;

import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.clickhit.R;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

public class SettingsActivity extends AppCompatActivity implements MaterialCardView.OnClickListener {
    MaterialToolbar toolbar;
    MaterialCardView password,about,logout,invite,notifications;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        toolbar = findViewById(R.id.toolbar);
        password = findViewById(R.id.password);
        about = findViewById(R.id.about);
        logout = findViewById(R.id.logout);
        invite = findViewById(R.id.invite);
        notifications = findViewById(R.id.notification);
        password.setOnClickListener(this);
        about.setOnClickListener(this);
        logout.setOnClickListener(this);
        invite.setOnClickListener(this);
        notifications.setOnClickListener(this);

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });




    }

    @Override
    public void onClick(View v) {
        if(v == password){
            startActivity(new Intent(SettingsActivity.this, PasswordActivity.class));
        }else if(v == about){
            startActivity(new Intent(SettingsActivity.this,AboutActivity.class));
        }else if(v == logout){
            // show dialog
            new MaterialAlertDialogBuilder(SettingsActivity.this,R.style.Material_Dialog)
                    .setTitle("Log Out")
                    .setMessage("Are you sure to logout?").setNegativeButton("No", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            }).setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            }).show();
        }else if(v == invite){
            // send invite
        }else if(v == notifications){
            startActivity(new Intent(SettingsActivity.this, NotificationActivity.class));
        }
    }
}