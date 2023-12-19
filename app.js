async function fetchRandomMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        displayMeal(meal);
    } catch (error) {
        console.error('Error fetching random meal:', error);
    }
}

function displayMeal(meal) {
    document.getElementById('image1').src = meal.strMealThumb;
    document.querySelector('.name-of-meal').textContent = meal.strMeal; 
}

document.addEventListener('DOMContentLoaded', function() {
    fetchRandomMeal();
});



async function fetchMealsByCategory(categoryName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();
        const meals = data.meals;
        if (meals.length > 0) {
            displayMealsByCategory(meals);
        } else {
            alert('No meals found for this category');
        }
    } catch (error) {
        console.error('Error fetching meals by category:', error);
    }
}

function displayMealsByCategory(meals) {
    for (let i = 0; i < meals.length; i++) {
        if (i === 0) {
            document.getElementById('image2').src = meals[i].strMealThumb;
            document.querySelector('.name-of-meal2').textContent = meals[i].strMeal;
            document.getElementById('image3').src = meals[i].strMealThumb;
            document.querySelector('.name-of-meal1').textContent = meals[i].strMeal;
            document.getElementById('image4').src = meals[i].strMealThumb;
            document.querySelector('.name-of-meal3').textContent = meals[i].strMeal;
            document.getElementById('image5').src = meals[i].strMealThumb;
            document.querySelector('.name-of-meal4').textContent = meals[i].strMeal;
        } else {
            const image = document.getElementById(`image${i + 1}`);
            const name = document.querySelector(`.name-of-meal${i + 1}`);
            if (image && name) {
                image.src = meals[i].strMealThumb;
                name.textContent = meals[i].strMeal;
            }
        }
    }
}

document.getElementById('typeinput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const categoryName = event.target.value;
        fetchMealsByCategory(categoryName);
    }
});
