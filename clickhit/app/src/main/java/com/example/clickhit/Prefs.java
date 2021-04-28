package com.example.clickhit;

import android.content.Context;
import android.content.SharedPreferences;

public class Prefs {
    private static String KEY = "com.example.clickhit";

    public static void saveToken(Context context, String value) {
        SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE).edit();
        editor.putString("token", value);
        editor.apply();
    }

    public static void saveTokenSecret(Context context, String value) {
        SharedPreferences.Editor editor = context.getSharedPreferences(KEY, Context.MODE_PRIVATE).edit();
        editor.putString("secret", value);
        editor.apply();
    }

    public static String getToken(Context context) {
        SharedPreferences preferences = context.getSharedPreferences(KEY, Context.MODE_PRIVATE);
        return preferences.getString("token", null);
    }

    public static String getTokenSecret(Context context) {
        SharedPreferences preferences = context.getSharedPreferences(KEY, Context.MODE_PRIVATE);
        return preferences.getString("secret", null);
    }

}
