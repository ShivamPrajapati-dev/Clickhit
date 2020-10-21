package com.example.clickhit.ui.Post.Quotes;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Typeface;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AutoCompleteTextView;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.clickhit.Adapter.BaseAdapter.FontStyleAdapter;
import com.example.clickhit.Adapter.Recyclerview.QuotesPreviewAdapter;
import com.example.clickhit.R;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.chip.Chip;
import com.google.android.material.chip.ChipGroup;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.slider.Slider;
import com.google.android.material.textview.MaterialTextView;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ShareQuotePostActivity extends AppCompatActivity implements QuotesPreviewAdapter.OnItemClickListener {

    List<Integer> list = new ArrayList<>();
    List<String> fonts = new ArrayList<>();
    AppCompatImageView imageView;
    ChipGroup chipGroup;
    MaterialTextView textView;
    AutoCompleteTextView autoCompleteTextView;
    RecyclerView recyclerView;
    RelativeLayout relativeLayout;
    MaterialButton button;
    Slider slider;


    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share_quote_post);

        Intent intent = getIntent();
        String text = intent.getStringExtra("quote");

        imageView = findViewById(R.id.picture);
        chipGroup = findViewById(R.id.color_chip);
        relativeLayout = findViewById(R.id.pic);
        button = findViewById(R.id.next);
        textView = findViewById(R.id.main_text);
        autoCompleteTextView = findViewById(R.id.text_style);
        recyclerView = findViewById(R.id.items);
        slider = findViewById(R.id.slider);

        textView.setText(text);

        fonts.add("Alex Brush.ttf");
        fonts.add("Aller.ttf");
        fonts.add("AmaticSC.ttf");
        fonts.add("blackjack.otf");
        fonts.add("Dancing Script.otf");
        fonts.add("Grand Hotel.otf");
        fonts.add("Great Vibes.otf");
        fonts.add("Josefin Sans Light.ttf");
        fonts.add("Kaushan Script.otf");
        fonts.add("Playfair Display.otf");
        fonts.add("Rubik-Light.ttf");
        fonts.add("Rubik-Regular.ttf");
        fonts.add("Source Sans Pro Light.otf");
        fonts.add("Windsong.ttf");

        FontStyleAdapter adapter = new FontStyleAdapter(fonts, this);
        autoCompleteTextView.setAdapter(adapter);

        autoCompleteTextView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Typeface typeface = Typeface.createFromAsset(getAssets(), fonts.get(position));
                autoCompleteTextView.setTypeface(typeface);
                textView.setTypeface(typeface);
            }
        });

        list.add(R.drawable.one);
        list.add(R.drawable.two);
        list.add(R.drawable.three);
        list.add(R.drawable.four);
        list.add(R.drawable.five);
        list.add(R.drawable.six);
        list.add(R.drawable.seven);
        list.add(R.drawable.eight);

        chipGroup.setOnCheckedChangeListener(new ChipGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(ChipGroup group, int checkedId) {

                Chip chip = findViewById(checkedId);
                try {
                    int color = Objects.requireNonNull(chip.getChipBackgroundColor()).getDefaultColor();
                    imageView.clearColorFilter();

                    imageView.setColorFilter(color);
                } catch (Exception e) {
                    Log.i("excep", Objects.requireNonNull(e.getLocalizedMessage()));
                }


            }
        });

        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        QuotesPreviewAdapter adapter1 = new QuotesPreviewAdapter(list, this);
        recyclerView.setAdapter(adapter1);

        Glide.with(ShareQuotePostActivity.this).load(list.get(0)).into(imageView);


        imageView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {

                textView.setX(event.getX());
                textView.setY(event.getY());
                return true;
            }


        });

        float size = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_SP, 10, getResources().getDisplayMetrics());
        textView.setTextSize(size);
        slider.setValueFrom(10);
        slider.setValueTo((float) (size + 19.05));
        slider.setValue(size);

        slider.addOnChangeListener(new Slider.OnChangeListener() {
            @Override
            public void onValueChange(@NonNull Slider slider, float value, boolean fromUser) {
                textView.setTextSize(value);
            }
        });

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                relativeLayout.setDrawingCacheEnabled(true);
                Bitmap bitmap = Bitmap.createBitmap(relativeLayout.getDrawingCache());
                relativeLayout.setDrawingCacheEnabled(false);
                LayoutInflater layoutInflater = getLayoutInflater();
                View dialogView = layoutInflater.inflate(R.layout.dialog_post,null);
                ImageView imageView = dialogView.findViewById(R.id.image);
                imageView.setImageBitmap(bitmap);
                new MaterialAlertDialogBuilder(ShareQuotePostActivity.this,R.style.Material_Dialog)
                        .setView(dialogView)
                        .setPositiveButton("Proceed", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {

                            }
                        }).setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                }).show();
            }
        });


    }


    @Override
    public void onItemClick(int position) {
        imageView.clearColorFilter();
        Glide.with(ShareQuotePostActivity.this).load(list.get(position)).into(imageView);
    }
}