package com.example.clickhit.repositories;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.clickhit.Model.Food;
import com.example.clickhit.Network.NetworkCalls.UserFeed;
import com.example.clickhit.Output.MakeToast;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/*
 * Singleton pattern
 * */
public class FoodPostsRepository {

    private static FoodPostsRepository instance;
    private final List<Food> foodPostList = new ArrayList<>();

    public static FoodPostsRepository getInstance() {
        if (instance == null) {
            instance = new FoodPostsRepository();
        }

        return instance;
    }

    public MutableLiveData<List<Food>> getFoodPosts(Context context, HashMap<String, String> body) {
        MutableLiveData<List<Food>> foods = new MutableLiveData<>();

        //Retrieve data from backend database
        Callback<Object> callback = new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {
                if (response.isSuccessful()) {
                    try {
                        String json = new Gson().toJson(response.body());
                        JsonParser jsonParser = new JsonParser();
                        JsonArray jsonArray = (JsonArray) jsonParser.parse(json);
                        for (int i = 0; i < jsonArray.size(); i++) {
                            String imgUrl = jsonArray.get(i).getAsJsonObject().get("img_url").getAsString();
                            String imgName = jsonArray.get(i).getAsJsonObject().get("img_name").getAsString();
                            String category = jsonArray.get(i).getAsJsonObject().get("category").getAsString();
                            String foodName = jsonArray.get(i).getAsJsonObject().get("food_name").getAsString();
                            JsonArray ingredientsArray = jsonArray.get(i).getAsJsonObject().get("ingredients").getAsJsonArray();
                            List<String> ingredients = new ArrayList<>();
                            for (int j = 0; j < ingredientsArray.size(); j++)
                                ingredients.add(ingredientsArray.get(j).getAsString());
                            Food food = new Food(imgUrl, imgName, category, foodName, ingredients);
                            foodPostList.add(food);
                        }
                        foods.setValue(foodPostList);       // setting data
                    } catch (Exception e) {
                        new MakeToast(e.getMessage(), context);
                    }
                } else {
                    new MakeToast(response.message(), context);
                }
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                new MakeToast(t.getMessage(), context);
            }
        };
        UserFeed.getFoodUserFeed(context, body, callback);
        return foods;
    }


}
