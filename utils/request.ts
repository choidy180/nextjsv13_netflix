const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
    fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=1cc87797184d3646a526d186ecec84e6&language=en-US`,
    fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/movie?api_key=1cc87797184d3646a526d186ecec84e6&with_networks=213`,
    fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=1cc87797184d3646a526d186ecec84e6&language=en-US`,
    fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=1cc87797184d3646a526d186ecec84e6&language=en-US&with_genres=28`,
    fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=1cc87797184d3646a526d186ecec84e6&language=en-US&with_genres=35`,
    fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=1cc87797184d3646a526d186ecec84e6&language=en-US&with_genres=27`,
    fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=1cc87797184d3646a526d186ecec84e6&language=en-US&with_genres=10749`,
    fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=1cc87797184d3646a526d186ecec84e6&language=en-US&with_genres=99`,
}

export default requests