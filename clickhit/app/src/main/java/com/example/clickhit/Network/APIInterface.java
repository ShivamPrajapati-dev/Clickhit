package com.example.clickhit.Network;

import com.example.clickhit.Model.AddUserResponse;
import com.example.clickhit.Model.Me;
import com.example.clickhit.Model.User;
import com.google.gson.JsonObject;

import java.util.HashMap;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Query;

public interface APIInterface {

    //================================= User =======================================
    @Multipart
    @POST("/adduser")                                               // without auth
    Call<Object> addUser(@Part MultipartBody.Part userId,
                         @Part MultipartBody.Part name,
                         @Part MultipartBody.Part password,
                         @Part MultipartBody.Part age,
                         @Part MultipartBody.Part bio,
                         @Part MultipartBody.Part part);

    @GET("/user/me")
    Call<Object> getProfile();

    @POST("/user/login")                                          //without auth
    Call<User> login(@Body User user);

    @GET("/user/me/logout")
    Call<Boolean> logout();

    @POST("/updatepic/me")
    Call<Boolean> updatePic(@Part("newpic") MultipartBody.Part newpic);

    @POST("/updateuserinfo/me")
    Call<User> updateInfo(@Body User user);

    @GET("/userss/_search/")                                     //Elastic Search
    Call<JsonObject> checkUsername(@Query("userId") String userId);

}
