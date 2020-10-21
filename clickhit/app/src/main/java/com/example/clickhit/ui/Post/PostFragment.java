package com.example.clickhit.ui.Post;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.example.clickhit.R;
import com.example.clickhit.ui.Post.Food.PostFoodActivity;
import com.example.clickhit.ui.Post.Quotes.PostQuoteActivity;
import com.example.clickhit.ui.Post.Sketch.PostSketchActivity;
import com.google.android.material.card.MaterialCardView;

public class PostFragment extends Fragment implements MaterialCardView.OnClickListener {

    MaterialCardView food, quotes, sketch;
    Context context;
    private PostViewModel mViewModel;

    public static PostFragment newInstance() {
        return new PostFragment();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.post_fragment, container, false);
        context = getContext();
        food = view.findViewById(R.id.food_card);
        sketch = view.findViewById(R.id.sketch_card);
        quotes = view.findViewById(R.id.quotes_card);

        food.setOnClickListener(this);
        sketch.setOnClickListener(this);
        quotes.setOnClickListener(this);

        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(PostViewModel.class);
        // TODO: Use the ViewModel
    }


    @Override
    public void onClick(View v) {

        if (v == food) {
            Intent intent = new Intent(context, PostFoodActivity.class);
            intent.putExtra("which","Food");
            startActivity(intent);
        } else if (v == sketch) {
            Intent intent = new Intent(context, PostSketchActivity.class);
            intent.putExtra("which","Sketch");
            startActivity(intent);
        } else if (v == quotes) {
            startActivity(new Intent(context, PostQuoteActivity.class));
        }
    }
}