package com.example.owp.service;

import com.example.owp.dto.MovieRequest;
import com.example.owp.model.Movie;
import com.example.owp.repository.MovieRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovie(Integer id) {
        Optional<Movie> optionalMovie = movieRepository.findById(id);
        if (optionalMovie.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Фильм не найден");
        }
        return optionalMovie.get();
    }

    public Movie createMovie(MovieRequest request) {
        Movie movie = new Movie();
        movie.setTitle(request.getTitle());
        return movieRepository.save(movie);
    }

    public Movie updateMovie(MovieRequest request, Integer id) {
        Optional<Movie> optionalMovie = movieRepository.findById(id);
        if (optionalMovie.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Фильм не найден");
        }
        Movie movie = optionalMovie.get();
        movie.setTitle(request.getTitle());
        return movieRepository.save(movie);
    }

    public void deleteMovie(Integer id) {
        Optional<Movie> optionalMovie = movieRepository.findById(id);
        if (optionalMovie.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Фильм не найден");
        }
        movieRepository.deleteById(id);
    }
}
