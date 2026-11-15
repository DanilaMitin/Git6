package com.example.owp.controller;
import com.example.owp.dto.LoginRequest;
import com.example.owp.dto.RegisterRequest;
import com.example.owp.dto.UserResponse;
import com.example.owp.model.User;
import com.example.owp.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UserResponse register(
            @RequestParam String userName,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam MultipartFile image) throws IOException {
        return authService.register(userName, email, password, image);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
