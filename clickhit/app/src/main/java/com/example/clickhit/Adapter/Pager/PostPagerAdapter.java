package com.example.clickhit.Adapter.Pager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.example.clickhit.PostPager.Camera.CameraFragment;
import com.example.clickhit.PostPager.Gallery.GalleryFragment;

public class PostPagerAdapter extends FragmentStatePagerAdapter {

    private String[] title = new String[]{"Gallery", "Camera"};
    int count =0;
    public PostPagerAdapter(@NonNull FragmentManager fm,int count) {
        super(fm);
        this.count = count;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position){
            case 0:
                return new GalleryFragment();
            case 1:
                return new CameraFragment();
            default:
                return null;
        }
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
         super.getPageTitle(position);
         return title[position];
    }

    @Override
    public int getCount() {
        return count;
    }
}
