package com.example.clickhit.HomePager.Food;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.clickhit.Model.Food;
import com.example.clickhit.repositories.FoodPostsRepository;

import java.util.HashMap;
import java.util.List;

public class FoodViewModel extends ViewModel {
    // TODO: Implement the ViewModel
    private MutableLiveData<List<Food>> foodPosts;
    private FoodPostsRepository repository;

    public void init(Context context){
        if(foodPosts==null){
            repository = FoodPostsRepository.getInstance();
            HashMap<String ,String> map = new HashMap<>();
            map.put("username","shivam");
            foodPosts = repository.getFoodPosts(context, map);
        }
    }

    public LiveData<List<Food>> getFoodPosts(){
        return foodPosts;
    }
}