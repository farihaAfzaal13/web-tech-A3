function displayRecipes() {
    fetch('https://usman-fake-api.herokuapp.com/api/recipes')
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipe-list');
            recipeList.innerHTML = '';

            data.forEach(recipe => {
                const li = document.createElement('li');
                li.textContent = recipe.title;
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click', () => updateRecipe(recipe._id, recipe.title, recipe.body));
                li.appendChild(updateButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteRecipe(recipe._id));
                li.appendChild(deleteButton);

                // Add the recipe to the list
                recipeList.appendChild(li);
            });
        });
}
function updateRecipe(recipeId, currentTitle, currentBody) {
    // Prompt the user for updated title and body
    const updatedTitle = prompt('Enter a new title:', currentTitle);
    if (updatedTitle) {
        const updatedBody = prompt('Enter a new body:', currentBody);

        // Send the updated data to the server
        fetch(`https://usman-fake-api.herokuapp.com/api/recipes/${recipeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: updatedTitle, body: updatedBody }),
        })
        .then(() => {
            displayRecipes();
        });
    }
}
function deleteRecipe(recipeId) {
    fetch(`https://usman-fake-api.herokuapp.com/api/recipes/${recipeId}`, {
        method: 'DELETE',
    })
    .then(() => {
        displayRecipes();
    });
}
function createRecipe(title, body) {
    // Send a request to the server to create a new recipe
    fetch('https://usman-fake-api.herokuapp.com/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    })
    .then(() => {
        displayRecipes();
    });
}
document.getElementById('create-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newTitle = document.getElementById('new-title').value;
    const newBody = document.getElementById('new-body').value;
    createRecipe(newTitle, newBody);
});
displayRecipes();
