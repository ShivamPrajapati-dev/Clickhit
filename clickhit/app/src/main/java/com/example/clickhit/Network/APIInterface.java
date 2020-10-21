package com.example.clickhit.Network;

import com.example.clickhit.Model.AddUserResponse;
import com.example.clickhit.Model.Me;
import com.example.clickhit.Model.User;
import com.google.gson.JsonObject;

import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Query;

public interface APIInterface {

    //================================= User =======================================

    @Multipart
    @POST("/adduser")                                               // without auth
    Call<AddUserResponse> addUser(@Part("userId") String userId,
                                  @Part("name") String name,
                                  @Part("password") String password,
                                  @Part("dob") String dob,
                                  @Part("pic") MultipartBody.Part pic);

    @GET("/user/me")
    Call<Me> getProfile();

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
