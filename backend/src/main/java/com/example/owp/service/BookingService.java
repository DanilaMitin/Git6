package com.example.owp.service;

import com.example.owp.dto.BookingRequest;
import com.example.owp.dto.BookingResponse;
import com.example.owp.model.Booking;
import com.example.owp.model.Movie;
import com.example.owp.model.User;
import com.example.owp.repository.BookingRepository;
import com.example.owp.repository.MovieRepository;
import com.example.owp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          MovieRepository movieRepository
                          ) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public List<BookingResponse> getAllBooking() {
        return bookingRepository.findAll().stream().map(BookingResponse::new).toList();
    }

    public List<BookingResponse> getMyBooking() {
        Integer id = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return bookingRepository.findAllByUserId(id).stream().map(BookingResponse::new).toList();
    }

    public void deleteBooking(Integer id) {
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if(optionalBooking.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Бронь не найден");
        }
        Booking booking = optionalBooking.get();
        if(!userId.equals(booking.getUser().getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Доступ запрещён");
        }

        bookingRepository.deleteById(id);
    }

    public void createBooking(BookingRequest request) {
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Booking booking = new Booking();

        User user = userRepository.findById(userId).get();
        Movie movie = movieRepository.findById(request.getMovieId()).get();

        booking.setUser(user);
        booking.setMovie(movie);
        booking.setBookingDate(request.getBookingDate());
        booking.setStatus("Booked");

        bookingRepository.save(booking);
    }
}
