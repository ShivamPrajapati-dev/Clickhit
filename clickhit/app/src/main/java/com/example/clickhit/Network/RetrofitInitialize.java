package com.example.clickhit.Network;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitInitialize {
    public Retrofit retrofit;
    public APIInterface apiInterface;
    public static String BASE_URL = "https://127.0.0.1:3000/";

    public APIInterface init() {

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        apiInterface = retrofit.create(APIInterface.class);

        return apiInterface;
    }

}
