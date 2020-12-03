package com.example.clickhit.Network;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitInitialize {
    public Retrofit retrofit;
    public APIInterface apiInterface;
    public static String BASE_URL = "https://897640b4d2fc.ngrok.io";

    public APIInterface init() {
        final OkHttpClient okHttpClient = new OkHttpClient.Builder()
                .readTimeout(120, TimeUnit.SECONDS)
                .connectTimeout(120, TimeUnit.SECONDS)
                .build();

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(okHttpClient)
                .build();

        apiInterface = retrofit.create(APIInterface.class);

        return apiInterface;
    }

}
