package com.example.clickhit.Adapter.Recyclerview;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.clickhit.R;

import java.util.List;

public class QuotesPreviewAdapter extends RecyclerView.Adapter<QuotesPreviewAdapter.ViewHolder> {
    List<Integer> list;
    Context context;
    OnItemClickListener onItemClickListener;

    public QuotesPreviewAdapter(List<Integer> list, Context context) {
        this.list = list;
        onItemClickListener = (OnItemClickListener) context;
    }

    @NonNull
    @Override
    public QuotesPreviewAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.quotes_preview_layout, parent, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull QuotesPreviewAdapter.ViewHolder holder, final int position) {

        Glide.with(context).load(list.get(position)).centerCrop().into(holder.imageView);

        holder.imageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onItemClickListener.onItemClick(position);
            }
        });

    }

    public interface OnItemClickListener {
        void onItemClick(int position);
    }


    @Override
    public int getItemCount() {
        return list.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        AppCompatImageView imageView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            imageView = itemView.findViewById(R.id.image);
        }
    }
}
