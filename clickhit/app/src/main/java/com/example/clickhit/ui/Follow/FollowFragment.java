package com.example.clickhit.ui.Follow;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clickhit.Adapter.Recyclerview.FollowAdapter;
import com.example.clickhit.Model.FollowModel;
import com.example.clickhit.R;

import java.util.ArrayList;
import java.util.List;

public class FollowFragment extends Fragment {

    private FollowViewModel mViewModel;
    List<FollowModel> list = new ArrayList<>();
    RecyclerView recyclerView;
    FollowAdapter adapter;

    public static FollowFragment newInstance() {
        return new FollowFragment();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.follow_fragment, container, false);
        FollowModel model = new FollowModel();
        model.setImageUrl(null);
        model.setName("Shivam prajapati");
        model.setUsername("_shivam");
        for(int i=0;i<20;i++){
            list.add(model);
        }


        recyclerView = view.findViewById(R.id.recyclerview);
        recyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));
        adapter = new FollowAdapter(list,requireContext());
        recyclerView.setAdapter(adapter);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(FollowViewModel.class);
        // TODO: Use the ViewModel
    }

}