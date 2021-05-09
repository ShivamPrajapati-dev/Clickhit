package com.example.clickhit.Network.NetworkCalls;

import android.content.Context;

import com.example.clickhit.Model.Food;
import com.example.clickhit.Network.RetrofitInitialize;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;

public class UserFeed {
    public static void getFoodUserFeed(Context context, HashMap<String, String> body, Callback<Object> callback) {
        Call<Object> call = RetrofitInitialize.getInstance().getUserFeed(body);
        List<Food> list = new ArrayList<>();
        call.enqueue(callback);
    }
}
