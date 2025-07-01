package com.example.securefileapp.service;

import com.example.securefileapp.model.StoredFile;
import com.example.securefileapp.model.User;
import com.example.securefileapp.repository.StoredFileRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileStorageService {
    @Value("${file.storage.location}")
    private String storageLocation;

    private final StoredFileRepository fileRepository;

    public FileStorageService(StoredFileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public StoredFile storeFile(MultipartFile file, User owner) throws IOException {
        String ext = FilenameUtils.getExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + (ext.isEmpty() ? "" : "." + ext);
        Path dir = Paths.get(storageLocation);
        if (!Files.exists(dir)) Files.createDirectories(dir);
        Path filePath = dir.resolve(filename);
        Files.copy(file.getInputStream(), filePath);
        StoredFile storedFile = new StoredFile();
        storedFile.setFilename(filename);
        storedFile.setOriginalFilename(file.getOriginalFilename());
        storedFile.setContentType(file.getContentType());
        storedFile.setSize(file.getSize());
        storedFile.setUploadTime(Instant.now());
        storedFile.setOwner(owner);
        return fileRepository.save(storedFile);
    }

    public List<StoredFile> getFilesByOwner(User owner) {
        return fileRepository.findByOwner(owner);
    }

    public Optional<StoredFile> getFile(Long id) {
        return fileRepository.findById(id);
    }

    public Optional<StoredFile> getFileByShareToken(String token) {
        return fileRepository.findByShareToken(token);
    }

    public File getFileOnDisk(StoredFile storedFile) {
        return Paths.get(storageLocation, storedFile.getFilename()).toFile();
    }

    public StoredFile generateShareToken(StoredFile file, long expirySeconds) {
        file.setShareToken(UUID.randomUUID().toString());
        file.setShareTokenExpiry(Instant.now().plusSeconds(expirySeconds));
        return fileRepository.save(file);
    }

    public void removeShareToken(StoredFile file) {
        file.setShareToken(null);
        file.setShareTokenExpiry(null);
        fileRepository.save(file);
    }
} 