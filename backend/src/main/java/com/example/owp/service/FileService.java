package com.example.owp.service;

import com.example.owp.model.UserAvatar;
import com.example.owp.repository.UserAvatarRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;

@Service
public class FileService {

    private final UserAvatarRepository userAvatarRepository;

    private static final List<String> ALLOWED = List.of("image/jpeg", "image/png", "image/webp");
    private static final long MAX_SIZE = 5 * 1024 * 1024;

    public FileService(UserAvatarRepository userAvatarRepository) {
        this.userAvatarRepository = userAvatarRepository;
    }

    public void saveImage(MultipartFile image, Integer id) throws IOException {

        if (!ALLOWED.contains(image.getContentType())) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE,"Недопустимый формат файла");
        }

        if (image.getSize() > MAX_SIZE) {
            throw new ResponseStatusException(HttpStatus.CONTENT_TOO_LARGE,"Слишком большой файл");
        }

        byte[] imageBytes = image.getBytes();
        UserAvatar userAvatar = new UserAvatar();
        userAvatar.setData(imageBytes);
        userAvatar.setUserId(id);
        userAvatar.setContentType(image.getContentType());
        userAvatar.setUpdatedAt(Instant.now());
        userAvatarRepository.save(userAvatar);

    }

    public void updateImage(MultipartFile image, Integer id) throws IOException {
        if (!ALLOWED.contains(image.getContentType())) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE,"Недопустимый формат файла");
        }

        if (image.getSize() > MAX_SIZE) {
            throw new ResponseStatusException(HttpStatus.CONTENT_TOO_LARGE,"Слишком большой файл");
        }

        byte[] imageBytes = image.getBytes();
        UserAvatar userAvatar = new UserAvatar();
        userAvatar.setData(imageBytes);
        userAvatar.setUserId(id);
        userAvatar.setContentType(image.getContentType());
        userAvatar.setUpdatedAt(Instant.now());
        userAvatarRepository.save(userAvatar);
    }

    public void deleteImage(String imageUrl) throws IOException {
        Path path = Paths.get("." + imageUrl);
        Files.deleteIfExists(path);
    }
}
