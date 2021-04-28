package com.example.clickhit.Network.NetworkCalls;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import com.example.clickhit.Auth.SignUp;
import com.example.clickhit.Auth.UserInfo;
import com.example.clickhit.Network.RetrofitInitialize;
import com.example.clickhit.Output.MakeToast;
import com.example.clickhit.Prefs;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddConsumer {
    public static void create(Context context, HashMap<String, String> body) {
        Call<Object> call = RetrofitInitialize.init().addConsumer(body);
        call.enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {
                if (response.isSuccessful()) {
                    try {
                        String json = new Gson().toJson(response.body());
                        JsonParser parser = new JsonParser();
                        JsonObject jsonObject = (JsonObject) parser.parse(json);
                        Prefs.saveToken(context, jsonObject.get("token").getAsString());
                        Prefs.saveTokenSecret(context, jsonObject.get("secret").getAsString());
                        Intent intent = new Intent(context, UserInfo.class);

                        context.startActivity(intent);
                        ((Activity)context).finish();

                    } catch (Exception e) {
                        new MakeToast(e.getMessage(), context);
                    }
                } else {
                    new MakeToast(response.message(), context);
                }
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                new MakeToast(t.getLocalizedMessage(), context);
            }
        });
    }
}
