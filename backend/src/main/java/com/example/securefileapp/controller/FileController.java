package com.example.securefileapp.controller;

import com.example.securefileapp.model.StoredFile;
import com.example.securefileapp.model.User;
import com.example.securefileapp.repository.StoredFileRepository;
import com.example.securefileapp.repository.UserRepository;
import com.example.securefileapp.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/files")
public class FileController {
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StoredFileRepository fileRepository;

    @PostMapping("/upload")
    public StoredFile uploadFile(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return fileStorageService.storeFile(file, user);
    }

    @GetMapping
    public List<StoredFile> listFiles(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return fileStorageService.getFilesByOwner(user);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        StoredFile file = fileRepository.findById(id).orElseThrow();
        if (!file.getOwner().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        File diskFile = fileStorageService.getFileOnDisk(file);
        Resource resource = new FileSystemResource(diskFile);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getOriginalFilename() + "\"")
                .contentType(MediaType.parseMediaType(file.getContentType()))
                .body(resource);
    }

    @PostMapping("/share/{id}")
    public Map<String, String> shareFile(@PathVariable Long id, @RequestParam(defaultValue = "3600") long expirySeconds, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        StoredFile file = fileRepository.findById(id).orElseThrow();
        if (!file.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }
        fileStorageService.generateShareToken(file, expirySeconds);
        return Map.of("shareToken", file.getShareToken(), "expiresAt", file.getShareTokenExpiry().toString());
    }

    @GetMapping("/shared/{token}")
    public ResponseEntity<Resource> downloadSharedFile(@PathVariable String token) {
        Optional<StoredFile> fileOpt = fileStorageService.getFileByShareToken(token);
        if (fileOpt.isEmpty()) return ResponseEntity.notFound().build();
        StoredFile file = fileOpt.get();
        if (file.getShareTokenExpiry() == null || file.getShareTokenExpiry().isBefore(Instant.now())) {
            return ResponseEntity.status(410).build(); // Gone
        }
        File diskFile = fileStorageService.getFileOnDisk(file);
        Resource resource = new FileSystemResource(diskFile);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getOriginalFilename() + "\"")
                .contentType(MediaType.parseMediaType(file.getContentType()))
                .body(resource);
    }
} 