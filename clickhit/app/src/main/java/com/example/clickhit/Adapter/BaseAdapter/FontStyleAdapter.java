package com.example.clickhit.Adapter.BaseAdapter;

import android.content.Context;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.clickhit.R;

import java.util.List;

public class FontStyleAdapter extends ArrayAdapter<String> {
    List<String> list;
    Context context;

    public FontStyleAdapter(List<String> list, Context context) {
        super(context, R.layout.support_simple_spinner_dropdown_item, list);
        this.list = list;
        this.context = context;
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public String getItem(int position) {
        return list.get(position).replaceAll("\\.[^.]*$", "");
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = null;

        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if ((convertView == null)) {
            assert inflater != null;
            view = inflater.inflate(R.layout.support_simple_spinner_dropdown_item, parent, false);

        } else {
            view = convertView;
        }

        TextView textView = view.findViewById(android.R.id.text1);
        textView.setTextSize(25);
        Typeface typeface = Typeface.createFromAsset(context.getAssets(), list.get(position));
        textView.setTypeface(typeface);
        textView.setText(list.get(position).replaceAll("\\.[^.]*$", ""));

        return view;
    }
}
