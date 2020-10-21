package com.example.clickhit.Network;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitInitializeES {

    public Retrofit retrofit;
    public APIInterface apiInterface;
    public static String BASE_URL = "https://search-community-kitchen-xgzmas46cnub6kabvc5bg5rtzu.us-east-1.es.amazonaws.com/";


    public APIInterface init() {

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        apiInterface = retrofit.create(APIInterface.class);

        return apiInterface;
    }
}
