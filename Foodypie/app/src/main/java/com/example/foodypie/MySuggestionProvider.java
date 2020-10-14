package com.example.foodypie;

import android.content.SearchRecentSuggestionsProvider;

public class MySuggestionProvider extends SearchRecentSuggestionsProvider {
    public final static int MODE = DATABASE_MODE_QUERIES;
    public final static String AUTHORITY = "com.example.MySuggestionProvider";

    public MySuggestionProvider() {
        setupSuggestions(AUTHORITY,MODE);
    }
}
