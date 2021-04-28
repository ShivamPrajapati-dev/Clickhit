package com.example.clickhit.Output;

import android.content.Context;
import android.widget.Toast;

public class MakeToast {
    public MakeToast(String msg, Context context){
        Toast.makeText(context,msg,Toast.LENGTH_LONG).show();
    }
}
