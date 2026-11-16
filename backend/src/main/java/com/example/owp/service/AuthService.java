package com.example.owp.service;

import com.example.owp.dto.LoginRequest;
import com.example.owp.dto.RegisterRequest;
import com.example.owp.dto.UserResponse;
import com.example.owp.model.Role;
import com.example.owp.model.User;
import com.example.owp.model.UserAvatar;
import com.example.owp.repository.UserAvatarRepository;
import com.example.owp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final UserAvatarRepository userAvatarRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final FileService fileService;

    AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, UserAvatarRepository userAvatarRepository, FileService fileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userAvatarRepository = userAvatarRepository;
        this.fileService = fileService;
    }

    @Transactional
    public UserResponse register(String userName,
                                 String email,
                                 String password,
                                 MultipartFile image) throws IOException {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Почта уже занята");
        }

        User user = new User();
        user.setUserName(userName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.USER);
        user.setCount(0);
        userRepository.save(user);

        if (!image.isEmpty() && image != null) {
            fileService.saveImage(image, user.getId());
        }

        return new UserResponse(user);
    }

    public String login(LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Неверная почта или пароль");
        }
        User user = optionalUser.get();

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Неверная почта или пароль");
        }

        user.setCount(user.getCount() + 1);
        userRepository.save(user);

        return jwtService.generateToken(user);
    }

}
