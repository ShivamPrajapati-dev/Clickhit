package com.example.clickhit.ui.Search;

import android.annotation.SuppressLint;
import android.app.SearchManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.TranslateAnimation;
import android.view.inputmethod.InputMethodManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.SearchView;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clickhit.Adapter.Recyclerview.SearchSuggestionAdapter;
import com.example.clickhit.R;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class SearchFragment extends Fragment implements SearchView.OnQueryTextListener, SearchSuggestionAdapter.OnItemClickListener {

    private SearchViewModel mViewModel;
    Context context;
    RecyclerView recyclerView;
    SearchSuggestionAdapter adapter;
    List<String> list = new ArrayList<>();
    Intent intent;


    public static SearchFragment newInstance() {
        return new SearchFragment();
    }


    @SuppressLint("ClickableViewAccessibility")
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        final View view = inflater.inflate(R.layout.search_fragment, container, false);
        context = getContext();
        recyclerView = view.findViewById(R.id.suggestions);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));
        intent = new Intent(context, SearchableActivity.class);
        intent.setAction(Intent.ACTION_SEARCH);
        setHasOptionsMenu(true);

        recyclerView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                InputMethodManager imm = (InputMethodManager) requireActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
                assert imm != null;
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                return false;
            }
        });

        return view;
    }



    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        super.onCreateOptionsMenu(menu, inflater);
        inflater.inflate(R.menu.search_menu, menu);
        SearchManager searchManager = (SearchManager) context.getSystemService(Context.SEARCH_SERVICE);
        final SearchView searchView = (SearchView) menu.findItem(R.id.m_search).getActionView();
        assert searchManager != null;
        searchView.setSearchableInfo(searchManager.getSearchableInfo(requireActivity().getComponentName()));
        searchView.setIconifiedByDefault(false);
        searchView.setOnQueryTextListener(this);
        searchView.setSuggestionsAdapter(null);


        searchView.setOnQueryTextFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    recyclerView.setVisibility(View.GONE);
                } else {
                    recyclerView.setVisibility(View.VISIBLE);
                }
            }
        });


    }


    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(SearchViewModel.class);
        // TODO: Use the ViewModel
    }


    @Override
    public boolean onQueryTextSubmit(String query) {
        intent.putExtra(SearchManager.QUERY, query);
        startActivity(intent);
        return true;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        adapter.getFilter().filter(newText);
        return true;
    }

    @Override
    public void onItemClick(String query) {
        intent.putExtra(SearchManager.QUERY, query);
        startActivity(intent);
    }

    private class BackgroundProcess extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void... params) {


            ContentResolver cr = requireActivity().getContentResolver();
            Uri uri = Uri.parse("content://com.examples.MySuggestionProvider/" + SearchManager.SUGGEST_URI_PATH_QUERY + "?limit=50");
            String selection = " ?";
            String[] selectionArgs = {""};
            Cursor cursor = cr.query(uri, null, selection, selectionArgs, null);

            assert cursor != null;
            list.clear();
            if (cursor.moveToFirst()) {
                do {

                    list.add(cursor.getString(cursor.getColumnIndexOrThrow(SearchManager.SUGGEST_COLUMN_TEXT_1)));
                } while (cursor.moveToNext());
            }

            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            adapter = new SearchSuggestionAdapter(context, list, SearchFragment.this);
            recyclerView.setAdapter(adapter);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        BackgroundProcess process = new BackgroundProcess();
        process.execute();
    }

}