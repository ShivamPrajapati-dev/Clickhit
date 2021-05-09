package com.example.clickhit.Model;

import java.util.List;

public class Food {
    String imgUrl, imgName, category, foodName;
    List<String> ingredients;

    public Food(String imgUrl, String imgName, String category, String foodName, List<String> ingredients) {
        this.imgUrl = imgUrl;
        this.imgName = imgName;
        this.category = category;
        this.foodName = foodName;
        this.ingredients = ingredients;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public String getImgName() {
        return imgName;
    }

    public String getCategory() {
        return category;
    }

    public String getFoodName() {
        return foodName;
    }

    public List<String> getIngredients() {
        return ingredients;
    }
}
