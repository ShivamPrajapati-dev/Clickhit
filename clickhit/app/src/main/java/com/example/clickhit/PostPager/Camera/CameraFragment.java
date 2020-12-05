package com.example.clickhit.PostPager.Camera;

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.example.clickhit.PostPager.Camera.CameraPreview.CameraPreview;
import com.example.clickhit.R;
import com.example.clickhit.ui.Post.Food.ShareFoodPostActivity;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

public class CameraFragment extends Fragment {

    private CameraViewModel mViewModel;
    private static Camera mCamera;
    private CameraPreview mPreview;
    FrameLayout preview;
    AppCompatImageView select, delete, flash;
    FloatingActionButton capture;
    String path = null;

    private static void oldOpenCamera() {
        try {
            mCamera = Camera.open();
        } catch (RuntimeException e) {
            Log.e("cam", "failed to open front camera");
        }
    }

    private Camera.PictureCallback mPicture = new Camera.PictureCallback() {

        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
            File pictureFile = getOutputMediaFile(MEDIA_TYPE_IMAGE);
            if (pictureFile == null) {
                Log.d("Shivam", "Error creating media file, check storage permissions");
                return;
            }

            try {
                FileOutputStream fos = new FileOutputStream(pictureFile);
                fos.write(data);
                fos.close();
                ContentValues contentValues = new ContentValues();

                File f = new File(Objects.requireNonNull(getOutputMediaFileUri(MEDIA_TYPE_IMAGE).getPath()));

                contentValues.put("_data", getOutputMediaFileUri(MEDIA_TYPE_IMAGE).getPath());
                contentValues.put(MediaStore.Images.Media.SIZE, f.length());
                ContentResolver contentResolver = requireContext().getContentResolver();

                contentResolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues);
                path = f.getAbsolutePath();
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        select.setVisibility(View.VISIBLE);
                        delete.setVisibility(View.VISIBLE);
                        capture.setVisibility(View.INVISIBLE);
                        flash.setVisibility(View.INVISIBLE);

                    }
                });
            } catch (FileNotFoundException e) {
                Log.d("Shivam", "File not found: " + e.getMessage());
            } catch (IOException e) {
                Log.d("Shivam", "Error accessing file: " + e.getMessage());
            }
        }
    };

    public static final int MEDIA_TYPE_IMAGE = 1;

    /**
     * Create a file Uri for saving an image or video
     */
    private static Uri getOutputMediaFileUri(int type) {
        return Uri.fromFile(getOutputMediaFile(type));
    }

    /**
     * Create a File for saving an image or video
     */
    private static File getOutputMediaFile(int type) {


        File mediaStorageDir = new File(Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_PICTURES), "");

        if (!mediaStorageDir.exists()) {
            if (!mediaStorageDir.mkdirs()) {
                Log.d("MyCameraApp", "failed to create directory");
                return null;
            }
        }

        // Create a media file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        File mediaFile;
        if (type == MEDIA_TYPE_IMAGE) {
            mediaFile = new File(mediaStorageDir.getPath() + File.separator +
                    "IMG_" + timeStamp + ".jpg");
        } else {
            return null;
        }

        return mediaFile;
    }

    public static CameraFragment newInstance() {
        return new CameraFragment();
    }

    private void newOpenCamera() {
        if (mThread == null) {
            mThread = new CameraHandlerThread();
        }

        synchronized (mThread) {
            mThread.openCamera();
        }
    }

    private CameraHandlerThread mThread = null;

    private static class CameraHandlerThread extends HandlerThread {
        Handler mHandler = null;

        CameraHandlerThread() {
            super("CameraHandlerThread");
            start();
            mHandler = new Handler(getLooper());
        }

        synchronized void notifyCameraOpened() {
            notify();
        }

        void openCamera() {
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    oldOpenCamera();
                    notifyCameraOpened();
                }
            });
            try {
                wait();
            } catch (InterruptedException e) {
                Log.w("wait", "wait was interrupted");
            }
        }
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.camera_fragment, container, false);
        flash = view.findViewById(R.id.flash);
        select = view.findViewById(R.id.select);
        delete = view.findViewById(R.id.delete);

        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
            newOpenCamera();

            preview = view.findViewById(R.id.camera_preview);
            mPreview = new CameraPreview(getContext(), mCamera);
            preview.addView(mPreview);
        } else {
            requestPermissions(new String[]{Manifest.permission.CAMERA}, 12345);
        }

        flash.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Camera.Parameters parameters = mCamera.getParameters();
                if (parameters.getFlashMode().equals(Camera.Parameters.FLASH_MODE_OFF)) {
                    parameters.setFlashMode(Camera.Parameters.FLASH_MODE_ON);
                    flash.setImageDrawable(getResources().getDrawable(R.drawable.ic_baseline_flash_on_24));
                } else {
                    parameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
                    flash.setImageDrawable(getResources().getDrawable(R.drawable.ic_baseline_flash_off_24));
                }
                mCamera.setParameters(parameters);
            }
        });


        capture = view.findViewById(R.id.button_capture);
        capture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mCamera.takePicture(null, null, mPicture);

            }
        });

        select.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mCamera.release();
                mCamera = null;
                Intent intent = new Intent(getContext(), ShareFoodPostActivity.class);
                intent.putExtra("uri", path);
                startActivity(intent);
                getActivity().finish();
            }
        });

        delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Discarded", Toast.LENGTH_SHORT).show();
                mCamera.stopPreview();
                mCamera.startPreview();
                select.setVisibility(View.INVISIBLE);
                delete.setVisibility(View.INVISIBLE);
                capture.setVisibility(View.VISIBLE);
                flash.setVisibility(View.VISIBLE);
            }
        });

        return view;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        if (requestCode == 12345) {
            if (grantResults.length > 0 &&
                    grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                newOpenCamera();
                mPreview = new CameraPreview(getContext(), mCamera);
                preview.addView(mPreview);
            } else {
                super.onRequestPermissionsResult(requestCode, permissions, grantResults);

            }
        }
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(CameraViewModel.class);
        // TODO: Use the ViewModel
    }

    @Override
    public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode) {
        super.onPictureInPictureModeChanged(isInPictureInPictureMode);
    }

    @Override
    public void onPause() {
        super.onPause();
        if (mCamera != null) {
            mCamera.release();        // release the camera for other applications
            mCamera = null;
        }
    }
}