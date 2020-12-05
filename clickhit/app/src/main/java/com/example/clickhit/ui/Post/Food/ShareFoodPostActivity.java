package com.example.clickhit.ui.Post.Food;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatImageView;

import com.bumptech.glide.Glide;
import com.example.clickhit.R;
import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.List;

public class ShareFoodPostActivity extends AppCompatActivity {

    List<View> list_ing = new ArrayList<>();
    List<View> list_rec = new ArrayList<>();
    LinearLayout ingredientLayout, recipeLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share_food_post);
        final LayoutInflater inflater = getLayoutInflater();
        ingredientLayout = findViewById(R.id.ingredient_layout);
        recipeLayout = findViewById(R.id.recipe_layout);
        MaterialButton share = findViewById(R.id.share);
        Intent intent = getIntent();
        String uri = intent.getStringExtra("uri");
        AppCompatImageView imageView = findViewById(R.id.main_image);

        Glide.with(this).load(uri).placeholder(R.drawable.placeholder).centerCrop().into(imageView);


        final MaterialButton newIngredient = findViewById(R.id.add_new_item);

        newIngredient.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final View view = inflater.inflate(R.layout.ingredient_view, null);
                list_ing.add(view);
                view.setTag(list_ing.size() - 1);
                view.findViewById(R.id.cancel).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        ingredientLayout.removeView(view);
                        list_ing.remove(view);
                    }
                });

                ingredientLayout.addView(view);
            }
        });

        newIngredient.performClick();
        newIngredient.performClick();

        MaterialButton newRecipe = findViewById(R.id.add_new_row);

        newRecipe.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final View view = inflater.inflate(R.layout.recipe_view, null);
                list_rec.add(view);
                view.setTag(list_rec.size() - 1);
                view.findViewById(R.id.cancel).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        recipeLayout.removeView(view);
                        list_rec.remove(view);
                    }
                });

                recipeLayout.addView(view);
            }
        });
        newRecipe.performClick();
        newRecipe.performClick();


        share.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            }
        });


    }




}