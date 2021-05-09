package com.example.clickhit.HomePager.Food;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.clickhit.Model.Food;
import com.example.clickhit.R;
import com.google.gson.Gson;

import java.util.List;

public class FoodFragment extends Fragment {

    private FoodViewModel mViewModel;

    public static FoodFragment newInstance() {
        return new FoodFragment();
    }

    private static final String TAG = "FoodFragment";
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.food_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //TODO: Initialize views
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(FoodViewModel.class);
        // TODO: Use the ViewModel
        mViewModel.init(getContext());

        mViewModel.getFoodPosts().observe(getViewLifecycleOwner(), new Observer<List<Food>>() {
            @Override
            public void onChanged(List<Food> foodPosts) {
                Log.i(TAG, "onChanged: "+new Gson().toJson(foodPosts));
            }
        });
    }

}