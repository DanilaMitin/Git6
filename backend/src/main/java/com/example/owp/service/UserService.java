package com.example.owp.service;

import com.example.owp.dto.*;
import com.example.owp.model.Booking;
import com.example.owp.model.User;
import com.example.owp.model.UserAvatar;
import com.example.owp.repository.UserAvatarRepository;
import com.example.owp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BookingService bookingService;
    private final UserAvatarRepository userAvatarRepository;
    private final FileService fileService;

    public UserService(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder,BookingService bookingService, UserAvatarRepository userAvatarRepository, FileService fileService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.bookingService = bookingService;
        this.userAvatarRepository = userAvatarRepository;
        this.fileService = fileService;
    }

    public ProfileResponse getMyProfile() {
        Integer id = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Пользователь не найден");
        }
        User user = optionalUser.get();
        List<BookingResponse> bookings = bookingService.getMyBooking();

        return new ProfileResponse(user, bookings);
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll().stream().map(UserResponse::new).toList();
    }

    public void deleteMyProfile() {
        Integer id = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

//        if (news.getImage_url() != null) {
//            fileService.deleteImage(news.getImage_url());
//        }

        userRepository.deleteById(id);
    }
    @Transactional
    public void updateMyProfile( String userName,
                                 @RequestParam String email,
                                 @RequestParam MultipartFile image) throws IOException {
        Integer id = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> optimalUser = userRepository.findById(id);
        if (optimalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Пользователь не найден");
        }
        User user = optimalUser.get();
        user.setEmail(email);
        user.setUserName(userName);
        userRepository.save(user);

        if (image != null && !image.isEmpty()) {
            fileService.updateImage(image,id);
        }

    }

    public void updatePassword(UpdatePasswordRequest request) {
        Integer id = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Пользователь не найден");
        }
        User user = optionalUser.get();

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword()
        )) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Неверный старый пароль");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void updateRole(Integer id, UpdateRoleRequest request) {
        Integer adminId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (adminId.equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Нельзя менять роль у самого себя");
        }

        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Пользователь не найден");
        }
        User user = optionalUser.get();

        if(user.getRole().name().equals(request.getRole().name())) {
            throw new ResponseStatusException( HttpStatus.BAD_REQUEST, "Новая роль не должна совпадать со старой");
        }

        user.setRole(request.getRole());
        userRepository.save(user);
    }

    public UserAvatar getAvatar() {
        Integer id = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<UserAvatar> userAvatarOptional = userAvatarRepository.findById(id);
        if (userAvatarOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Аватар не найден");
        }

        UserAvatar userAvatar = userAvatarOptional.get();
        return userAvatar;
    }
}
