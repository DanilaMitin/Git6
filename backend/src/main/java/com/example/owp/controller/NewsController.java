package com.example.owp.controller;

import com.example.owp.dto.MovieRequest;
import com.example.owp.dto.NewsRequest;
import com.example.owp.dto.NewsResponse;
import com.example.owp.model.News;
import com.example.owp.service.MovieService;
import com.example.owp.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/all")
    public List<NewsResponse> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{id}")
    public NewsResponse getNews(@PathVariable Integer id) {
        return newsService.getNews(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/add")
    public NewsResponse createNews(@Valid @RequestBody NewsRequest request) throws IOException {
        return newsService.createNews(request.getTitle(), request.getContent());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping( "/{id}")
    public NewsResponse updateNews(@Valid @RequestBody NewsRequest request, @PathVariable Integer id) throws IOException {
        return newsService.updateNews(id, request.getTitle(), request.getContent());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable Integer id) throws IOException {
        newsService.deleteNews(id);
    }
}
