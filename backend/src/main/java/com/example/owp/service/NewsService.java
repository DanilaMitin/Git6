package com.example.owp.service;

import com.example.owp.dto.NewsResponse;
import com.example.owp.model.Booking;
import com.example.owp.model.News;
import com.example.owp.model.User;
import com.example.owp.repository.NewsRepository;
import com.example.owp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class NewsService {
    private final NewsRepository newsRepository;
    private final UserRepository userRepository;

    public NewsService(NewsRepository newsRepository, FileService fileService, UserRepository userRepository) {
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
    }

    public List<NewsResponse> getAllNews() {
        return newsRepository.findAll().stream().map(NewsResponse::new).toList();
    }

    public NewsResponse getNews(Integer id) {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Новость не найдена");
        }
        News news = optionalNews.get();
        return new NewsResponse(news);
    }

    public NewsResponse createNews(String title, String content) throws IOException {

        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository.findById(userId).get();

        News news = new News();
        news.setTitle(title);
        news.setContent(content);
        news.setUser(user);

        return new NewsResponse(newsRepository.save(news));

    }

    public NewsResponse updateNews(Integer id,String title, String content) throws IOException {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Новость не найдена");
        }
        News news = optionalNews.get();

        news.setTitle(title);
        news.setContent(content);

        return new NewsResponse(newsRepository.save(news));
    }

    public void deleteNews(Integer id) throws IOException {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Новость не найдена");
        }
        News news = optionalNews.get();


        newsRepository.delete(news);
    }

}
