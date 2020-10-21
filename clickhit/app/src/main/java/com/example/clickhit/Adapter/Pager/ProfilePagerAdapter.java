package com.example.clickhit.Adapter.Pager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.example.clickhit.ProfilePager.Kitchen.KitchenFragment;
import com.example.clickhit.ProfilePager.Quotes.MyQuotesFragment;
import com.example.clickhit.ProfilePager.Sketch.MySketchFragment;

public class ProfilePagerAdapter extends FragmentStatePagerAdapter {

    int count = 0;
    String[] tabLayout = new String[]{"My Kitchen", "My Sketch", "My Quotes"};

    public ProfilePagerAdapter(@NonNull FragmentManager fm, int count) {
        super(fm);
        this.count = count;
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        super.getPageTitle(position);
        return tabLayout[position];
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0: {
                return new KitchenFragment();
            }
            case 1: {
                return new MySketchFragment();
            }
            case 2: {
                return new MyQuotesFragment();
            }
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return count;
    }
}
