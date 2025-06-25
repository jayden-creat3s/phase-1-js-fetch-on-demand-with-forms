const init = () => {
  const inputForm = document.querySelector("form");

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const input = document.querySelector("input#searchByID"); // Get the input value

    // Fetch the movie data based on the input ID
    fetch(`http://localhost:3000/movies/${input.value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Movie not found'); // Handle 404 error
        }
        return response.json();
      })
      .then((data) => {
        const title = document.querySelector("section#movieDetails h4");
        const summary = document.querySelector("section#movieDetails p");

        // Update the title and summary with the fetched data
        title.innerText = data.title;
        summary.innerText = data.summary;
      })
      .catch((error) => {
        console.error(error);
        const title = document.querySelector("section#movieDetails h4");
        const summary = document.querySelector("section#movieDetails p");

        // Display an error message if the movie is not found
        title.innerText = "Movie Not Found";
        summary.innerText = "Please enter a valid movie ID.";
      });
  });
};

document.addEventListener("DOMContentLoaded", init);
