package com.example.clickhit;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.NavDestination;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.bumptech.glide.Glide;
import com.example.clickhit.Network.RetrofitInitializeAuth;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity implements NavController.OnDestinationChangedListener {

    BottomNavigationView bottomNavigationView;
    private AppBarConfiguration mAppBarConfiguration;
    MaterialToolbar toolbar;
    TextInputLayout searchBar;
    View view;
    RetrofitInitializeAuth retrofitInitializeAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolbar = findViewById(R.id.topAppBar);
        setSupportActionBar(toolbar);
        searchBar = findViewById(R.id.text);
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open,
                R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();
        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.activity, R.id.library, R.id.menu, R.id.profile, R.id.settings, R.id.privacy_policy, R.id.help, R.id.home, R.id.post, R.id.search, R.id.fav, R.id.notification)
                .setDrawerLayout(drawer)
                .build();
        NavigationView navigationView = findViewById(R.id.nav_view);

        view = navigationView.getHeaderView(0);

        setUserProfile();

        bottomNavigationView = findViewById(R.id.bottom_navigation);
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupWithNavController(bottomNavigationView, navController);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);
        setDefaultKeyMode(DEFAULT_KEYS_SEARCH_LOCAL);
        navController.addOnDestinationChangedListener(this);
    }

    private void setUserProfile() {
        Call<Object> call = RetrofitInitializeAuth.getInstance(Prefs.getToken(this)).getProfile();
        call.enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {
                if (response.code() == 200) {
                    String json = new Gson().toJson(response.body());
                    JSONObject object = null;
                    try {
                        object = new JSONObject(json);
                        String name = object.getJSONObject("user").getString("name");
                        String url = object.getJSONObject("user").getString("imageUrl");
                        Glide.with(MainActivity.this).load(url).into((ImageView) view.findViewById(R.id.profile_pic));
                        TextView textView = view.findViewById(R.id.name);
                        textView.setText(name);
                        Toast.makeText(MainActivity.this,"name",Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(MainActivity.this, json, Toast.LENGTH_LONG).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                Toast.makeText(MainActivity.this, t.getLocalizedMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }


    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }


    @Override
    public void onDestinationChanged(@NonNull NavController controller, @NonNull NavDestination destination, @Nullable Bundle arguments) {

    }

}