package com.example.clickhit.PostPager.Gallery;

import androidx.core.content.ContextCompat;
import androidx.lifecycle.ViewModelProviders;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.example.clickhit.R;
import com.example.clickhit.ui.Post.Food.ShareFoodPostActivity;
import com.example.clickhit.ui.Post.Sketch.ShareSketchPostActivity;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.util.ArrayList;
import java.util.Objects;

public class GalleryFragment extends Fragment {

    private GalleryViewModel mViewModel;
    private ArrayList<String> images;
    GridView gallery;
    Context context;
    Activity activity;
    public static GalleryFragment newInstance() {
        return new GalleryFragment();
    }




    @Override
    public View onCreateView(@NonNull final LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.gallery_fragment, container, false);
        gallery = view.findViewById(R.id.galleryGridView);
        context = getContext();
        activity = getActivity();
        final Intent intent = requireActivity().getIntent();

        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED){
            final ImageAdapter adapter = new ImageAdapter((Activity) getContext());
            gallery.setAdapter(adapter);

            gallery.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                @Override
                public void onItemClick(AdapterView<?> arg0, View arg1,
                                        final int position, long arg3) {
                    LayoutInflater layoutInflater = getLayoutInflater();
                    View dialogView = layoutInflater.inflate(R.layout.dialog_post,null);
                    ImageView imageView = dialogView.findViewById(R.id.image);
                    Glide.with(context).load(images.get(position)).placeholder(R.drawable.placeholder)
                            .into(imageView);
                    new MaterialAlertDialogBuilder(context,R.style.Material_Dialog)
                            .setView(dialogView)
                            .setPositiveButton("Proceed", new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {
                                    if(intent.getStringExtra("which").equals("Food")){
                                        Intent intent1 = new Intent(context, ShareFoodPostActivity.class);
                                        intent1.putExtra("uri",images.get(position));
                                        startActivity(intent1);
                                        activity.finish();
                                    }else if(intent.getStringExtra("which").equals("Sketch")){
                                        Intent intent1 = new Intent(context, ShareSketchPostActivity.class);
                                        intent1.putExtra("uri",images.get(position));
                                        startActivity(intent1);
                                        activity.finish();
                                    }
                                }
                            }).setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    }).show();
                }
            });
        }else {
            requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE,Manifest.permission.CAMERA},1234);
        }



        return view;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == 1234) {
            if (grantResults.length > 0 &&
                    grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                ImageAdapter adapter = new ImageAdapter((Activity) getContext());
                gallery.setAdapter(adapter);

            } else {
                super.onRequestPermissionsResult(requestCode, permissions, grantResults);

            }
        }
    }

    private class ImageAdapter extends BaseAdapter {

        private Activity context;


        public ImageAdapter(Activity localContext) {
            context = localContext;
            images = getAllShownImagesPath(context);
        }

        public int getCount() {
            return images.size();
        }

        public Object getItem(int position) {
            return position;
        }

        public long getItemId(int position) {
            return position;
        }

        public View getView(final int position, View convertView,
                            ViewGroup parent) {
            ImageView picturesView;
            if (convertView == null) {
                picturesView = new ImageView(context);
                picturesView.setScaleType(ImageView.ScaleType.FIT_CENTER);
                picturesView
                        .setLayoutParams(new GridView.LayoutParams(270, 270));

            } else {
                picturesView = (ImageView) convertView;
            }

            Glide.with(context).load(images.get(position)).placeholder(R.drawable.placeholder).centerCrop()
                    .into(picturesView);

            return picturesView;
        }

        private ArrayList<String> getAllShownImagesPath(Activity activity) {
            Uri uri;
            Cursor cursor;
            int column_index_data, column_index_folder_name;
            ArrayList<String> listOfAllImages = new ArrayList<String>();
            String absolutePathOfImage = null;
            uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

            String[] projection = { MediaStore.MediaColumns.DATA,
                    MediaStore.Images.Media._ID };

            cursor = activity.getContentResolver().query(uri, projection, null,
                    null, MediaStore.Images.Media.DATE_TAKEN+" Desc");

            assert cursor != null;
            column_index_data = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATA);
            column_index_folder_name = cursor
                    .getColumnIndexOrThrow(MediaStore.Images.Media._ID);
            while (cursor.moveToNext()) {
                absolutePathOfImage = cursor.getString(column_index_data);

                listOfAllImages.add(absolutePathOfImage);
            }
            return listOfAllImages;
        }
    }
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(GalleryViewModel.class);
        // TODO: Use the ViewModel
    }

}