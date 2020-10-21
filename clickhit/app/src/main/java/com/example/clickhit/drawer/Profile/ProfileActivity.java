package com.example.clickhit.drawer.Profile;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.example.clickhit.Adapter.Pager.ProfilePagerAdapter;
import com.example.clickhit.R;
import com.example.clickhit.drawer.PrivacyPolicy.PolicyActivity;
import com.google.android.material.appbar.AppBarLayout;
import com.google.android.material.tabs.TabLayout;

public class ProfileActivity extends AppCompatActivity implements AppBarLayout.OnOffsetChangedListener, TabLayout.OnTabSelectedListener {


    private static final int PERCENTAGE_TO_ANIMATE_AVATAR = 20;
    private boolean mIsAvatarShown = true;

    private ImageView mProfileImage;
    private int mMaxScrollSize;
    ViewPager pager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        AppBarLayout appbarLayout = (AppBarLayout) findViewById(R.id.materialup_appbar);
        TabLayout tabLayout = findViewById(R.id.tab);
        tabLayout.addTab(tabLayout.newTab().setText("My Kitchen"));
        tabLayout.addTab(tabLayout.newTab().setText("My Sketch"));
        tabLayout.addTab(tabLayout.newTab().setText("My Quotes"));
        tabLayout.setTabGravity(TabLayout.GRAVITY_FILL);

        tabLayout.setOnTabSelectedListener(this);
        pager = findViewById(R.id.view_pager);
        ProfilePagerAdapter adapter = new ProfilePagerAdapter(getSupportFragmentManager(),tabLayout.getTabCount());

        pager.setAdapter(adapter);

        tabLayout.setupWithViewPager(pager);
        mProfileImage = (ImageView) findViewById(R.id.materialup_profile_image);


        appbarLayout.addOnOffsetChangedListener(this);
        mMaxScrollSize = appbarLayout.getTotalScrollRange();

    }

    @Override
    public void onOffsetChanged(AppBarLayout appBarLayout, int verticalOffset) {
        if (mMaxScrollSize == 0)
            mMaxScrollSize = appBarLayout.getTotalScrollRange();

        int percentage = (Math.abs(verticalOffset)) * 100 / mMaxScrollSize;

        if (percentage >= PERCENTAGE_TO_ANIMATE_AVATAR && mIsAvatarShown) {
            mIsAvatarShown = false;

            mProfileImage.animate()
                    .scaleY(0).scaleX(0)
                    .setDuration(200)
                    .start();
        }

        if (percentage <= PERCENTAGE_TO_ANIMATE_AVATAR && !mIsAvatarShown) {
            mIsAvatarShown = true;

            mProfileImage.animate()
                    .scaleY(1).scaleX(1)
                    .start();
        }
    }


    @Override
    public void onTabSelected(TabLayout.Tab tab) {
    pager.setCurrentItem(tab.getPosition());
    }

    @Override
    public void onTabUnselected(TabLayout.Tab tab) {

    }

    @Override
    public void onTabReselected(TabLayout.Tab tab) {

    }
}