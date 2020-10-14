package com.example.foodypie.ui.home;

import android.app.Activity;
import android.app.SearchManager;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.AutoCompleteTextView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.SearchView;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.foodypie.R;
import com.google.android.material.chip.ChipGroup;

public class HomeFragment extends Fragment {

    private HomeViewModel homeViewModel;
    Activity activity;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        homeViewModel =
                ViewModelProviders.of(this).get(HomeViewModel.class);
        View root = inflater.inflate(R.layout.fragment_home, container, false);
        Toolbar toolbar = root.findViewById(R.id.topAppBar);
        final ChipGroup chipGroup = root.findViewById(R.id.chip_group);
        activity = getActivity();


        toolbar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                switch (item.getItemId()){
                    case R.id.search:{
                        //chipGroup.setVisibility(View.VISIBLE);
                        SearchManager searchManager = (SearchManager) activity.getSystemService(Context.SEARCH_SERVICE);

                        SearchView searchView = item.getActionView().findViewById(R.id.search);

                        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
                            @Override
                            public boolean onQueryTextSubmit(String query) {
                                return false;
                            }

                            @Override
                            public boolean onQueryTextChange(String newText) {
                                Log.i("qqq",newText);
                                return true;
                            }
                        });
                        searchView.setSearchableInfo(searchManager.getSearchableInfo(activity.getComponentName()));
                        searchView.setSuggestionsAdapter(searchView.getSuggestionsAdapter());

                        return true;

                    }
                }
                return false;
            }
        });


        return root;
    }
    
}