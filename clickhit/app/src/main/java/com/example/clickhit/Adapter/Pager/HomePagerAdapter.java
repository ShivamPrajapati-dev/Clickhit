package com.example.clickhit.Adapter.Pager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.example.clickhit.HomePager.Food.FoodFragment;
import com.example.clickhit.HomePager.Quotes.QuotesFragment;
import com.example.clickhit.HomePager.Sketch.SketchFragment;

public class HomePagerAdapter extends FragmentStatePagerAdapter {

    private int count = 0;
    private String[] tabTitles = new String[]{"Food", "Sketch", "Quotes"};
    public HomePagerAdapter(@NonNull FragmentManager fm, int count) {
        super(fm);
        this.count = count;
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
         super.getPageTitle(position);

         return tabTitles[position];
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0: {
                return new FoodFragment();
            }
            case 1: {
                return new SketchFragment();
            }
            case 2: {
                return new QuotesFragment();
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
